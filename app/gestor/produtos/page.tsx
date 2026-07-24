import Link from "next/link";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { ProdutoForm } from "./produto-form";
import { createProduto } from "./actions";

export default async function ProdutosPage() {
  const gestor = await requireRole(["GESTOR"]);

  const produtos = await prisma.produto.findMany({
    where: { empresaId: gestor.empresaId },
    orderBy: { nome: "asc" },
  });

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Catálogo de produtos</h1>
      <ul className="flex flex-col gap-2">
        {produtos.map((p) => (
          <li key={p.id} className="flex items-center gap-3 text-sm">
            <span>
              {p.nome} — R$ {p.preco.toFixed(2)}
            </span>
            <Link href={`/gestor/produtos/${p.id}/editar`} className="text-primary underline">
              Editar
            </Link>
          </li>
        ))}
      </ul>
      <ProdutoForm title="Novo produto" action={createProduto} />
    </main>
  );
}
