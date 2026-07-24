import Link from "next/link";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { desativarRevendedora, reativarRevendedora } from "./actions";

export default async function RevendedorasPage() {
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const revendedoras = await prisma.revendedora.findMany({
    where: funcionario.role === "GESTOR" ? {} : { funcionarioResponsavelId: funcionario.id },
    include: { funcionarioResponsavel: true },
    orderBy: { nome: "asc" },
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
        {revendedoras.map((r) => (
          <li key={r.id} className="flex items-center justify-between rounded-md border p-3 text-sm">
            <div>
              <p className="font-medium">
                {r.nome} {!r.ativa && <span className="text-muted-foreground">(inativa)</span>}
              </p>
              <p className="text-muted-foreground">
                {r.rua}, {r.numero} — {r.bairro}, {r.cidade}/{r.estado}
              </p>
              <p className="text-muted-foreground">Responsável: {r.funcionarioResponsavel.nome}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/revendedoras/${r.id}/editar`}>
                <Button variant="outline">Editar</Button>
              </Link>
              <form
                action={
                  r.ativa
                    ? async () => {
                        "use server";
                        await desativarRevendedora(r.id);
                      }
                    : async () => {
                        "use server";
                        await reativarRevendedora(r.id);
                      }
                }
              >
                <Button variant="outline" type="submit">
                  {r.ativa ? "Desativar" : "Reativar"}
                </Button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
