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

  const revendedora = await prisma.revendedora.findUnique({
    where: { id },
    include: { disponibilidades: true },
  });

  if (!revendedora) {
    notFound();
  }

  if (funcionario.role === "FUNCIONARIO" && revendedora.funcionarioResponsavelId !== funcionario.id) {
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
        title={revendedora.nome}
        action={editRevendedora.bind(null, id)}
        funcionarios={funcionarios}
        initial={{
          nome: revendedora.nome,
          cpf: revendedora.cpf,
          telefone: revendedora.telefone,
          pontoReferencia: revendedora.pontoReferencia,
          rua: revendedora.rua,
          numero: revendedora.numero,
          bairro: revendedora.bairro,
          cidade: revendedora.cidade,
          estado: revendedora.estado,
          cep: revendedora.cep,
          funcionarioResponsavelId: revendedora.funcionarioResponsavelId,
          disponibilidades: revendedora.disponibilidades.map((d) => ({
            diaSemana: d.diaSemana,
            horaInicio: d.horaInicio,
            horaFim: d.horaFim,
          })),
        }}
      />
    </main>
  );
}
