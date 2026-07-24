"use client";

import { useActionState } from "react";
import { loginRevendedora } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortalLoginPage() {
  const [state, action, pending] = useActionState(loginRevendedora, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Portal da revendedora</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" name="cpf" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="senha">Senha</Label>
              <Input id="senha" name="senha" type="password" required />
            </div>
            {state?.error && (
              <p role="alert" className="text-sm text-destructive">
                {state.error}
              </p>
            )}
            <Button disabled={pending} type="submit">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
