import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { RetiradaForm } from "./retirada-form";

export default async function CarregarCarroPage() {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const produtos = await prisma.produto.findMany({
    where: { empresaId: funcionario.empresaId },
    orderBy: { nome: "asc" },
    include: { estoqueCentral: true },
  });

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Carregar carro</h1>
      <RetiradaForm
        produtos={produtos.map((p) => ({
          id: p.id,
          nome: p.nome,
          disponivel: p.estoqueCentral?.quantidade ?? 0,
        }))}
      />
    </main>
  );
}
