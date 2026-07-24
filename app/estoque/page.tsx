import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

export default async function EstoquePage() {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const produtos = await prisma.produto.findMany({
    where: { empresaId: funcionario.empresaId },
    orderBy: { nome: "asc" },
    include: { estoqueCentral: true },
  });

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Estoque central</h1>
      <ul className="flex flex-col gap-2">
        {produtos.map((p) => (
          <li key={p.id} className="text-sm">
            {p.nome} — {p.estoqueCentral?.quantidade ?? 0} unidades
          </li>
        ))}
      </ul>
    </main>
  );
}
