"use client";

import { useState } from "react";
import { buscarRevendedoraPorCpf, createRevendedora, type BuscaCpfResult } from "../actions";
import { RevendedoraForm } from "../revendedora-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FuncionarioOpcao = { id: string; nome: string };

export function BuscaCpfOuFormulario({ funcionarios }: { funcionarios?: FuncionarioOpcao[] }) {
  const [cpf, setCpf] = useState("");
  const [resultado, setResultado] = useState<BuscaCpfResult | null>(null);
  const [buscando, setBuscando] = useState(false);

  async function buscar() {
    setBuscando(true);
    try {
      const resultado = await buscarRevendedoraPorCpf(cpf);
      setResultado(resultado);
    } finally {
      setBuscando(false);
    }
  }

  if (resultado) {
    return (
      <RevendedoraForm
        title={resultado.encontrada ? `Vincular ${resultado.nome}` : "Dados da revendedora"}
        action={createRevendedora}
        funcionarios={funcionarios}
        revendedoraIdFixo={resultado.encontrada ? resultado.revendedoraId : undefined}
        cpfFixo={cpf}
      />
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Buscar CPF</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cpf-busca">CPF da revendedora</Label>
          <Input id="cpf-busca" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        </div>
        <Button type="button" disabled={buscando || cpf.trim().length === 0} onClick={buscar}>
          Buscar
        </Button>
      </CardContent>
    </Card>
  );
}
