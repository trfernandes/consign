import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { ProdutoForm } from "../../produto-form";
import { editProduto } from "../../actions";

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gestor = await requireRole(["GESTOR"]);

  const produto = await prisma.produto.findFirst({
    where: { id, empresaId: gestor.empresaId },
  });

  if (!produto) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Editar produto</h1>
      <ProdutoForm
        title={produto.nome}
        action={editProduto.bind(null, id)}
        initial={{ nome: produto.nome, preco: produto.preco.toFixed(2) }}
      />
    </main>
  );
}
