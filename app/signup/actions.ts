"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { prisma } from "@/lib/prisma";
import { validarCnpj } from "@/lib/validation/cnpj";

const signupSchema = z.object({
  empresaNome: z.string().min(1, "Nome da empresa é obrigatório."),
  cnpj: z.string().refine(validarCnpj, "CNPJ inválido."),
  nome: z.string().min(1, "Nome é obrigatório."),
  email: z.string().min(1, "Email é obrigatório.").email("Email inválido."),
  telefone: z.string().min(1, "Telefone é obrigatório."),
  password: z.string().min(6, "Senha deve ter ao menos 6 caracteres."),
});

export type SignupState = { error?: string } | undefined;

export async function signup(
  _state: SignupState,
  formData: FormData
): Promise<SignupState> {
  const parsed = signupSchema.safeParse({
    empresaNome: formData.get("empresaNome"),
    cnpj: formData.get("cnpj"),
    nome: formData.get("nome"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { empresaNome, cnpj, nome, email, telefone, password } = parsed.data;
  const cnpjDigitos = cnpj.replace(/\D/g, "");

  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    return { error: "Não foi possível criar a conta: " + (error?.message ?? "erro desconhecido") };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const empresa = await tx.empresa.create({
        data: { nome: empresaNome, cnpj: cnpjDigitos },
      });

      await tx.funcionario.create({
        data: {
          authUserId: data.user.id,
          nome,
          email,
          telefone,
          role: "GESTOR",
          empresaId: empresa.id,
        },
      });
    });
  } catch (err) {
    await admin.auth.admin.deleteUser(data.user.id);

    if (err instanceof Error && "code" in err && err.code === "P2002") {
      return { error: "CNPJ ou email já cadastrado." };
    }
    return { error: "Não foi possível criar a empresa." };
  }

  redirect("/login");
}
