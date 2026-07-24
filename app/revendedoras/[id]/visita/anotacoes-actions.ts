"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { TagComportamento } from "@/app/generated/prisma/client";

export type AnotacaoState = { error?: string; success?: boolean } | undefined;

const anotacaoSchema = z.object({
  tags: z.array(z.nativeEnum(TagComportamento)),
  texto: z.string().optional(),
});

export async function criarAnotacao(
  carteiraId: string,
  _state: AnotacaoState,
  formData: FormData
): Promise<AnotacaoState> {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const carteira = await prisma.carteiraRevendedora.findFirst({
    where: { id: carteiraId, empresaId: funcionario.empresaId },
  });

  if (!carteira) {
    return { error: "Revendedora não encontrada." };
  }
  if (funcionario.role === "FUNCIONARIO" && carteira.funcionarioResponsavelId !== funcionario.id) {
    return { error: "Você não tem permissão para anotar sobre esta revendedora." };
  }

  const parsed = anotacaoSchema.safeParse({
    tags: formData.getAll("tags"),
    texto: formData.get("texto") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  if (parsed.data.tags.length === 0 && !parsed.data.texto) {
    return { error: "Selecione ao menos uma tag ou escreva um texto." };
  }

  await prisma.anotacaoComportamento.create({
    data: {
      carteiraId,
      funcionarioId: funcionario.id,
      tags: parsed.data.tags,
      texto: parsed.data.texto,
    },
  });

  revalidatePath(`/revendedoras/${carteiraId}/visita`);
  return { success: true };
}
