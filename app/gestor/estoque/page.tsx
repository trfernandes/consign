import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { CompraForm } from "./compra-form";

export default async function EstoqueGestorPage() {
  const gestor = await requireRole(["GESTOR"]);

  const produtos = await prisma.produto.findMany({
    where: { empresaId: gestor.empresaId },
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
      <CompraForm produtos={produtos.map((p) => ({ id: p.id, nome: p.nome }))} />
    </main>
  );
}
