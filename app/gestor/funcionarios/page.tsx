import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { NovoFuncionarioForm } from "./novo-funcionario-form";

export default async function FuncionariosPage() {
  await requireRole(["GESTOR"]);

  const funcionarios = await prisma.funcionario.findMany({
    where: { role: "FUNCIONARIO" },
    orderBy: { nome: "asc" },
  });

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Funcionários</h1>
      <ul className="flex flex-col gap-2">
        {funcionarios.map((f) => (
          <li key={f.id} className="text-sm">
            {f.nome} — {f.email} — {f.telefone}
          </li>
        ))}
      </ul>
      <NovoFuncionarioForm />
    </main>
  );
}
