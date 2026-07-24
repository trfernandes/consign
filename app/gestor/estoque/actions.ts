"use server";

import { z } from "zod";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

const compraSchema = z.object({
  produtoId: z.string().min(1, "Produto é obrigatório."),
  quantidade: z.coerce.number().int().positive("Quantidade deve ser maior que zero."),
});

export type CompraState = { error?: string; success?: boolean } | undefined;

export async function registrarCompra(
  _state: CompraState,
  formData: FormData
): Promise<CompraState> {
  const gestor = await requireRole(["GESTOR"]);

  const parsed = compraSchema.safeParse({
    produtoId: formData.get("produtoId"),
    quantidade: formData.get("quantidade"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { produtoId, quantidade } = parsed.data;

  const produto = await prisma.produto.findFirst({
    where: { id: produtoId, empresaId: gestor.empresaId },
  });

  if (!produto) {
    return { error: "Produto não encontrado." };
  }

  await prisma.estoqueCentral.upsert({
    where: { produtoId },
    create: { produtoId, empresaId: gestor.empresaId, quantidade },
    update: { quantidade: { increment: quantidade } },
  });

  return { success: true };
}
