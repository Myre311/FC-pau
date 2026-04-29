# CLAUDE.md — FC Pau

> Ce fichier est lu automatiquement par Claude Code à chaque session.
> Il contient les règles d'exécution permanentes du projet.
> Pour le brief stratégique complet, voir `PLAN_FC_PAU.md`.

---

## 1. Identité du projet

Site web complet du **Pau FC** (club de football professionnel français) :
vitrine + boutique e-commerce + configurateur maillot 3D + dashboard admin sur mesure.

Remplace l'écosystème actuel (WordPress paufc.fr + boutique externalisée weezbe.com)
pour reprendre la maîtrise totale du parcours utilisateur, du stock et des données.

---

## 2. Stack — VERROUILLÉE

| Couche | Choix |
|---|---|
| Framework | **Next.js 14** (App Router uniquement, jamais Pages Router) |
| Langage | **JavaScript** — **PAS TypeScript** |
| Base de données | **PostgreSQL via Supabase** |
| ORM | **Prisma** |
| Auth | **Supabase Auth** |
| Paiement | **Stripe** (Elements + Webhooks) |
| Styling | **Tailwind CSS** + tokens custom (pas de CSS-in-JS) |
| 3D | **Three.js** (via `@react-three/fiber` + `@react-three/drei`) |
| State client | **Zustand** (panier, UI) — pas de Redux |
| Validation | **Zod** sur toutes les frontières (API, forms) |
| Tests E2E | **Playwright** sur les tunnels critiques |
| Hébergement | **Vercel** (front) + **Supabase** (BDD/auth/storage) |

**Ne jamais proposer** : TypeScript, Pages Router, MongoDB, Firebase, styled-components,
Material-UI, Bootstrap, Redux, Yarn (on est sur npm).

---

## 3. Charte graphique — STRICTE

### Couleurs (tokens Tailwind)

```js
colors: {
  nuit:       '#04091D',  // Header, footer, fond boutique
  primaire:   '#1A1D38',  // Surfaces identité club
  jaune:      '#FFCC00',  // Accent identité club
  dore:       '#CBA74D',  // EXCLUSIVEMENT espace partenaires
  blanc:      '#FFFFFF',  // Fonds clairs
}
```

**Règle absolue** : `#CBA74D` est **réservé** à la zone partenaires.
Jamais utilisé ailleurs. Jamais.

### Typographies

- **Playfair Display** — titres (serif élégant, style Didot haute couture)
- **Inter** — corps de texte (moderne, lisible)
- **DM Mono** — détails techniques, badges, numéros, tags

Toutes via Google Fonts.

### Direction artistique

"Sport de luxe sombre" — niveau Nike × PSG × Balenciaga.
- Asymétrie radicale, typographie sur-dimensionnée
- Animations basées sur la physique, 60fps, pause auto onglet inactif
- `clip-path: polygon(...)` coin coupé bas-droite comme signature visuelle (réf. Nike ACG)
- `line-height` < 1 sur les grands titres condensés
- Beaucoup d'espace négatif, contraste fort

### Interdits UX/UI

- ❌ Curseur custom (décision Mark, définitive)
- ❌ Emojis dans l'UI finale
- ❌ Bordures arrondies excessives (max `rounded-md`, jamais `rounded-full` sauf badges)
- ❌ Ombres molles génériques — préférer les bordures fines + decals
- ❌ Effets "glassmorphism" cliché
- ❌ Polices génériques (Inter, Roboto, Poppins, Open Sans)

---

## 4. Architecture du repo

