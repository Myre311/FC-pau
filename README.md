# FC Pau

Site officiel du Pau FC — vitrine, boutique e-commerce, configurateur maillot 3D et dashboard admin sur mesure.

> Brief stratégique : `PLAN_FC_PAU.md` · Règles d'exécution : `CLAUDE.md`

## Stack

- **Next.js 14** (App Router) en **JavaScript** (pas TypeScript)
- **Supabase** — Postgres, Auth, Storage, Realtime
- **Prisma** — schéma & migrations
- **Stripe** — paiement
- **Tailwind CSS** — design tokens FC Pau
- **Three.js** (`@react-three/fiber` + `drei`) — configurateur maillot
- **Zustand** — state client (panier, UI)
- **Zod** — validation aux frontières

## Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Copier les variables d'env
cp .env.example .env.local
# … puis remplir .env.local avec les clés Supabase / Stripe

# 3. Lancer le dev server
npm run dev
```

Ouvre http://localhost:3000.

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Dev server (port 3000) |
| `npm run build` | Build production |
| `npm run start` | Serveur production |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run db:migrate` | Crée une migration Prisma |
| `npm run db:push` | Push schéma sans migration (dev) |
| `npm run db:seed` | Seed la BDD |
| `npm run db:studio` | Ouvre Prisma Studio |

## Sécurité

- `.env.local` est gitignored — jamais commiter
- `service_role` Supabase **uniquement côté serveur**
- Headers de sécurité globaux dans `next.config.js` (CSP, HSTS, XFO, etc.)
- RLS activé sur toutes les tables sensibles (PR-2)
- Validation Zod sur toutes les frontières API
- Webhooks Stripe : vérification de signature obligatoire
