"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { validarCpf } from "@/lib/validation/cpf";
import { emailRevendedora } from "@/lib/auth/revendedora-email";

const loginSchema = z.object({
  cpf: z.string().refine(validarCpf, "CPF inválido."),
  senha: z.string().min(1, "Senha é obrigatória."),
});

export type PortalLoginState = { error?: string } | undefined;

export async function loginRevendedora(
  _state: PortalLoginState,
  formData: FormData
): Promise<PortalLoginState> {
  const parsed = loginSchema.safeParse({
    cpf: formData.get("cpf"),
    senha: formData.get("senha"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: emailRevendedora(parsed.data.cpf),
    password: parsed.data.senha,
  });

  if (error) {
    return { error: "CPF ou senha inválidos." };
  }

  redirect("/portal");
}
