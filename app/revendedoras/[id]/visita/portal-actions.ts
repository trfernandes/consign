"use server";

import { z } from "zod";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/admin";
import { emailRevendedora } from "@/lib/auth/revendedora-email";

export type PortalAcessoState = { error?: string; success?: boolean } | undefined;

const senhaSchema = z.object({
  senha: z.string().min(6, "Senha deve ter ao menos 6 caracteres."),
});

export async function definirAcessoPortal(
  carteiraId: string,
  _state: PortalAcessoState,
  formData: FormData
): Promise<PortalAcessoState> {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const carteira = await prisma.carteiraRevendedora.findFirst({
    where: { id: carteiraId, empresaId: funcionario.empresaId },
    include: { revendedora: true },
  });

  if (!carteira) {
    return { error: "Revendedora não encontrada." };
  }
  if (funcionario.role === "FUNCIONARIO" && carteira.funcionarioResponsavelId !== funcionario.id) {
    return { error: "Você não tem permissão para gerenciar o acesso desta revendedora." };
  }

  const parsed = senhaSchema.safeParse({ senha: formData.get("senha") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const admin = createAdminClient();
  const email = emailRevendedora(carteira.revendedora.cpf);

  if (carteira.revendedora.authUserId) {
    const { error } = await admin.auth.admin.updateUserById(carteira.revendedora.authUserId, {
      password: parsed.data.senha,
    });
    if (error) {
      return { error: "Não foi possível atualizar a senha: " + error.message };
    }
    return { success: true };
  }

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: parsed.data.senha,
    email_confirm: true,
  });

  if (error || !data.user) {
    return { error: "Não foi possível criar o acesso: " + (error?.message ?? "erro desconhecido") };
  }

  await prisma.revendedora.update({
    where: { id: carteira.revendedora.id },
    data: { authUserId: data.user.id },
  });

  return { success: true };
}
