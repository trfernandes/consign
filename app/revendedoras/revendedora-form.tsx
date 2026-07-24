"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RevendedoraState } from "./actions";

const DIAS_SEMANA = [
  { value: "DOMINGO", label: "Domingo" },
  { value: "SEGUNDA", label: "Segunda" },
  { value: "TERCA", label: "Terça" },
  { value: "QUARTA", label: "Quarta" },
  { value: "QUINTA", label: "Quinta" },
  { value: "SEXTA", label: "Sexta" },
  { value: "SABADO", label: "Sábado" },
] as const;

type Disponibilidade = { diaSemana: string; horaInicio: string; horaFim: string };

type FuncionarioOpcao = { id: string; nome: string };

export function RevendedoraForm({
  title,
  action,
  funcionarios,
  initial,
}: {
  title: string;
  action: (state: RevendedoraState, formData: FormData) => Promise<RevendedoraState>;
  funcionarios?: FuncionarioOpcao[];
  initial?: {
    nome: string;
    cpf: string;
    telefone: string;
    pontoReferencia: string | null;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    funcionarioResponsavelId: string;
    disponibilidades: Disponibilidade[];
  };
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidade[]>(
    initial?.disponibilidades ?? [{ diaSemana: "SEGUNDA", horaInicio: "08:00", horaFim: "18:00" }]
  );

  function adicionarDisponibilidade() {
    setDisponibilidades((atual) => [
      ...atual,
      { diaSemana: "SEGUNDA", horaInicio: "08:00", horaFim: "18:00" },
    ]);
  }

  function removerDisponibilidade(index: number) {
    setDisponibilidades((atual) => atual.filter((_, i) => i !== index));
  }

  function atualizarDisponibilidade(index: number, campo: keyof Disponibilidade, valor: string) {
    setDisponibilidades((atual) =>
      atual.map((item, i) => (i === index ? { ...item, [campo]: valor } : item))
    );
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="disponibilidades" value={JSON.stringify(disponibilidades)} />

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" name="nome" defaultValue={initial?.nome} required />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" name="cpf" defaultValue={initial?.cpf} required />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="telefone">Telefone</Label>
            <Input id="telefone" name="telefone" defaultValue={initial?.telefone} required />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pontoReferencia">Ponto de referência</Label>
            <Input id="pontoReferencia" name="pontoReferencia" defaultValue={initial?.pontoReferencia ?? ""} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="rua">Rua</Label>
              <Input id="rua" name="rua" defaultValue={initial?.rua} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="numero">Número</Label>
              <Input id="numero" name="numero" defaultValue={initial?.numero} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bairro">Bairro</Label>
              <Input id="bairro" name="bairro" defaultValue={initial?.bairro} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" name="cidade" defaultValue={initial?.cidade} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="estado">Estado (UF)</Label>
              <Input id="estado" name="estado" maxLength={2} defaultValue={initial?.estado} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cep">CEP</Label>
              <Input id="cep" name="cep" defaultValue={initial?.cep} required />
            </div>
          </div>

          {funcionarios && funcionarios.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="funcionarioResponsavelId">Funcionário responsável</Label>
              <select
                id="funcionarioResponsavelId"
                name="funcionarioResponsavelId"
                defaultValue={initial?.funcionarioResponsavelId}
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs"
              >
                {funcionarios.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label>Disponibilidade</Label>
            {disponibilidades.map((disponibilidade, index) => (
              <div key={index} className="flex items-center gap-2">
                <select
                  value={disponibilidade.diaSemana}
                  onChange={(e) => atualizarDisponibilidade(index, "diaSemana", e.target.value)}
                  className="h-9 rounded-md border border-input bg-transparent px-2 text-sm shadow-xs"
                >
                  {DIAS_SEMANA.map((dia) => (
                    <option key={dia.value} value={dia.value}>
                      {dia.label}
                    </option>
                  ))}
                </select>
                <Input
                  type="time"
                  value={disponibilidade.horaInicio}
                  onChange={(e) => atualizarDisponibilidade(index, "horaInicio", e.target.value)}
                  className="w-28"
                />
                <Input
                  type="time"
                  value={disponibilidade.horaFim}
                  onChange={(e) => atualizarDisponibilidade(index, "horaFim", e.target.value)}
                  className="w-28"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removerDisponibilidade(index)}
                  disabled={disponibilidades.length === 1}
                >
                  Remover
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={adicionarDisponibilidade}>
              Adicionar horário
            </Button>
          </div>

          {state?.error && (
            <p role="alert" className="text-sm text-destructive">
              {state.error}
            </p>
          )}
          {state?.success && (
            <p className="text-sm text-muted-foreground">Salvo com sucesso.</p>
          )}

          <Button disabled={pending} type="submit">
            Salvar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
