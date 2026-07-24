import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { BuscaCpfOuFormulario } from "./busca-cpf";

export default async function NovaRevendedoraPage() {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const funcionarios =
    funcionario.role === "GESTOR"
      ? await prisma.funcionario.findMany({
          where: { empresaId: funcionario.empresaId },
          orderBy: { nome: "asc" },
        })
      : undefined;

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Nova revendedora</h1>
      <BuscaCpfOuFormulario funcionarios={funcionarios} />
    </main>
  );
}
