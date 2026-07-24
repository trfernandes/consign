"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <main>
      <h1>Entrar</h1>
      <form action={action}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" required />
        </div>
        {state?.error && <p role="alert">{state.error}</p>}
        <button disabled={pending} type="submit">
          Entrar
        </button>
      </form>
    </main>
  );
}
