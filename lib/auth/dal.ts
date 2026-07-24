import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { hasRole } from "@/lib/auth/authorization";
import type { Role } from "@/app/generated/prisma/client";

export const verifySession = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const funcionario = await prisma.funcionario.findUnique({
    where: { authUserId: user.id },
  });

  if (!funcionario) {
    redirect("/login");
  }

  return funcionario;
});

export async function requireRole(allowed: Role[]) {
  const funcionario = await verifySession();

  if (!hasRole(funcionario.role, allowed)) {
    redirect("/dashboard");
  }

  return funcionario;
}
