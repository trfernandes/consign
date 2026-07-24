"use client";

import { useActionState } from "react";
import { definirAcessoPortal, type PortalAcessoState } from "./portal-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PortalAcessoForm({ carteiraId, temAcesso }: { carteiraId: string; temAcesso: boolean }) {
  const action = definirAcessoPortal.bind(null, carteiraId);
  const [state, formAction, pending] = useActionState<PortalAcessoState, FormData>(action, undefined);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Acesso ao portal da revendedora</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          {temAcesso
            ? "Esta revendedora já tem acesso ao portal. Defina uma nova senha se necessário."
            : "Defina uma senha inicial e repasse à revendedora (login pelo CPF)."}
        </p>
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="senha">Senha</Label>
            <Input id="senha" name="senha" type="password" required />
          </div>
          {state?.error && (
            <p role="alert" className="text-sm text-destructive">
              {state.error}
            </p>
          )}
          {state?.success && <p className="text-sm text-muted-foreground">Senha definida.</p>}
          <Button disabled={pending} type="submit">
            {temAcesso ? "Redefinir senha" : "Criar acesso"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
