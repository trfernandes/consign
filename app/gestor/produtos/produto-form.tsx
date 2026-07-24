"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProdutoState } from "./actions";

export function ProdutoForm({
  title,
  action,
  initial,
}: {
  title: string;
  action: (state: ProdutoState, formData: FormData) => Promise<ProdutoState>;
  initial?: { nome: string; preco: string };
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" name="nome" defaultValue={initial?.nome} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="preco">Preço</Label>
            <Input
              id="preco"
              name="preco"
              type="number"
              step="0.01"
              min="0.01"
              defaultValue={initial?.preco}
              required
            />
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
