import { describe, expect, it } from "vitest";
import { proximaDisponibilidade } from "./disponibilidade";
import { DiaSemana } from "@/app/generated/prisma/client";

describe("proximaDisponibilidade", () => {
  it("retorna null quando não há disponibilidades", () => {
    expect(proximaDisponibilidade([])).toBeNull();
  });

  it("escolhe o mesmo dia se o horário ainda não passou", () => {
    const quarta10h = new Date(2026, 6, 22, 8, 0); // 2026-07-22 é quarta-feira
    const resultado = proximaDisponibilidade(
      [{ diaSemana: DiaSemana.QUARTA, horaInicio: "10:00" }],
      quarta10h
    );
    expect(resultado).toEqual({ diaSemana: DiaSemana.QUARTA, horaInicio: "10:00" });
  });

  it("pula pra próxima semana se o horário do mesmo dia já passou", () => {
    const quarta18h = new Date(2026, 6, 22, 18, 0);
    const resultado = proximaDisponibilidade(
      [{ diaSemana: DiaSemana.QUARTA, horaInicio: "10:00" }],
      quarta18h
    );
    expect(resultado).toEqual({ diaSemana: DiaSemana.QUARTA, horaInicio: "10:00" });
  });

  it("escolhe a opção mais próxima entre múltiplas disponibilidades", () => {
    const quarta8h = new Date(2026, 6, 22, 8, 0);
    const resultado = proximaDisponibilidade(
      [
        { diaSemana: DiaSemana.SEXTA, horaInicio: "09:00" },
        { diaSemana: DiaSemana.QUARTA, horaInicio: "14:00" },
      ],
      quarta8h
    );
    expect(resultado).toEqual({ diaSemana: DiaSemana.QUARTA, horaInicio: "14:00" });
  });
});
