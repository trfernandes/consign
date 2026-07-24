import Link from "next/link";
import { verifySession } from "@/lib/auth/dal";
import { logout } from "@/app/login/logout-action";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const funcionario = await verifySession();

  return (
    <main className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Olá, {funcionario.nome}</h1>
      <p className="text-sm text-muted-foreground">
        Papel: {funcionario.role === "GESTOR" ? "Gestor" : "Funcionário"}
      </p>

      {funcionario.role === "GESTOR" && (
        <Link href="/gestor/funcionarios" className="text-sm text-primary underline-offset-4 hover:underline">
          Gerenciar funcionários
        </Link>
      )}

      <form action={logout}>
        <Button variant="outline" type="submit">
          Sair
        </Button>
      </form>
    </main>
  );
}
