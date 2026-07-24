import { DiaSemana } from "@/app/generated/prisma/client";

const ORDEM_DIAS: DiaSemana[] = [
  DiaSemana.DOMINGO,
  DiaSemana.SEGUNDA,
  DiaSemana.TERCA,
  DiaSemana.QUARTA,
  DiaSemana.QUINTA,
  DiaSemana.SEXTA,
  DiaSemana.SABADO,
];

export type Disponibilidade = { diaSemana: DiaSemana; horaInicio: string };

export function proximaDisponibilidade(
  disponibilidades: Disponibilidade[],
  agora: Date = new Date()
): Disponibilidade | null {
  if (disponibilidades.length === 0) return null;

  const diaAtual = agora.getDay();
  const horaAtual = agora.getHours() * 60 + agora.getMinutes();

  let melhor: { disponibilidade: Disponibilidade; distanciaDias: number; minutos: number } | null = null;

  for (const disponibilidade of disponibilidades) {
    const diaIndex = ORDEM_DIAS.indexOf(disponibilidade.diaSemana);
    const [hora, minuto] = disponibilidade.horaInicio.split(":").map(Number);
    const minutos = hora * 60 + minuto;

    let distanciaDias = (diaIndex - diaAtual + 7) % 7;
    if (distanciaDias === 0 && minutos <= horaAtual) {
      distanciaDias = 7;
    }

    if (
      !melhor ||
      distanciaDias < melhor.distanciaDias ||
      (distanciaDias === melhor.distanciaDias && minutos < melhor.minutos)
    ) {
      melhor = { disponibilidade, distanciaDias, minutos };
    }
  }

  return melhor?.disponibilidade ?? null;
}
