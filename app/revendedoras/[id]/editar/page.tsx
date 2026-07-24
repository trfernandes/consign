import { notFound } from "next/navigation";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { editRevendedora } from "../../actions";
import { RevendedoraForm } from "../../revendedora-form";

export default async function EditarRevendedoraPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const funcionario = await requireRole(["GESTOR", "FUNCIONARIO"]);

  const carteira = await prisma.carteiraRevendedora.findFirst({
    where: { id, empresaId: funcionario.empresaId },
    include: { revendedora: true, disponibilidades: true },
  });

  if (!carteira) {
    notFound();
  }

  if (funcionario.role === "FUNCIONARIO" && carteira.funcionarioResponsavelId !== funcionario.id) {
    notFound();
  }

  const funcionarios =
    funcionario.role === "GESTOR"
      ? await prisma.funcionario.findMany({
          where: { empresaId: funcionario.empresaId },
          orderBy: { nome: "asc" },
        })
      : undefined;

  return (
    <main className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Editar revendedora</h1>
      <RevendedoraForm
        title={carteira.revendedora.nome}
        action={editRevendedora.bind(null, id)}
        funcionarios={funcionarios}
        initial={{
          nome: carteira.revendedora.nome,
          cpf: carteira.revendedora.cpf,
          telefone: carteira.revendedora.telefone,
          pontoReferencia: carteira.revendedora.pontoReferencia,
          rua: carteira.revendedora.rua,
          numero: carteira.revendedora.numero,
          bairro: carteira.revendedora.bairro,
          cidade: carteira.revendedora.cidade,
          estado: carteira.revendedora.estado,
          cep: carteira.revendedora.cep,
          funcionarioResponsavelId: carteira.funcionarioResponsavelId,
          disponibilidades: carteira.disponibilidades.map((d) => ({
            diaSemana: d.diaSemana,
            horaInicio: d.horaInicio,
            horaFim: d.horaFim,
          })),
        }}
      />
    </main>
  );
}
