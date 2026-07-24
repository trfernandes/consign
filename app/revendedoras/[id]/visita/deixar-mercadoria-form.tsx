"use client";

import { useActionState, useState } from "react";
import { deixarMercadoria, type VisitaState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProdutoOpcao = { id: string; nome: string; disponivel: number };
type ItemDeixado = { produtoId: string; quantidade: number };

export function DeixarMercadoriaForm({
  carteiraId,
  produtos,
}: {
  carteiraId: string;
  produtos: ProdutoOpcao[];
}) {
  const action = deixarMercadoria.bind(null, carteiraId);
  const [state, formAction, pending] = useActionState<VisitaState, FormData>(action, undefined);
  const [itens, setItens] = useState<ItemDeixado[]>(
    produtos.length > 0 ? [{ produtoId: produtos[0].id, quantidade: 1 }] : []
  );

  function adicionarItem() {
    if (produtos.length === 0) return;
    setItens((atual) => [...atual, { produtoId: produtos[0].id, quantidade: 1 }]);
  }

  function removerItem(index: number) {
    setItens((atual) => atual.filter((_, i) => i !== index));
  }

  function atualizarItem(index: number, campo: keyof ItemDeixado, valor: string) {
    setItens((atual) =>
      atual.map((item, i) =>
        i === index ? { ...item, [campo]: campo === "produtoId" ? valor : Number(valor) } : item
      )
    );
  }

  if (produtos.length === 0) {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Deixar mercadoria consignada</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Seu carro não tem estoque disponível para deixar com esta revendedora.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Deixar mercadoria consignada</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="itens" value={JSON.stringify(itens)} />
          {itens.map((item, index) => {
            const produto = produtos.find((p) => p.id === item.produtoId);
            return (
              <div key={index} className="flex items-center gap-2">
                <select
                  value={item.produtoId}
                  onChange={(e) => atualizarItem(index, "produtoId", e.target.value)}
                  className="h-9 flex-1 rounded-md border border-input bg-transparent px-2 text-sm shadow-xs"
                >
                  {produtos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} ({p.disponivel} no carro)
                    </option>
                  ))}
                </select>
                <Input
                  type="number"
                  min="1"
                  max={produto?.disponivel}
                  step="1"
                  value={item.quantidade}
                  onChange={(e) => atualizarItem(index, "quantidade", e.target.value)}
                  className="w-20"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removerItem(index)}
                  disabled={itens.length === 1}
                >
                  Remover
                </Button>
              </div>
            );
          })}
          <Button type="button" variant="outline" onClick={adicionarItem}>
            Adicionar item
          </Button>
          {state?.error && (
            <p role="alert" className="text-sm text-destructive">
              {state.error}
            </p>
          )}
          {state?.success && <p className="text-sm text-muted-foreground">Mercadoria registrada.</p>}
          <Button disabled={pending} type="submit">
            Deixar mercadoria
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
