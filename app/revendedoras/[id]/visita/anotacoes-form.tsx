"use client";

import { useActionState } from "react";
import { criarAnotacao, type AnotacaoState } from "./anotacoes-actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TAGS = [
  { value: "DEVOLVE_COM_DEFEITO", label: "Devolve com defeito" },
  { value: "NUNCA_ESTA_EM_CASA", label: "Nunca está em casa" },
  { value: "ATRASA_PAGAMENTO", label: "Atrasa pagamento" },
  { value: "BOM_PAGADOR", label: "Bom pagador" },
  { value: "RECEPTIVA", label: "Receptiva" },
  { value: "DIFICIL_CONTATO", label: "Difícil contato" },
] as const;

type Anotacao = { id: string; tags: string[]; texto: string | null; createdAt: Date; funcionario: { nome: string } };

export function AnotacoesForm({ carteiraId, anotacoes }: { carteiraId: string; anotacoes: Anotacao[] }) {
  const action = criarAnotacao.bind(null, carteiraId);
  const [state, formAction, pending] = useActionState<AnotacaoState, FormData>(action, undefined);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Anotações de comportamento</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-3">
              {TAGS.map((tag) => (
                <label key={tag.value} className="flex items-center gap-1.5 text-sm">
                  <input type="checkbox" name="tags" value={tag.value} />
                  {tag.label}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="texto">Texto livre (opcional)</Label>
            <textarea
              id="texto"
              name="texto"
              rows={3}
              className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
            />
          </div>
          {state?.error && (
            <p role="alert" className="text-sm text-destructive">
              {state.error}
            </p>
          )}
          {state?.success && <p className="text-sm text-muted-foreground">Anotação salva.</p>}
          <Button disabled={pending} type="submit">
            Adicionar anotação
          </Button>
        </form>

        {anotacoes.length > 0 && (
          <ul className="flex flex-col gap-2 border-t pt-4">
            {anotacoes.map((a) => (
              <li key={a.id} className="text-sm">
                <p className="text-muted-foreground">
                  {a.createdAt.toLocaleDateString("pt-BR")} — {a.funcionario.nome}
                </p>
                {a.tags.length > 0 && (
                  <p>{a.tags.map((t) => TAGS.find((tag) => tag.value === t)?.label ?? t).join(", ")}</p>
                )}
                {a.texto && <p>{a.texto}</p>}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
