"use client";

import { useActionState } from "react";
import { createFuncionario } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function NovoFuncionarioForm() {
  const [state, action, pending] = useActionState(createFuncionario, undefined);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Novo funcionário</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" name="nome" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="telefone">Telefone</Label>
            <Input id="telefone" name="telefone" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Senha inicial</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          {state?.error && (
            <p role="alert" className="text-sm text-destructive">
              {state.error}
            </p>
          )}
          {state?.success && (
            <p className="text-sm text-muted-foreground">Funcionário criado.</p>
          )}
          <Button disabled={pending} type="submit">
            Criar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