```
fcpau/
├── app/                      # Next.js App Router
│   ├── (public)/             # Routes publiques (vitrine + boutique)
│   │   ├── page.js           # Homepage
│   │   ├── boutique/
│   │   ├── equipe/
│   │   ├── calendrier/
│   │   ├── actualites/
│   │   └── partenaires/
│   ├── (auth)/               # Connexion / inscription
│   ├── compte/               # Espace client connecté
│   ├── admin/                # Dashboard admin (auth required)
│   ├── api/                  # API routes
│   │   ├── stripe/
│   │   ├── webhooks/
│   │   └── pos/              # Webhooks POS physique
│   ├── layout.js
│   └── globals.css
├── components/
│   ├── ui/                   # Composants atomiques (Button, Input, etc.)
│   ├── shop/                 # Spécifique boutique
│   ├── admin/                # Spécifique dashboard
│   ├── customizer/           # Configurateur 3D
│   └── layout/               # Header, Footer, etc.
├── lib/
│   ├── prisma.js             # Client Prisma singleton
│   ├── supabase.js           # Client Supabase
│   ├── stripe.js
│   ├── stock.js              # Logique stock unifié
│   └── utils.js
├── prisma/
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
├── public/
│   ├── logo-fcpau.svg        # Logo officiel tracé à la main
│   └── fonts/
├── stores/                   # Zustand stores
│   ├── cart.js
│   └── ui.js
├── .claude/
│   └── skills/
├── PLAN_FC_PAU.md            # Brief stratégique
├── CLAUDE.md                 # Ce fichier
└── README.md
```

---

## 5. Conventions de code

### Nommage
- Fichiers de composants : **PascalCase** (`ProductCard.jsx`)
- Fichiers utilitaires : **camelCase** (`formatPrice.js`)
- Routes Next.js : **kebab-case** (`mes-commandes/`)
- Variables/fonctions : **camelCase**
- Constantes globales : **SCREAMING_SNAKE_CASE**

### Composants
- **Server Components par défaut** — uniquement `"use client"` quand nécessaire
- Un composant = un fichier
- Props destructurées en paramètre, pas `props.xxx`
- Pas d'export default sauf pour les pages Next.js

### Imports
Ordre obligatoire, séparés par une ligne vide :
1. React / Next
2. Librairies tierces
3. Composants internes (`@/components`)
4. Lib / utils (`@/lib`)
5. Styles

### Styling
- **Tailwind uniquement** dans les composants
- Classes longues → utiliser `clsx` ou `cn()` (helper dans `lib/utils.js`)
- Animations complexes → keyframes dans `globals.css`, pas inline
- Variables CSS pour les tokens dynamiques uniquement

### API
- Toutes les routes `app/api/` valident leur input avec **Zod**
- Réponses normalisées : `{ data, error }` jamais brut
- Erreurs HTTP correctes (400 / 401 / 403 / 404 / 500)
- Jamais de logique métier dans la route — déléguer à `lib/`

### Base de données
- **Toujours** passer par Prisma, jamais de SQL brut sans raison
- Migrations versionnées (`prisma migrate dev --name xxx`)
- Le seed doit toujours être idempotent (`upsert`, pas `create`)
- Indexer les colonnes de filtre/tri (slug, status, createdAt)

### Sécurité
- Aucun secret commit (vérifier `.gitignore`)
- Supabase Row-Level Security activé sur toutes les tables sensibles
- Webhooks Stripe : **toujours** vérifier la signature
- Inputs utilisateur : sanitize + Zod, partout
- Admin : double check côté serveur (middleware + vérification rôle dans la route)

---

## 6. Responsive — NON NÉGOCIABLE

**Demande explicite Mark** : tout est responsive, sans exception, dashboard admin compris.

- Mobile-first : on écrit le mobile, puis on adapte avec `md:` `lg:` `xl:`
- Breakpoints Tailwind par défaut, pas de custom
- Tester systématiquement à 360px (smartphone) et 768px (tablette)
- Dashboard admin mobile : sidebar en drawer (Sheet), pas de scroll horizontal
- Tableaux longs : conversion en cartes empilées en mobile, pas de scroll-x

---

## 7. Performance & SEO

- **Lighthouse > 95** sur toutes les pages publiques (Performance, A11y, Best Practices, SEO)
- `next/image` partout, formats AVIF + WebP
- Polices : `display: swap` + preload des graisses critiques
- Pas de `useEffect` pour fetch — utiliser Server Components ou Server Actions
- Loader avec Suspense + skeleton, pas de spinner générique
- Metadata dynamiques par page (`generateMetadata`)
- Sitemap + robots.txt + JSON-LD (`@type: SportsTeam` pour le club)

---

## 8. Workflow de travail avec Claude Code

