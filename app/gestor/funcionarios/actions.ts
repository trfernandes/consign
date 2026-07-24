"use server";

import { z } from "zod";
import { requireRole } from "@/lib/auth/dal";
import { createAdminClient } from "@/lib/supabase/admin";
import { prisma } from "@/lib/prisma";

const createFuncionarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório."),
  email: z.string().min(1, "Email é obrigatório.").email("Email inválido."),
  telefone: z.string().min(1, "Telefone é obrigatório."),
  password: z.string().min(6, "Senha deve ter ao menos 6 caracteres."),
});

export type CreateFuncionarioState = { error?: string; success?: boolean } | undefined;

export async function createFuncionario(
  _state: CreateFuncionarioState,
  formData: FormData
): Promise<CreateFuncionarioState> {
  await requireRole(["GESTOR"]);

  const parsed = createFuncionarioSchema.safeParse({
    nome: formData.get("nome"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { nome, email, telefone, password } = parsed.data;

  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    return { error: "Não foi possível criar a conta: " + (error?.message ?? "erro desconhecido") };
  }

  await prisma.funcionario.create({
    data: {
      authUserId: data.user.id,
      nome,
      email,
      telefone,
      role: "FUNCIONARIO",
    },
  });

  return { success: true };
}
