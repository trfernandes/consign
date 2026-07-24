"use server";

import { requireRole } from "@/lib/auth/dal";
import { createAdminClient } from "@/lib/supabase/admin";
import { prisma } from "@/lib/prisma";

export type CreateFuncionarioState = { error?: string; success?: boolean } | undefined;

export async function createFuncionario(
  _state: CreateFuncionarioState,
  formData: FormData
): Promise<CreateFuncionarioState> {
  await requireRole(["GESTOR"]);

  const nome = formData.get("nome");
  const email = formData.get("email");
  const telefone = formData.get("telefone");
  const password = formData.get("password");

  if (
    typeof nome !== "string" || !nome ||
    typeof email !== "string" || !email ||
    typeof telefone !== "string" || !telefone ||
    typeof password !== "string" || !password
  ) {
    return { error: "Todos os campos são obrigatórios." };
  }

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