### Avant de coder
1. **Lire** `PLAN_FC_PAU.md` pour le contexte
2. **Lire** ce `CLAUDE.md` pour les règles
3. **Identifier** la phase concernée dans le plan
4. **Proposer** un plan d'implémentation avant d'écrire du code

### Pendant le code
- Une feature = une branche Git si on est sur Git
- Petits commits atomiques avec messages clairs (convention : `feat:` `fix:` `refactor:` `docs:`)
- Pas plus de ~300 lignes par fichier — au-delà, splitter
- Tests Playwright sur les tunnels critiques (achat, connexion, perso)

### Avant de finir
- Vérifier le responsive (mobile + desktop)
- Vérifier les erreurs console (zéro warning)
- Vérifier les types/imports inutilisés
- Lancer `npm run lint` et `npm run build` localement avant tout commit

---

## 9. Décisions verrouillées (ne pas remettre en question)

| Décision | Raison |
|---|---|
| Pas de Shopify | Reprendre la maîtrise totale du parcours et des données |
| Next.js + JS (pas TS) | Préférence Mark, vélocité de dev |
| Supabase | Auth + Postgres + realtime dans une seule plateforme |
| Three.js (pas d'app payante) | Coût zéro, contrôle total du configurateur |
| Pas de curseur custom | Demande explicite Mark |
| Doré `#CBA74D` réservé partenaires | Charte hiérarchisée du club |
| Tout responsive sans exception | Demande explicite Mark, dashboard inclus |
| App Router (pas Pages) | Standard Next 14+, RSC natif |
| Tailwind (pas CSS-in-JS) | Performance + simplicité |
| Zustand (pas Redux) | Léger, suffisant pour les besoins |

---

## 10. Commandes utiles

```bash
# Dev
npm run dev                    # Lancer le serveur de dev
npm run build                  # Build production
npm run start                  # Lancer la prod

# Base de données
npm run db:push                # Push schema sans migration (dev rapide)
npm run db:migrate             # Créer une migration
npm run db:seed                # Reset + seed
npm run db:studio              # Ouvrir Prisma Studio

# Qualité
npm run lint                   # ESLint
npm run format                 # Prettier
npm run test                   # Tests Playwright

# Stripe (en local, pour tester webhooks)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 11. Points d'attention spécifiques FC Pau

### Configurateur maillot
- Le rendu 3D doit être **fluide même sur mobile mid-range**
- Fallback 2D si WebGL indisponible (canvas avec calque texte)
- Sauvegarder la perso en base AVANT le paiement (table `JerseyCustomization`)
- Génération d'une preview PNG côté serveur pour le récap commande

### Stock unifié POS + en ligne
- **Une seule source de vérité** : la table `StockMovement`
- Webhook entrant `/api/pos/movement` reçoit les ventes caisse physique
- Au panier en ligne : créer une réservation temporaire (TTL 15 min)
- Cron de cleanup des paniers abandonnés
- Realtime Supabase pour rafraîchir le stock dispo côté client

### Espace partenaires
- Charte **dorée `#CBA74D`** uniquement ici
- Hiérarchie : Premium / Officiel / Local
- Logos en SVG monochromes pour cohérence visuelle
- Lien externe vers les sites des partenaires (target blank + rel noopener)

### Dashboard admin
- Auth séparée (rôles : `admin`, `staff_pos`, `staff_marketing`)
- Sidebar collapsible
- Mobile : drawer avec gesture swipe
- Tableaux : tri + filtres + pagination + export CSV
- Stats temps réel via Supabase realtime

---

## 12. Avant de proposer du code, Claude doit :

1. ✅ Vérifier que la solution respecte la **charte graphique**
2. ✅ Vérifier que c'est en **JavaScript** (pas TS)
3. ✅ Vérifier que c'est **responsive mobile + desktop**
4. ✅ Vérifier que c'est **App Router** Next 14
5. ✅ Vérifier qu'aucune **décision verrouillée** n'est remise en cause
6. ✅ Proposer une approche **avant** d'écrire 200 lignes de code

---

*Dernière mise à jour : 25 avril 2026*
*Maintenu par : Mark*
