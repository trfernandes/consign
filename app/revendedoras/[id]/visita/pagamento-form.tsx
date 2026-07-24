"use client";

import { useActionState } from "react";
import { registrarPagamento, type VisitaState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PagamentoForm({ carteiraId }: { carteiraId: string }) {
  const action = registrarPagamento.bind(null, carteiraId);
  const [state, formAction, pending] = useActionState<VisitaState, FormData>(action, undefined);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Registrar pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="valor">Valor</Label>
            <Input id="valor" name="valor" type="number" min="0.01" step="0.01" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="forma">Forma de pagamento</Label>
            <select
              id="forma"
              name="forma"
              required
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs"
            >
              <option value="DINHEIRO">Dinheiro</option>
              <option value="PIX">Pix</option>
              <option value="OUTRO">Outro</option>
            </select>
          </div>
          {state?.error && (
            <p role="alert" className="text-sm text-destructive">
              {state.error}
            </p>
          )}
          {state?.success && <p className="text-sm text-muted-foreground">Pagamento registrado.</p>}
          <Button disabled={pending} type="submit">
            Registrar pagamento
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
