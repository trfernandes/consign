import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

export default async function EstoqueCarrosGestorPage() {
  const gestor = await requireRole(["GESTOR"]);

  const estoque = await prisma.estoqueCarro.findMany({
    where: { funcionario: { empresaId: gestor.empresaId } },
    orderBy: [{ funcionario: { nome: "asc" } }, { produto: { nome: "asc" } }],
    include: { produto: true, funcionario: true },
  });

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Estoque de carro por funcionário</h1>
      <ul className="flex flex-col gap-2">
        {estoque.map((e) => (
          <li key={e.id} className="text-sm">
            {e.funcionario.nome} — {e.produto.nome} — {e.quantidade} unidades
          </li>
        ))}
      </ul>
    </main>
  );
}
