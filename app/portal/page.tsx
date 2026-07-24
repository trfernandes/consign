import { verifyRevendedoraSession } from "@/lib/auth/dal-revendedora";

export default async function PortalPage() {
  const revendedora = await verifyRevendedoraSession();

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Olá, {revendedora.nome}</h1>
      <div className="flex flex-col gap-3">
        {revendedora.carteiras.map((carteira) => (
          <div key={carteira.id} className="rounded-md border p-3 text-sm">
            <p className="font-medium">{carteira.empresa.nome}</p>
            <p className="text-muted-foreground">Saldo devedor: R$ {carteira.saldoDevedor.toFixed(2)}</p>
          </div>
        ))}
        {revendedora.carteiras.length === 0 && (
          <p className="text-sm text-muted-foreground">Nenhum vínculo ativo no momento.</p>
        )}
      </div>
    </main>
  );
}
