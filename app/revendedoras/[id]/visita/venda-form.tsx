"use client";

import { useActionState, useState } from "react";
import { registrarVenda, type VisitaState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProdutoOpcao = { id: string; nome: string; preco: string };
type ItemVenda = { produtoId: string; quantidade: number; precoUnitario: number };

export function VendaForm({
  carteiraId,
  produtos,
}: {
  carteiraId: string;
  produtos: ProdutoOpcao[];
}) {
  const action = registrarVenda.bind(null, carteiraId);
  const [state, formAction, pending] = useActionState<VisitaState, FormData>(action, undefined);
  const [itens, setItens] = useState<ItemVenda[]>(
    produtos.length > 0
      ? [{ produtoId: produtos[0].id, quantidade: 1, precoUnitario: Number(produtos[0].preco) }]
      : []
  );

  function adicionarItem() {
    if (produtos.length === 0) return;
    setItens((atual) => [
      ...atual,
      { produtoId: produtos[0].id, quantidade: 1, precoUnitario: Number(produtos[0].preco) },
    ]);
  }

  function removerItem(index: number) {
    setItens((atual) => atual.filter((_, i) => i !== index));
  }

  function atualizarItem(index: number, campo: keyof ItemVenda, valor: string) {
    setItens((atual) =>
      atual.map((item, i) =>
        i === index
          ? {
              ...item,
              [campo]: campo === "produtoId" ? valor : Number(valor),
            }
          : item
      )
    );
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Registrar venda</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="itens" value={JSON.stringify(itens)} />
          {itens.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <select
                value={item.produtoId}
                onChange={(e) => atualizarItem(index, "produtoId", e.target.value)}
                className="h-9 flex-1 rounded-md border border-input bg-transparent px-2 text-sm shadow-xs"
              >
                {produtos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
              <Input
                type="number"
                min="1"
                step="1"
                value={item.quantidade}
                onChange={(e) => atualizarItem(index, "quantidade", e.target.value)}
                className="w-20"
              />
              <Input
                type="number"
                min="0.01"
                step="0.01"
                value={item.precoUnitario}
                onChange={(e) => atualizarItem(index, "precoUnitario", e.target.value)}
                className="w-24"
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
          ))}
          <Button type="button" variant="outline" onClick={adicionarItem} disabled={produtos.length === 0}>
            Adicionar item
          </Button>
          {state?.error && (
            <p role="alert" className="text-sm text-destructive">
              {state.error}
            </p>
          )}
          {state?.success && <p className="text-sm text-muted-foreground">Venda registrada.</p>}
          <Button disabled={pending || itens.length === 0} type="submit">
            Registrar venda
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
