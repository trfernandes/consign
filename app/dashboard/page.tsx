import Link from "next/link";
import { verifySession } from "@/lib/auth/dal";
import { logout } from "@/app/login/logout-action";

export default async function DashboardPage() {
  const funcionario = await verifySession();

  return (
    <main>
      <h1>Olá, {funcionario.nome}</h1>
      <p>Papel: {funcionario.role === "GESTOR" ? "Gestor" : "Funcionário"}</p>

      {funcionario.role === "GESTOR" && (
        <p>
          <Link href="/gestor/funcionarios">Gerenciar funcionários</Link>
        </p>
      )}

      <form action={logout}>
        <button type="submit">Sair</button>
      </form>
    </main>
  );
}
