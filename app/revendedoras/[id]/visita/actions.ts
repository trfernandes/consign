"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { FormaPagamento } from "@/app/generated/prisma/client";

export type VisitaState = { error?: string; success?: boolean } | undefined;

async function carregarCarteiraAutorizada(carteiraId: string, empresaId: string) {
  return prisma.carteiraRevendedora.findFirst({
    where: { id: carteiraId, empresaId },
  });
}

const itemSchema = z.object({
  produtoId: z.string().min(1),
  quantidade: z.coerce.number().int().positive(),
});

const itemVendaSchema = itemSchema.extend({
  precoUnitario: z.coerce.number().positive(),
});

const itensVendaSchema = z.array(itemVendaSchema).min(1, "Informe ao menos um item.");
const itensSchema = z.array(itemSchema).min(1, "Informe ao menos um item.");

export async function registrarVenda(
  carteiraId: string,
  _state: VisitaState,
  formData: FormData
): Promise<VisitaState> {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const carteira = await carregarCarteiraAutorizada(carteiraId, funcionario.empresaId);
  if (!carteira) {
    return { error: "Revendedora não encontrada." };
  }
  if (funcionario.role === "FUNCIONARIO" && carteira.funcionarioResponsavelId !== funcionario.id) {
    return { error: "Você não tem permissão para registrar venda para esta revendedora." };
  }

  let itens: z.infer<typeof itensVendaSchema>;
  try {
    itens = itensVendaSchema.parse(JSON.parse((formData.get("itens") as string) || "[]"));
  } catch {
    return { error: "Itens da venda inválidos." };
  }

  const valorTotal = itens.reduce((soma, item) => soma + item.quantidade * item.precoUnitario, 0);

  await prisma.$transaction(async (tx) => {
    await tx.venda.create({
      data: {
        carteiraId,
        funcionarioId: funcionario.id,
        valorTotal,
        itens: {
          create: itens.map((item) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
          })),
        },
      },
    });

    await tx.carteiraRevendedora.update({
      where: { id: carteiraId },
      data: { saldoDevedor: { increment: valorTotal } },
    });
  });

  revalidatePath(`/revendedoras/${carteiraId}/visita`);
  return { success: true };
}

const pagamentoSchema = z.object({
  valor: z.coerce.number().positive("Valor deve ser maior que zero."),
  forma: z.nativeEnum(FormaPagamento),
});

export async function registrarPagamento(
  carteiraId: string,
  _state: VisitaState,
  formData: FormData
): Promise<VisitaState> {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const carteira = await carregarCarteiraAutorizada(carteiraId, funcionario.empresaId);
  if (!carteira) {
    return { error: "Revendedora não encontrada." };
  }
  if (funcionario.role === "FUNCIONARIO" && carteira.funcionarioResponsavelId !== funcionario.id) {
    return { error: "Você não tem permissão para registrar pagamento para esta revendedora." };
  }

  const parsed = pagamentoSchema.safeParse({
    valor: formData.get("valor"),
    forma: formData.get("forma"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await prisma.$transaction(async (tx) => {
    await tx.pagamento.create({
      data: {
        carteiraId,
        funcionarioId: funcionario.id,
        valor: parsed.data.valor,
        forma: parsed.data.forma,
      },
    });

    await tx.carteiraRevendedora.update({
      where: { id: carteiraId },
      data: { saldoDevedor: { decrement: parsed.data.valor } },
    });
  });

  revalidatePath(`/revendedoras/${carteiraId}/visita`);
  return { success: true };
}

export async function deixarMercadoria(
  carteiraId: string,
  _state: VisitaState,
  formData: FormData
): Promise<VisitaState> {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const carteira = await carregarCarteiraAutorizada(carteiraId, funcionario.empresaId);
  if (!carteira) {
    return { error: "Revendedora não encontrada." };
  }
  if (funcionario.role === "FUNCIONARIO" && carteira.funcionarioResponsavelId !== funcionario.id) {
    return { error: "Você não tem permissão para deixar mercadoria com esta revendedora." };
  }

  let itens: z.infer<typeof itensSchema>;
  try {
    itens = itensSchema.parse(JSON.parse((formData.get("itens") as string) || "[]"));
  } catch {
    return { error: "Itens inválidos." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      for (const item of itens) {
        const estoqueCarro = await tx.estoqueCarro.findUnique({
          where: { funcionarioId_produtoId: { funcionarioId: funcionario.id, produtoId: item.produtoId } },
        });

        if (!estoqueCarro || estoqueCarro.quantidade < item.quantidade) {
          throw new Error("Estoque do carro insuficiente para um dos produtos.");
        }

        await tx.estoqueCarro.update({
          where: { funcionarioId_produtoId: { funcionarioId: funcionario.id, produtoId: item.produtoId } },
          data: { quantidade: { decrement: item.quantidade } },
        });

        await tx.estoqueRevendedora.upsert({
          where: { carteiraId_produtoId: { carteiraId, produtoId: item.produtoId } },
          create: { carteiraId, produtoId: item.produtoId, quantidade: item.quantidade },
          update: { quantidade: { increment: item.quantidade } },
        });
      }
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao registrar mercadoria." };
  }

  revalidatePath(`/revendedoras/${carteiraId}/visita`);
  return { success: true };
}
