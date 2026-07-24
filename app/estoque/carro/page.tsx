import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

export default async function EstoqueCarroPage() {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const estoque = await prisma.estoqueCarro.findMany({
    where: { funcionarioId: funcionario.id },
    orderBy: { produto: { nome: "asc" } },
    include: { produto: true },
  });

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Meu estoque de carro</h1>
      <ul className="flex flex-col gap-2">
        {estoque.map((e) => (
          <li key={e.id} className="text-sm">
            {e.produto.nome} — {e.quantidade} unidades
          </li>
        ))}
      </ul>
    </main>
  );
}
