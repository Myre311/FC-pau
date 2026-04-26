# 🚀 DÉPLOIEMENT VERCEL — GUIDE RAPIDE

## Option A : Déploiement via Dashboard Vercel (Recommandé)

### 1. Créer/Se connecter à Vercel
👉 https://vercel.com/signup

### 2. Importer le projet GitHub
1. **New Project**
2. **Import Git Repository**
3. Sélectionner : `Myre311/FC-pau`
4. Autoriser l'accès GitHub si demandé

### 3. Configuration du projet

**Framework Preset** : Next.js (détecté automatiquement)

**Build Settings** :
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

✅ Laisser par défaut, Vercel détecte tout automatiquement.

### 4. Variables d'environnement (CRITIQUE)

Cliquer sur **Environment Variables** et ajouter **toutes ces variables** :

```bash
# Application
NEXT_PUBLIC_SITE_URL=https://votre-domaine-vercel.vercel.app
APP_ENV=production

# Supabase (COPIER DEPUIS .env.local)
NEXT_PUBLIC_SUPABASE_URL=https://oakjepaincpifhxlsdzo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ha2plcGFpbmNwaWZoeGxzZHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNjYxMjksImV4cCI6MjA5Mjc0MjEyOX0.FQwpfJnNwyt7Y3ogJ6-ThOApNdXGft1bunfDvkuVVLc
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ha2plcGFpbmNwaWZoeGxzZHpvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzE2NjEyOSwiZXhwIjoyMDkyNzQyMTI5fQ.rWZyLKuMu70-n5fKy84h3eFp4_od8GquktsVZnCJCqk

# Postgres (COPIER DEPUIS .env.local)
DATABASE_URL=postgresql://postgres.oakjepaincpifhxlsdzo:Qgvtk051197%2F@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true

# DIRECT_URL pas nécessaire en prod (migrations se font en local)

# Stripe (URGENT : REMPLACER LES STUBS)
# Pour l'instant, mettre les stubs (le site marchera sauf checkout)
STRIPE_SECRET_KEY=sk_test_stub_not_real
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_stub_not_real
STRIPE_WEBHOOK_SECRET=whsec_stub_not_real

# Sécurité (COPIER DEPUIS .env.local)
SESSION_SECRET=7e8acb4b09e0ba9bcf12b505feb9644b0c04c54f1b1c7658a7c51f58ca5140846ee33fc56724b9d193b38adcc6a09ad56e8db475a489d96ab474dac739b47698
POS_WEBHOOK_SECRET=25968cea3f7aa3614043398e044b14db92c61adaadf18f75615ef460aeb72d39
ALLOWED_ORIGINS=https://votre-domaine-vercel.vercel.app

# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=
```

**⚠️ IMPORTANT** :
- Copier **EXACTEMENT** les clés Supabase depuis ton `.env.local`
- Remplacer `votre-domaine-vercel.vercel.app` par l'URL Vercel assignée (ex: `fc-pau-xyz123.vercel.app`)
- Pour Stripe : soit mettre les vraies clés, soit laisser les stubs (checkout ne marchera pas)

### 5. Déployer

Cliquer sur **Deploy** !

Vercel va :
1. Cloner le repo GitHub
2. Installer les dépendances (`npm install`)
3. Générer Prisma Client
4. Builder Next.js
5. Déployer sur le CDN global

⏱️ Durée : ~3-5 minutes

---

## Option B : Déploiement via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Login
vercel login

# Déployer (depuis le dossier du projet)
vercel

# Suivre les prompts :
# - Link to existing project? No
# - Project name: fc-pau
# - Directory: ./
# - Override settings? No

# Ajouter les variables d'env
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add DATABASE_URL
# ... (toutes les autres)

# Re-déployer avec les env vars
vercel --prod
```

---

## Post-Déploiement : Vérifications

### 1. Site accessible ✅
- Homepage charge : `https://votre-domaine.vercel.app`
- Navigation fonctionne
- Images s'affichent (Unsplash)

### 2. Base de données connectée ✅
- Page `/equipe` affiche les joueurs
- Page `/actualites` affiche les articles
- Page `/boutique` affiche les produits

### 3. Admin accessible ✅
- Aller sur `/admin` → redirige vers `/connexion`
- Se connecter avec : `admin@paufc.local`
- Dashboard s'affiche avec stats

### 4. Checkout (⚠️ Nécessite vraies clés Stripe)
- Ajouter produit au panier
- Aller au checkout
- Si clés Stripe stubs → erreur API
- Si vraies clés → formulaire de paiement Stripe

---

