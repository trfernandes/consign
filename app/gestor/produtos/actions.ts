"use server";

import { z } from "zod";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

const produtoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório."),
  preco: z.coerce.number().positive("Preço deve ser maior que zero."),
});

export type ProdutoState = { error?: string; success?: boolean } | undefined;

export async function createProduto(
  _state: ProdutoState,
  formData: FormData
): Promise<ProdutoState> {
  const gestor = await requireRole(["GESTOR"]);

  const parsed = produtoSchema.safeParse({
    nome: formData.get("nome"),
    preco: formData.get("preco"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await prisma.produto.create({
    data: {
      nome: parsed.data.nome,
      preco: parsed.data.preco,
      empresaId: gestor.empresaId,
    },
  });

  return { success: true };
}

export async function editProduto(
  produtoId: string,
  _state: ProdutoState,
  formData: FormData
): Promise<ProdutoState> {
  const gestor = await requireRole(["GESTOR"]);

  const parsed = produtoSchema.safeParse({
    nome: formData.get("nome"),
    preco: formData.get("preco"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const produto = await prisma.produto.findFirst({
    where: { id: produtoId, empresaId: gestor.empresaId },
  });

  if (!produto) {
    return { error: "Produto não encontrado." };
  }

  await prisma.produto.update({
    where: { id: produtoId },
    data: { nome: parsed.data.nome, preco: parsed.data.preco },
  });

  return { success: true };
}
