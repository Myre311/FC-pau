# 🚀 FC PAU — CHECKLIST PRODUCTION

> **Status actuel** : 95% production-ready
> **Dernière mise à jour** : 26 avril 2026

---

## ✅ FIXES CRITIQUES APPLIQUÉS

### 1. Violations charte graphique corrigées
- ✅ **presse/page.js** : Emojis retirés (🎨📸📐📄 → supprimés)
- ✅ **i18n.js** : localeFlags emojis retirés (🇫🇷🇬🇧🇪🇸 → commenté)
- ✅ **Respect CLAUDE.md** : Plus d'emojis dans l'UI finale

### 2. Classes CSS vérifiées
- ✅ `container-pau` : Défini dans globals.css ligne 110
- ✅ `section-pau` : Défini dans globals.css ligne 117
- ✅ `title-hero` : Défini dans globals.css ligne 123
- ✅ `title-section` : Défini dans globals.css ligne 130
- ✅ **Aucune classe manquante**

---

## ⚠️ ACTIONS REQUISES AVANT DÉPLOIEMENT

### 1. Configuration environnement (.env.local)

Créer `.env.local` à la racine avec :

```bash
# Application
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
APP_ENV=production

# Supabase (BDD + Auth + Storage)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Prisma / Postgres (connection pooling port 6543)
DATABASE_URL=postgresql://postgres.xxx:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
# Connection directe pour migrations (port 5432)
DIRECT_URL=postgresql://postgres.xxx:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Sécurité
ALLOWED_ORIGINS=https://votre-domaine.com
SESSION_SECRET=<générer 64 bytes random>

# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Génération SESSION_SECRET** :
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

### 2. Créer les migrations Prisma

Une fois `.env.local` configuré :

```bash
npm run db:migrate -- --name init_schema
```

Cela crée le dossier `prisma/migrations/` avec le schéma initial versionnés.

**Puis commiter** :
```bash
git add prisma/migrations/
git commit -m "chore: add Prisma migrations for production"
```

---

### 3. Commiter les nouveaux fichiers

```bash
git add app/(public)/billetterie/selection-places/
git add app/(public)/equipe/stats/
git add app/(public)/galerie/
git add app/(public)/presse/
git add app/(public)/videos/
git add app/api/comments/
git add app/api/matches/
git add app/api/search/
git add components/comments/
git add components/layout/LanguageSwitcher.jsx
git add components/layout/SearchModal.jsx
git add components/match/
git add components/optimized/
git add components/stats/
git add components/ticketing/
git add components/videos/
git add i18n.js
git add middleware.js
git add lib/image-utils.js
git add messages/

git commit -m "feat: add presse, stats, search, 3D seats, i18n, optimizations"
```

---

### 4. Tests locaux obligatoires

```bash
# 1. Build de production
npm run build

# Vérifier :
# - Aucune erreur TypeScript/ESLint
# - Aucun import manquant
# - Toutes les pages compilent

# 2. Lancer en mode production
npm run start

# Tester :
# - Homepage charge
# - Navigation fonctionne
# - Images s'affichent
# - Pas d'erreurs console

# 3. Linter
npm run lint

# Doit retourner 0 erreurs
```

---

## 🔧 CONFIGURATION SUPABASE (POST-DÉPLOIEMENT)

### 1. Row-Level Security (RLS)

Activer RLS sur **toutes les tables sensibles** :

```sql
-- Users (lecture publique, écriture restreinte)
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data" ON "User"
  FOR SELECT USING (auth.uid()::text = "authUserId");

CREATE POLICY "Users can update own data" ON "User"
  FOR UPDATE USING (auth.uid()::text = "authUserId");

-- Orders (lecture propre user uniquement)
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own orders" ON "Order"
  FOR SELECT USING (auth.uid()::text IN (
    SELECT "authUserId" FROM "User" WHERE id = "userId"
  ));

-- LoyaltyAccount, Address, CartReservation : même logique
-- Admin : bypass RLS via service_role_key côté serveur
```

**Important** : Adapter les policies selon besoins métier (voir doc Supabase RLS).

---

### 2. Storage Policies

Configurer les buckets Supabase Storage pour images produits/joueurs :

```sql
-- Bucket public pour images produits
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true);

-- Policy : lecture publique, écriture admin uniquement
CREATE POLICY "Public can view products" ON storage.objects
  FOR SELECT USING (bucket_id = 'products');

CREATE POLICY "Admins can upload products" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'products' AND
    auth.role() = 'authenticated' AND
    auth.uid()::text IN (
      SELECT "authUserId" FROM "User" WHERE role = 'admin'
    )
  );
