export interface EnderecoInput {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface GeocodeResult {
  latitude: number;
  longitude: number;
}

export interface GeocodeClient {
  geocode(endereco: EnderecoInput): Promise<GeocodeResult | null>;
}

export function createGoogleGeocodeClient(
  apiKey: string,
  fetchFn: typeof fetch = fetch,
): GeocodeClient {
  return {
    async geocode(endereco: EnderecoInput): Promise<GeocodeResult | null> {
      const enderecoCompleto = `${endereco.rua}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, ${endereco.cep}`;

      const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
      url.searchParams.set("address", enderecoCompleto);
      url.searchParams.set("key", apiKey);

      const res = await fetchFn(url.toString());
      if (!res.ok) {
        return null;
      }

      const data = await res.json();
      const location = data?.results?.[0]?.geometry?.location;
      if (data.status !== "OK" || !location) {
        return null;
      }

      return { latitude: location.lat, longitude: location.lng };
    },
  };
}
