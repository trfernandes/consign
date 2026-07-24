"use client";

import { useActionState } from "react";
import { createFuncionario } from "./actions";

export function NovoFuncionarioForm() {
  const [state, action, pending] = useActionState(createFuncionario, undefined);

  return (
    <form action={action}>
      <h2>Novo funcionário</h2>
      <div>
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="telefone">Telefone</label>
        <input id="telefone" name="telefone" required />
      </div>
      <div>
        <label htmlFor="password">Senha inicial</label>
        <input id="password" name="password" type="password" required />
      </div>
      {state?.error && <p role="alert">{state.error}</p>}
      {state?.success && <p>Funcionário criado.</p>}
      <button disabled={pending} type="submit">
        Criar
      </button>
    </form>
  );
}
