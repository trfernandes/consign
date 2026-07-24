"use client";

import { useActionState } from "react";
import { registrarCompra } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProdutoOpcao = { id: string; nome: string };

export function CompraForm({ produtos }: { produtos: ProdutoOpcao[] }) {
  const [state, action, pending] = useActionState(registrarCompra, undefined);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Registrar compra</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="produtoId">Produto</Label>
            <select
              id="produtoId"
              name="produtoId"
              required
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs"
            >
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quantidade">Quantidade</Label>
            <Input id="quantidade" name="quantidade" type="number" min="1" step="1" required />
          </div>
          {state?.error && (
            <p role="alert" className="text-sm text-destructive">
              {state.error}
            </p>
          )}
          {state?.success && (
            <p className="text-sm text-muted-foreground">Compra registrada.</p>
          )}
          <Button disabled={pending} type="submit">
            Registrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
