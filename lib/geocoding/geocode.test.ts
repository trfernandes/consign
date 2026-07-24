import { describe, expect, it, vi } from "vitest";
import { createGoogleGeocodeClient } from "./geocode";

const endereco = {
  rua: "Rua das Flores",
  numero: "123",
  bairro: "Centro",
  cidade: "São Paulo",
  estado: "SP",
  cep: "01000-000",
};

describe("createGoogleGeocodeClient", () => {
  it("retorna latitude/longitude quando a API responde OK", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: "OK",
        results: [{ geometry: { location: { lat: -23.5, lng: -46.6 } } }],
      }),
    });

    const client = createGoogleGeocodeClient("fake-key", fetchFn as unknown as typeof fetch);
    const resultado = await client.geocode(endereco);

    expect(resultado).toEqual({ latitude: -23.5, longitude: -46.6 });
  });

  it("retorna null quando a API não encontra o endereço", async () => {
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: "ZERO_RESULTS", results: [] }),
    });

    const client = createGoogleGeocodeClient("fake-key", fetchFn as unknown as typeof fetch);
    const resultado = await client.geocode(endereco);

    expect(resultado).toBeNull();
  });

  it("retorna null quando a requisição falha (HTTP não ok)", async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) });

    const client = createGoogleGeocodeClient("fake-key", fetchFn as unknown as typeof fetch);
    const resultado = await client.geocode(endereco);

    expect(resultado).toBeNull();
  });
});
