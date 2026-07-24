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
    <main>
      <h1>Funcionários</h1>
      <ul>
        {funcionarios.map((f) => (
          <li key={f.id}>
            {f.nome} — {f.email} — {f.telefone}
          </li>
        ))}
      </ul>
      <NovoFuncionarioForm />
    </main>
  );
}