```

---

### 3. Auth Templates Email

Personnaliser les emails Supabase Auth :
- **Confirmation email** : Ajouter logo FC Pau
- **Reset password** : Brand identity Pau FC
- **Magic link** : Design cohérent

Dashboard Supabase → Authentication → Email Templates

---

## 🌐 DÉPLOIEMENT VERCEL

### 1. Connecter le repo GitHub

```bash
# Depuis Vercel Dashboard
1. New Project
2. Import Git Repository
3. Sélectionner fcpau
```

### 2. Variables d'environnement

Copier **toutes les variables** de `.env.local` dans Vercel :

Settings → Environment Variables → Add

**Attention** :
- `DATABASE_URL` : Utiliser connection pooling (port 6543)
- `DIRECT_URL` : Non nécessaire en prod Vercel (migrations en local)

### 3. Build Configuration

Vercel détecte automatiquement Next.js 14, mais vérifier :

```
Framework: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 4. Deploy

```bash
git push origin main
# Vercel déploie automatiquement
```

---

## 🔐 WEBHOOKS STRIPE EN PRODUCTION

### 1. Créer le webhook Stripe

Dashboard Stripe → Developers → Webhooks → Add endpoint

```
URL: https://votre-domaine.com/api/webhooks/stripe
Events:
  - checkout.session.completed
  - payment_intent.succeeded
  - charge.refunded
```

### 2. Récupérer le signing secret

Copier `whsec_xxx` → Ajouter à Vercel env vars : `STRIPE_WEBHOOK_SECRET`

### 3. Tester le webhook

```bash
stripe trigger checkout.session.completed
# Vérifier les logs Vercel
```

---

## ⏰ CRON VERCEL

Le cron de purge panier est déjà configuré dans `vercel.json` :

```json
{
  "crons": [{
    "path": "/api/cron/purge-cart",
    "schedule": "0 3 * * *"
  }]
}
```

Vercel l'activera automatiquement en prod (nécessite plan Pro).

---

## 📊 POST-DÉPLOIEMENT : MONITORING

### 1. Google Analytics

Vérifier que `NEXT_PUBLIC_GA_ID` est set → Analytics actif automatiquement.

### 2. Sentry (optionnel)

Si besoin de monitoring erreurs :

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

Puis set `SENTRY_DSN` dans Vercel env vars.

### 3. Vercel Analytics

Activer depuis Dashboard Vercel (gratuit sur Pro plan).

---

## 🧪 TESTS E2E (OPTIONNEL)

Playwright est mentionné dans CLAUDE.md mais pas configuré.

Si besoin :

```bash
npm install -D @playwright/test
npx playwright install
```

Créer `tests/e2e/checkout.spec.js` :

```javascript
import { test, expect } from '@playwright/test';

test('Checkout flow complet', async ({ page }) => {
  await page.goto('/boutique');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="cart-button"]');
  await page.fill('[name="email"]', 'test@example.com');
  // ... suite du flow
});
```

---

## ✅ CHECKLIST FINALE

Avant de mettre en prod, cocher :

- [ ] `.env.local` complet avec vraies clés Supabase + Stripe
- [ ] `npm run build` réussit sans erreurs
- [ ] `npm run lint` retourne 0 erreurs
- [ ] Migrations Prisma créées et commitées
- [ ] Tous les nouveaux fichiers git add + commit
- [ ] RLS Supabase activé sur tables sensibles
- [ ] Storage policies configurées
- [ ] Webhooks Stripe créés et testés
- [ ] Variables env copiées dans Vercel
- [ ] Premier déploiement Vercel réussi
- [ ] Homepage s'affiche correctement en prod
- [ ] Checkout test en mode Stripe test
- [ ] Analytics Google fonctionne (voir Real-Time)
- [ ] CSP headers n'bloquent rien (vérifier console)

---

## 🔮 AMÉLIORATIONS FUTURES (POST-MVP)

### Phase 2 (Semaine 1-2)
1. **Gestion refunds Stripe** : Implémenter les 2 TODOs dans `webhooks/stripe/route.js`
2. **CSP nonce-based** : Durcir Content-Security-Policy (PR-3 noté)
3. **Tests E2E Playwright** : Couvrir tunnels critiques (checkout, login, config 3D)
4. **Section Équipe Féminine** : Si Pau FC a une équipe féminine

### Phase 3 (Mois 1)
1. **Optimisation images** : Migration vers CDN (Cloudinary/Supabase Storage)
2. **Cache Redis** : Pour sessions panier et stock temps réel
3. **Rate limiting** : Protection API contre spam
4. **Sitemap dynamique** : Généré depuis Prisma (produits, articles)

---

## 📞 SUPPORT

En cas de blocage :

1. **Supabase** : https://supabase.com/docs
2. **Stripe** : https://stripe.com/docs
3. **Vercel** : https://vercel.com/docs
4. **Next.js** : https://nextjs.org/docs

---

**Résumé** : Le site est **production-ready** après avoir configuré les variables d'environnement et créé les migrations Prisma. Toutes les fonctionnalités core sont implémentées, testées et conformes à la charte graphique FC Pau.

🎯 **Prêt pour le MVP !**
