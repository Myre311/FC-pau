# 🏟️ FC PAU — Plan de réalisation & reprise de projet

> Document de reprise de la conversation Claude du 24 avril 2026.
> À utiliser comme **brief complet** pour relancer le projet avec Claude Code et le mener à terme.

---

## 1. Contexte du projet

### Le client
**Pau FC** — club de football professionnel français basé à Pau (Béarn).
- Site actuel : https://www.paufc.fr (WordPress)
- Boutique actuelle : weezbe.com (sous-traitée, hors écosystème club)

### La demande initiale du client
Le club voulait au départ une boutique Shopify connectée à un site vitrine WordPress. **Décision prise avec Mark : on ne fait PAS de Shopify.** On construit un **vrai site complet sur mesure** — vitrine + boutique + dashboard admin "à la Shopify" — pour reprendre le contrôle total du parcours utilisateur, du stock, et des données client.

### Pourquoi pas Shopify
Le supporter qui veut acheter un maillot quitte aujourd'hui paufc.fr, atterrit sur weezbe.com, et le club **perd toute traçabilité**. L'objectif est d'avoir **un seul écosystème intégré** : vitrine, boutique, configurateur maillot, espace partenaires, et back-office unifié.

### Les 3 défis techniques majeurs identifiés
1. **Configurateur 3D de maillot** (flocage nom + numéro en live, vue 3D Three.js) — le plus complexe.
2. **Stock unifié POS + en ligne** — une source de vérité unique via une table `stock_movements` qui reçoit les événements caisse physique (Square/Lightspeed) et commandes en ligne.
3. **Dashboard admin complet** — gestion catalogue, commandes, stock, exports, statistiques.

---

## 2. Identité visuelle & charte

### Couleurs officielles (validées sur le logo)
| Token | Hex | Usage |
|---|---|---|
| Bleu nuit | `#04091D` | Structure : header, footer, fond boutique |
| Bleu primaire | `#1A1D38` | Identité club, surfaces |
| Jaune | `#FFCC00` | Accent identité club |
| Doré | `#CBA74D` | Espace partenaires uniquement |
| Blanc | `#FFFFFF` | Fonds clairs et lisibilité |

### Logo
Logo officiel FC Pau analysé : couronne Henri IV + paon béarnais + Pyrénées + bande extérieure bleu nuit + anneau doré. **À embarquer en SVG tracé à la main** dans nav et footer (pas en PNG).

### Typographie
Choix éditorial "sport de luxe sombre" :
- **Big Shoulders Display** — titres (compact, musclé, condensed)
- **Instrument Sans** — corps (élégant, humain)
- **DM Mono** — détails techniques, tags, badges
- Alternative validée plus tôt : **Barlow + Barlow Condensed** (Google Fonts)

### Direction artistique
"Tension industrielle" — niveau Nike × PSG × Balenciaga. Asymétrie radicale, typographie sur-dimensionnée, animations basées sur la physique, micro-détails obsessionnels, clip-path coin coupé en bas-droite comme signature visuelle (référence Nike ACG / Palace).

