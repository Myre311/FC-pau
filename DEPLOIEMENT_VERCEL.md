# 🚀 Guide de déploiement Vercel — FC Pau

## 📋 Pré-requis

- ✅ Compte Vercel (gratuit) : https://vercel.com/signup
- ✅ Projet GitHub/GitLab (ou déploiement direct depuis CLI)
- ✅ Variables d'environnement Supabase (déjà configurées localement)

---

## 1️⃣ Déploiement depuis l'interface Vercel

### Étape 1 : Connecter le repo
1. Va sur https://vercel.com/new
2. Clique sur **"Import Git Repository"**
3. Connecte ton compte GitHub/GitLab
4. Sélectionne le repo `fcpau`

### Étape 2 : Configurer le projet
Vercel détecte automatiquement Next.js, mais vérifie :
- **Framework Preset** : Next.js
- **Build Command** : `npm run build`
- **Output Directory** : `.next` (par défaut)
- **Install Command** : `npm install`

### Étape 3 : Ajouter les variables d'environnement

Copie les variables depuis ton `.env.local` :

```env
# Application
NEXT_PUBLIC_SITE_URL=https://TON-DOMAINE.vercel.app
APP_ENV=production

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://oakjepaincpifhxlsdzo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ha2plcGFpbmNwaWZoeGxzZHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNjYxMjksImV4cCI6MjA5Mjc0MjEyOX0.FQwpfJnNwyt7Y3ogJ6-ThOApNdXGft1bunfDvkuVVLc
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ha2plcGFpbmNwaWZoeGxzZHpvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzE2NjEyOSwiZXhwIjoyMDkyNzQyMTI5fQ.rWZyLKuMu70-n5fKy84h3eFp4_od8GquktsVZnCJCqk

# Prisma / Postgres
DATABASE_URL=postgresql://postgres.oakjepaincpifhxlsdzo:Qgvtk051197%2F@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.oakjepaincpifhxlsdzo:Qgvtk051197%2F@aws-0-eu-west-1.pooler.supabase.com:5432/postgres

# Stripe (à remplir quand tu auras un compte Stripe)
STRIPE_SECRET_KEY=sk_test_XXXXXXX
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXX

# Sécurité
POS_WEBHOOK_SECRET=GENERE_UN_SECRET_RANDOM
ALLOWED_ORIGINS=https://TON-DOMAINE.vercel.app
SESSION_SECRET=GENERE_UN_SECRET_RANDOM_64_BYTES
```

**⚠️ Important** :
- Remplace `TON-DOMAINE.vercel.app` par ton vrai domaine Vercel
- Pour `POS_WEBHOOK_SECRET` et `SESSION_SECRET`, génère des secrets aléatoires :
  ```bash
  # Sur Windows PowerShell
  -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
  
  # Sur Mac/Linux
  openssl rand -hex 32
  ```

### Étape 4 : Déployer
1. Clique sur **"Deploy"**
2. Attends ~2-3 minutes
3. Vercel te donne une URL : `https://fcpau-xxxxx.vercel.app`

---

## 2️⃣ Configurer Supabase pour Vercel

### Ajouter le domaine Vercel aux origines autorisées

1. Va dans **Supabase Dashboard → Authentication → URL Configuration**
2. Ajoute ton URL Vercel dans :
   - **Site URL** : `https://TON-DOMAINE.vercel.app`
   - **Redirect URLs** : `https://TON-DOMAINE.vercel.app/**`

---

## 3️⃣ Configurer Stripe (plus tard)

Quand tu seras prêt à activer les paiements :

### 1. Créer un compte Stripe
- Mode **Test** : https://dashboard.stripe.com/test/dashboard
- Mode **Live** : https://dashboard.stripe.com/

### 2. Récupérer les clés API
- Dashboard → **Developers → API keys**
- Copie la **Publishable key** et **Secret key**

### 3. Configurer le webhook Stripe
- Dashboard → **Developers → Webhooks**
- Endpoint : `https://TON-DOMAINE.vercel.app/api/webhooks/stripe`
- Events à écouter :
  - `checkout.session.completed`
  - `payment_intent.succeeded`
  - `payment_intent.payment_failed`
- Copie le **Signing secret** (`whsec_...`)

### 4. Mettre à jour les variables Vercel
- Ajoute les vraies clés Stripe dans Vercel
- Redéploie le site

---

## 4️⃣ Domaine personnalisé (optionnel)

Si tu veux utiliser `boutique.paufc.fr` au lieu de `fcpau-xxxxx.vercel.app` :

### Dans Vercel
1. Projet → **Settings → Domains**
2. Ajoute `boutique.paufc.fr`
3. Vercel te donne un **CNAME** à configurer

### Chez ton registrar DNS (OVH, Cloudflare, etc.)
1. Ajoute un enregistrement **CNAME** :
   ```
   boutique.paufc.fr → cname.vercel-dns.com
   ```
2. Attends la propagation DNS (~10 min)
3. Vercel provisionne automatiquement le SSL

---

## 5️⃣ Checklist post-déploiement

- [ ] Le site est accessible sur l'URL Vercel
- [ ] La connexion admin fonctionne (`admin@paufc.local` / `AdminPauFC2026!`)
- [ ] Les produits s'affichent dans la boutique
- [ ] Le responsive mobile fonctionne (tester sur téléphone)
- [ ] Les images se chargent correctement
- [ ] Les fonts Google Fonts se chargent
- [ ] Lighthouse > 95 sur toutes les métriques
- [ ] Supabase Auth fonctionne (connexion/déconnexion)
- [ ] (Plus tard) Stripe checkout fonctionne

---

## 🆘 Dépannage

### Erreur "Cannot reach database server"
- Vérifie que `DATABASE_URL` et `DIRECT_URL` sont correctes dans Vercel
- Vérifie que le mot de passe est bien encodé (`/` → `%2F`)

### Erreur "Auth session missing"
- Vérifie que l'URL Vercel est ajoutée dans Supabase → Authentication → URL Configuration

### Build failed
- Vérifie les logs Vercel
- Teste `npm run build` localement d'abord

---

## 📞 Support

- Vercel Docs : https://vercel.com/docs
- Next.js Docs : https://nextjs.org/docs
- Supabase Docs : https://supabase.com/docs

---

**Bonne chance pour le déploiement ! 🚀**
