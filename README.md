# Consign

Gestão de consignação porta-a-porta para revendedoras. Next.js (App Router) + Prisma + Supabase (Postgres/Auth) + Google Maps Platform, deploy na Vercel, acesso mobile via PWA.

## Rodar localmente

1. Clonar repo, instalar dependências:

   ```bash
   npm install
   ```

2. Copiar `.env.example` pra `.env` e preencher com valores reais (ver seção abaixo):

   ```bash
   cp .env.example .env
   ```

3. Gerar Prisma client e aplicar schema no banco:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. Rodar dev server:

   ```bash
   npm run dev
   ```

   Abrir [http://localhost:3000](http://localhost:3000).

## Configurar `.env` (ação manual, contas próprias)

### Supabase (Postgres + Auth)

1. Criar projeto em [supabase.com](https://supabase.com).
2. `DATABASE_URL`: Project Settings > Database > Connection string > URI.
3. `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Project Settings > API.
4. `SUPABASE_SERVICE_ROLE_KEY`: mesma tela, chave service_role (nunca expor no client).

### Google Maps Platform

1. Criar projeto no [Google Cloud Console](https://console.cloud.google.com/), habilitar billing.
2. Habilitar Directions API, Distance Matrix API e Geocoding API.
3. Criar API key, restringir por IP/referrer.
4. `GOOGLE_MAPS_API_KEY`: colar chave.

## Deploy (Vercel)

1. Importar repo em [vercel.com/new](https://vercel.com/new).
2. Configurar as mesmas variáveis de `.env` no painel do projeto (Settings > Environment Variables) — não commitar `.env`.
3. Cada push na branch principal gera deploy automático.
4. Confirmar URL gerada acessível pelo navegador do celular (PWA instalável via "Adicionar à tela inicial").

## PWA

Ícones em `public/icon-192.png` e `public/icon-512.png` são placeholders sólidos gerados por `scripts/generate-placeholder-icons.mjs` — trocar por branding real antes de lançar. Manifest em `app/manifest.ts`. Sem service worker / cache offline nesta fase.

## Stack

- Next.js (App Router, TypeScript)
- Prisma ORM + Postgres (Supabase)
- Supabase Auth (email/senha)
- Google Maps Platform (Directions/Distance Matrix/Geocoding), isolado atrás de interface pra testes
- Vercel (deploy automático por push)
