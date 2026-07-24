import Link from "next/link";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { desativarRevendedora, reativarRevendedora } from "./actions";

export default async function RevendedorasPage() {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const carteiras = await prisma.carteiraRevendedora.findMany({
    where: {
      empresaId: funcionario.empresaId,
      ...(funcionario.role === "FUNCIONARIO" ? { funcionarioResponsavelId: funcionario.id } : {}),
    },
    include: { revendedora: true, funcionarioResponsavel: true },
    orderBy: { revendedora: { nome: "asc" } },
  });

  return (
    <main className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Revendedoras</h1>
        <Link href="/revendedoras/nova">
          <Button>Nova revendedora</Button>
        </Link>
      </div>

      <ul className="flex flex-col gap-3">
        {carteiras.map((c) => (
          <li key={c.id} className="flex items-center justify-between rounded-md border p-3 text-sm">
            <div>
              <p className="font-medium">
                {c.revendedora.nome} {!c.ativa && <span className="text-muted-foreground">(inativa)</span>}
              </p>
              <p className="text-muted-foreground">
                {c.revendedora.rua}, {c.revendedora.numero} — {c.revendedora.bairro}, {c.revendedora.cidade}/
                {c.revendedora.estado}
              </p>
              <p className="text-muted-foreground">Responsável: {c.funcionarioResponsavel.nome}</p>
              <p className="text-muted-foreground">Saldo devedor: R$ {c.saldoDevedor.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/revendedoras/${c.id}/visita`}>
                <Button variant="outline">Visita</Button>
              </Link>
              <Link href={`/revendedoras/${c.id}/editar`}>
                <Button variant="outline">Editar</Button>
              </Link>
              <form
                action={
                  c.ativa
                    ? async () => {
                        "use server";
                        await desativarRevendedora(c.id);
                      }
                    : async () => {
                        "use server";
                        await reativarRevendedora(c.id);
                      }
                }
              >
                <Button variant="outline" type="submit">
                  {c.ativa ? "Desativar" : "Reativar"}
                </Button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
