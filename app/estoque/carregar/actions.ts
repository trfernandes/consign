"use server";

import { z } from "zod";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

const retiradaSchema = z.object({
  produtoId: z.string().min(1, "Produto é obrigatório."),
  quantidade: z.coerce.number().int().positive("Quantidade deve ser maior que zero."),
});

export type RetiradaState = { error?: string; success?: boolean } | undefined;

export async function retirarParaCarro(
  _state: RetiradaState,
  formData: FormData
): Promise<RetiradaState> {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const parsed = retiradaSchema.safeParse({
    produtoId: formData.get("produtoId"),
    quantidade: formData.get("quantidade"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { produtoId, quantidade } = parsed.data;

  const produto = await prisma.produto.findFirst({
    where: { id: produtoId, empresaId: funcionario.empresaId },
  });

  if (!produto) {
    return { error: "Produto não encontrado." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const estoqueCentral = await tx.estoqueCentral.findUnique({ where: { produtoId } });

      if (!estoqueCentral || estoqueCentral.quantidade < quantidade) {
        throw new Error("Estoque central insuficiente.");
      }

      await tx.estoqueCentral.update({
        where: { produtoId },
        data: { quantidade: { decrement: quantidade } },
      });

      await tx.estoqueCarro.upsert({
        where: { funcionarioId_produtoId: { funcionarioId: funcionario.id, produtoId } },
        create: { funcionarioId: funcionario.id, produtoId, quantidade },
        update: { quantidade: { increment: quantidade } },
      });

      await tx.retiradaEstoque.create({
        data: { funcionarioId: funcionario.id, produtoId, quantidade },
      });
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro ao registrar retirada." };
  }

  return { success: true };
}
