import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { VendaForm } from "./venda-form";
import { PagamentoForm } from "./pagamento-form";
import { DeixarMercadoriaForm } from "./deixar-mercadoria-form";
import { PortalAcessoForm } from "./portal-acesso-form";

export default async function VisitaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const carteira = await prisma.carteiraRevendedora.findFirst({
    where: { id, empresaId: funcionario.empresaId },
    include: { revendedora: true },
  });

  if (!carteira) {
    notFound();
  }

  if (funcionario.role === "FUNCIONARIO" && carteira.funcionarioResponsavelId !== funcionario.id) {
    notFound();
  }

  const [produtos, estoqueCarro] = await Promise.all([
    prisma.produto.findMany({ where: { empresaId: funcionario.empresaId }, orderBy: { nome: "asc" } }),
    prisma.estoqueCarro.findMany({
      where: { funcionarioId: funcionario.id, quantidade: { gt: 0 } },
      include: { produto: true },
    }),
  ]);

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Visita — {carteira.revendedora.nome}</h1>
      <p className="text-sm text-muted-foreground">
        Saldo devedor atual: R$ {carteira.saldoDevedor.toFixed(2)}
      </p>

      <VendaForm
        carteiraId={id}
        produtos={produtos.map((p) => ({ id: p.id, nome: p.nome, preco: p.preco.toFixed(2) }))}
      />

      <PagamentoForm carteiraId={id} />

      <DeixarMercadoriaForm
        carteiraId={id}
        produtos={estoqueCarro.map((e) => ({
          id: e.produtoId,
          nome: e.produto.nome,
          disponivel: e.quantidade,
        }))}
      />

      <PortalAcessoForm carteiraId={id} temAcesso={Boolean(carteira.revendedora.authUserId)} />
    </main>
  );
}
