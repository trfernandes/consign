import { verifyRevendedoraSession } from "@/lib/auth/dal-revendedora";
import { proximaDisponibilidade } from "@/lib/disponibilidade";

const LABEL_DIA: Record<string, string> = {
  DOMINGO: "Domingo",
  SEGUNDA: "Segunda",
  TERCA: "Terça",
  QUARTA: "Quarta",
  QUINTA: "Quinta",
  SEXTA: "Sexta",
  SABADO: "Sábado",
};

export default async function PortalPage() {
  const revendedora = await verifyRevendedoraSession();

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Olá, {revendedora.nome}</h1>
      <div className="flex flex-col gap-3">
        {revendedora.carteiras.map((carteira) => {
          const proxima = proximaDisponibilidade(carteira.disponibilidades);
          return (
            <div key={carteira.id} className="rounded-md border p-3 text-sm">
              <p className="font-medium">{carteira.empresa.nome}</p>
              <p className="text-muted-foreground">Saldo devedor: R$ {carteira.saldoDevedor.toFixed(2)}</p>
              <p className="text-muted-foreground">
                Próxima visita/disponibilidade:{" "}
                {proxima
                  ? `${LABEL_DIA[proxima.diaSemana]}, ${proxima.horaInicio}`
                  : "Nenhuma disponibilidade cadastrada"}
              </p>
            </div>
          );
        })}
        {revendedora.carteiras.length === 0 && (
          <p className="text-sm text-muted-foreground">Nenhum vínculo ativo no momento.</p>
        )}
      </div>
    </main>
  );
}