## 🔧 Configurer Stripe pour Production

### 1. Créer compte Stripe
👉 https://dashboard.stripe.com/register

### 2. Récupérer les clés
**Mode Test** (pour tester) :
- Dashboard → Developers → API Keys
- Copier `Publishable key` (pk_test_...)
- Copier `Secret key` (sk_test_...)

**Mode Live** (production réelle) :
- Activer le compte (vérification identité)
- Passer en mode Live
- Copier les clés live (pk_live_..., sk_live_...)

### 3. Configurer le webhook Vercel

**URL webhook** : `https://votre-domaine.vercel.app/api/webhooks/stripe`

**Événements à écouter** :
- `checkout.session.completed`
- `payment_intent.succeeded`
- `charge.refunded`

**Récupérer signing secret** : `whsec_...`

### 4. Mettre à jour les env vars Vercel

Aller dans :
- Vercel Dashboard → Projet → Settings → Environment Variables
- Éditer `STRIPE_SECRET_KEY` → `sk_test_...` (ou `sk_live_...`)
- Éditer `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → `pk_test_...`
- Éditer `STRIPE_WEBHOOK_SECRET` → `whsec_...`

### 5. Re-déployer

Vercel Dashboard → Deployments → **Redeploy**

Ou via CLI : `vercel --prod`

---

## 🎯 Domaine Personnalisé (Optionnel)

### Si tu as un domaine (ex: paufc-shop.fr)

1. **Vercel Dashboard** → Projet → Settings → Domains
2. **Add Domain** : `paufc-shop.fr`
3. Configurer les DNS :
   - Type: `A` → IP: `76.76.21.21`
   - Type: `CNAME` → `cname.vercel-dns.com`
4. Attendre propagation DNS (~10 min à 24h)
5. SSL auto-généré par Vercel

---

## 📊 Monitoring Post-Déploiement

### Vercel Analytics (gratuit)
- Dashboard → Projet → Analytics
- Voir trafic, vitesse, erreurs

### Logs temps réel
- Dashboard → Projet → Deployments → [Latest] → **View Function Logs**
- Voir les requêtes API, erreurs serveur

### Google Analytics
- Une fois `NEXT_PUBLIC_GA_ID` set, GA4 actif automatiquement
- Voir dashboard : https://analytics.google.com

---

## ⚠️ POINTS D'ATTENTION

### 1. CORS / Allowed Origins
Si tu as des erreurs CORS :
- Mettre à jour `ALLOWED_ORIGINS` dans Vercel env vars
- Ajouter le domaine Vercel : `https://fc-pau-xyz.vercel.app`

### 2. CSP Headers
Si images externes ne chargent pas :
- Vérifier `next.config.js` → `img-src` dans CSP
- Unsplash et Supabase déjà autorisés

### 3. RLS Supabase
**Critique** : Activer Row-Level Security sur tables sensibles

```sql
-- Dans Supabase SQL Editor
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CartReservation" ENABLE ROW LEVEL SECURITY;

-- Policies : voir PRODUCTION_CHECKLIST.md
```

### 4. Cron Vercel (Purge panier)
- **Nécessite plan Vercel Pro** (~$20/mois)
- Ou créer un cron externe (GitHub Actions, Render Cron)
- Route : `GET /api/cron/purge-cart`

---

## 🎉 RÉSULTAT FINAL

Après déploiement, tu auras :

✅ **Site public** : Homepage, boutique, équipe, actualités, galerie, vidéos
✅ **Dashboard admin** : Gestion complète produits/commandes/stock/clients
✅ **Checkout Stripe** : Paiement sécurisé (si clés configurées)
✅ **PWA** : Installable sur mobile
✅ **i18n** : Français/Anglais/Espagnol
✅ **3D** : Configurateur maillot + sélecteur sièges
✅ **Performance** : CDN global, images optimisées, cache
✅ **SEO** : Metadata, sitemap, JSON-LD
✅ **SSL** : HTTPS automatique

---

## 🆘 En cas de problème

### Build échoue
- Vérifier logs Vercel : erreur détaillée
- Souvent : variable d'env manquante
- Ou : import cassé (vérifier localement `npm run build`)

### Site charge mais pages vides
- Erreur BDD : vérifier `DATABASE_URL`
- Voir logs serveur : Dashboard → Function Logs

### Admin inaccessible
- Vérifier que `admin@paufc.local` existe dans Supabase
- Créer mot de passe via Supabase Dashboard → Auth → Users

---

**Prêt à déployer ? Lance l'Option A (Dashboard) et copie les env vars !**
