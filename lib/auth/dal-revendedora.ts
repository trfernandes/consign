import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export const verifyRevendedoraSession = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  const revendedora = await prisma.revendedora.findUnique({
    where: { authUserId: user.id },
    include: {
      carteiras: {
        where: { ativa: true },
        include: { empresa: true, disponibilidades: true },
      },
    },
  });

  if (!revendedora) {
    redirect("/portal/login");
  }

  return revendedora;
});