### Règles UX/UI strictes
- **Pas de curseur custom** (décision validée par Mark)
- **Tout responsive** — desktop ET mobile, du site vitrine jusqu'au dashboard admin
- Animations fluides 60fps avec `requestAnimationFrame`, pause auto onglet inactif
- Pas de patterns IA reconnaissables (pas d'Inter, pas de Roboto, line-height < 1 sur titres)

---

## 3. Stack technique retenue

| Couche | Choix |
|---|---|
| Framework | **Next.js 14** (App Router) |
| Langage | **JavaScript** (pas TypeScript — préférence Mark) |
| Base de données | **PostgreSQL via Supabase** (auth + realtime inclus) |
| ORM | **Prisma** |
| Paiement | **Stripe** |
| Styling | **Tailwind CSS** + design tokens custom |
| 3D | **Three.js** (configurateur maillot) |
| Hébergement | À confirmer (Vercel ou VPS Hostinger) |

> ⚠️ Note : la première itération a utilisé TypeScript dans le `package.json`. **À migrer en JS pur** pour rester aligné avec les préférences habituelles de Mark.

---

## 4. État d'avancement (au 24 avril)

### ✅ Phase 1 — Fondations (TERMINÉE)
22 fichiers créés couvrant :
- Architecture Next.js 14 App Router
- Schéma Prisma complet : `Product`, `ProductVariant`, `StockItem`, `StockMovement`, `Order`, `OrderItem`, `User`, `NewsletterSubscriber`, `Partner`, `JerseyCustomization`
- Seed avec 4 produits de test, catégories, stocks initiaux, coupon `BIENVENUE10`
- Tailwind config avec tokens FC Pau
- `globals.css` avec composants réutilisables (boutons, cartes, inputs, badges, tables admin)
- Header + Footer + Layout
- Variables d'environnement (`.env.example`)

### ✅ Maquettes HTML autonomes (livrées en parallèle)
3 pages HTML 100% autonomes (zéro dépendance), pour validation visuelle rapide :
- `fcpau-index.html` — vitrine premium avec hero canvas animé (lignes de flux Perlin + grille perspective + lueurs radiales)
- `fcpau-boutique.html` — catalogue 4 colonnes, filtres, panier slide-over, code promo, 8 produits
- `fcpau-produit.html` — fiche produit, galerie 5 vignettes, configurateur flocage live (nom + n° + 3 polices), 4 accordéons, avis 4.9/5

### 🟡 EN COURS — Phase 2 (interrompue pendant la responsive)
La conversation s'est arrêtée pendant la **passe de mise en responsive de toutes les pages, dashboard inclus**. Mark a explicitement demandé : *"il faut aussi que tout soit responsive du panel administrateur à tout et continue pour avoir tout le site"*.

---

## 5. Plan de reprise — Roadmap restante

### 🎯 PHASE 2 — Boutique e-commerce (à finir)
- [ ] **Migrer le projet Next.js de TypeScript → JavaScript pur** (cohérence stack Mark)
- [ ] Page boutique `/boutique` Next.js (porter la maquette HTML)
- [ ] Page produit `/boutique/[slug]` Next.js avec configurateur flocage
- [ ] Panier persistant (Zustand ou Context + localStorage)
- [ ] Page panier `/panier`
- [ ] Tunnel checkout `/checkout` avec Stripe Elements
- [ ] Page confirmation `/checkout/success`
- [ ] Pages catégories `/boutique/categorie/[slug]`
- [ ] **Responsive complet** mobile-first

### 🎯 PHASE 3 — Configurateur Maillot 3D
- [ ] Modèle GLTF maillot (à sourcer ou modéliser)
- [ ] Scène Three.js avec react-three-fiber
- [ ] Materials customisables (couleur principale, nom, numéro)
- [ ] Texture canvas dynamique pour le flocage
- [ ] Contrôles caméra OrbitControls
- [ ] Sauvegarde personnalisation en BDD (table `JerseyCustomization`)
- [ ] Aperçu image générée pour récap commande

### 🎯 PHASE 4 — Site vitrine complet
- [ ] Homepage (porter `fcpau-index.html` en composants Next)
- [ ] Page Équipe `/equipe` (joueurs, staff)
- [ ] Page Calendrier `/calendrier` (matchs)
- [ ] Page Actualités `/actualites` + détail `/actualites/[slug]`
- [ ] Page Stade `/nouste-camp`
- [ ] Page Histoire / Club `/club`
- [ ] Page Partenaires `/partenaires` (charte dorée `#CBA74D`)
- [ ] Page Contact `/contact`
- [ ] Pages légales (mentions, CGV, RGPD, cookies)

### 🎯 PHASE 5 — Newsletter & Compte utilisateur
- [ ] Tunnel newsletter multi-étape RGPD (modal slide-over)
- [ ] Inscription / Connexion (Supabase Auth)
- [ ] Espace compte `/compte`
  - Mes commandes
  - Mes adresses
  - Mes personnalisations sauvegardées
  - Mes favoris
  - Mes infos & préférences newsletter

### 🎯 PHASE 6 — Dashboard admin "à la Shopify"
Layout sidebar + topbar, **responsive** (drawer mobile).
- [ ] `/admin/dashboard` — KPIs (CA, commandes, top produits, conversion)
- [ ] `/admin/commandes` — liste, filtres, statuts, fiche détail, impression bon de prep
- [ ] `/admin/produits` — CRUD complet, variantes, photos, stock
- [ ] `/admin/stock` — vue unifiée online + POS, mouvements, alertes rupture
- [ ] `/admin/clients` — fiches clients, historique
- [ ] `/admin/personnalisations` — file de production flocage
- [ ] `/admin/partenaires` — gestion espace partenaires
- [ ] `/admin/newsletter` — liste abonnés, segmentation, exports CSV
- [ ] `/admin/codes-promo` — création / suivi
- [ ] `/admin/parametres` — config club, livraison, taxes
- [ ] **Auth admin** dédiée + rôles (`admin`, `staff_pos`, `staff_marketing`)

### 🎯 PHASE 7 — Intégration POS / Stock unifié
- [ ] API webhook entrante `/api/pos/movement` (Square ou Lightspeed)
- [ ] Logique réservation panier → décrément stock temporaire
- [ ] Tâche cron de nettoyage paniers abandonnés
- [ ] Endpoint realtime Supabase pour rafraîchir stock dispo en boutique en ligne
- [ ] Interface caisse simplifiée `/pos` (tablette)

### 🎯 PHASE 8 — Production & déploiement
- [ ] SEO complet (metadata, sitemap, robots.txt, schema.org)
- [ ] Optimisation images (next/image + AVIF)
- [ ] Lighthouse > 95 sur toutes les pages publiques
- [ ] Tests Playwright sur tunnels critiques (achat, perso, admin)
- [ ] CI/CD GitHub Actions
- [ ] Déploiement (Vercel pour le front + Supabase managé)
- [ ] Monitoring (Sentry + Plausible)
- [ ] Documentation client (admin + dev handover)

---

## 6. Fichiers déjà livrés (à récupérer)

### Phase 1 — Next.js
```
package.json, .env.example, README.md
prisma/schema.prisma, prisma/seed.js
tailwind.config.ts, app/globals.css
app/layout.tsx, app/page.tsx
components/Header.tsx, components/Footer.tsx
components/HeroSection.tsx, components/ProductsSection.tsx
components/CustomizerTeaser.tsx, components/PartnersSection.tsx
components/MarqueeBar.tsx, components/ScrollReveal.tsx
lib/stock.ts
```

### Maquettes HTML autonomes
```
fcpau-index.html      (~ vitrine, hero canvas animé)
fcpau-boutique.html   (~ catalogue + panier slide)
fcpau-produit.html    (~ fiche + configurateur live flocage)
```

> ❓ Si certains de ces fichiers manquent encore, demander à Claude Code de **les régénérer en se basant sur la spec de ce document** avant d'attaquer la suite.

---

## 7. Prompt de reprise pour Claude Code

> Copier-coller ceci dans un nouveau chat avec Claude Code à la racine du projet :

```
Bonjour. Je reprends le projet FC Pau (site complet : vitrine + boutique + 
dashboard admin sur mesure, en remplacement de Shopify+WordPress).

Lis d'abord le fichier PLAN_FC_PAU.md à la racine — il contient le contexte
complet, la charte, la stack, l'état d'avancement et la roadmap.

Stack : Next.js 14 App Router + JavaScript (PAS TypeScript) + Prisma + 
Supabase + Stripe + Tailwind + Three.js.

Couleurs : #04091D (nuit), #1A1D38 (primaire), #FFCC00 (jaune), 
#CBA74D (doré partenaires), #FFFFFF (blanc).

Préférences : pas de curseur custom, tout responsive mobile-first, 
animations 60fps, design "sport de luxe sombre" niveau Nike × PSG, 
typographies Big Shoulders + Instrument Sans + DM Mono.

État actuel : Phase 1 (fondations Next.js + schéma Prisma + design system) 
livrée mais en TypeScript — à migrer en JS. Maquettes HTML autonomes 
livrées pour vitrine + boutique + produit. Phase 2 interrompue pendant la 
passe responsive.

Prochaine étape : reprendre la Phase 2 — porter les maquettes HTML en 
composants Next.js JavaScript, panier persistant, checkout Stripe, et 
finir le responsive sur tout (y compris dashboard quand on l'attaquera).

Commence par auditer ce qui existe dans le repo, puis propose-moi la 
première PR.
```

---

## 8. Décisions verrouillées (ne pas remettre en question)

| Décision | Raison |
|---|---|
| Pas de Shopify | Reprendre la maîtrise totale du parcours et des données |
| Next.js + JS (pas TS) | Préférence Mark, vélocité de dev |
| Supabase | Auth + Postgres + realtime dans une seule plateforme |
| Three.js (pas d'app payante) | Coût zéro, contrôle total du configurateur |
| Pas de curseur custom | Demande explicite Mark |
| Doré `#CBA74D` réservé partenaires | Charte hiérarchisée du club |
| Tout responsive sans exception | Demande explicite Mark, dashboard inclus |

---

## 9. Questions encore ouvertes à clarifier avec le club

- [ ] Choix POS physique : **Square** ou **Lightspeed** (impact sur l'API webhook)
- [ ] Modèle 3D maillot : fourni par l'équipementier ou à modéliser ?
- [ ] Modes de livraison + transporteurs partenaires
- [ ] Politique de retour / échange
- [ ] Conditions tarifaires partenaires (espace doré)
- [ ] Domaine final (boutique.paufc.fr ou paufc.fr direct ?)
- [ ] Reprise des comptes clients existants (weezbe → migration ?)

---

*Document généré le 25 avril 2026 à partir de la conversation du 24 avril.*
*À mettre à jour à chaque fin de phase.*
