# Charte graphique officielle Pau FC

## 🎨 Couleurs

| Nom | Hex | Tailwind | CSS Var | Usage |
|-----|-----|----------|---------|-------|
| **Bleu nuit** | `#04091D` | `bg-pau-night` | `var(--pau-night)` | Header, footer, zones boutique (cartes produit, panier, checkout) |
| **Bleu primaire** | `#1A1D38` | `bg-pau-primary` | `var(--pau-primary)` | Corps des pages, sections contenu, cartes match/joueur/info |
| **Bleu primaire hover** | `#252A4D` | `bg-pau-primary-hover` | `var(--pau-primary-hover)` | État hover du bleu primaire |
| **Jaune** | `#FFCC00` | `text-pau-yellow` | `var(--pau-yellow)` | Accent identité club : titres accent, prix, CTA primaires, badges |
| **Doré** | `#CBA74D` | `text-pau-gold` | `var(--pau-gold)` | **EXCLUSIVEMENT** zone partenaires (accents, séparateurs, hover) |
| **Doré hover** | `#B89640` | `text-pau-gold-hover` | `var(--pau-gold-hover)` | État hover du doré |
| **Blanc** | `#FFFFFF` | `bg-pau-white` | `var(--pau-white)` | Fonds clairs, texte sur fond foncé |

### Règles de hiérarchie

1. **`#04091D` (bleu nuit)** = couleur la plus profonde
   - Réservée aux zones structurelles (header/footer)
   - Zones marchandes (boutique, panier, checkout)
   - C'est le "noir bleuté" du site

2. **`#1A1D38` (bleu primaire)** = couleur principale d'identité
   - Toutes les pages éditoriales
   - L'équipe, calendrier, club, histoire
   - Cartes match, joueur, info

3. **`#FFCC00` (jaune)** ≠ `#CBA74D` (doré)
   - **NE JAMAIS les mélanger**
   - Jaune = partout
   - Doré = uniquement espace partenaires

4. **Blanc** = fonds clairs + texte lisible

## 🎯 Zones d'application

### Header & Footer
```jsx
className="bg-pau-night text-white"
```

### Cartes produit (boutique)
```jsx
className="bg-pau-night border border-white/5"
```

### Cartes éditoriales (match, joueur, club)
```jsx
className="bg-pau-primary border border-white/10"
```

### Section partenaires
```jsx
// Titre avec barre dorée
<div className="w-12 h-1 bg-pau-gold mb-4" />
<h2 className="text-pau-gold">Nos partenaires</h2>

// Logo partenaire
<div className="border-pau-gold/20 hover:border-pau-gold/60">
  {/* ... */}
</div>
```

### Sections fond blanc
```jsx
<section className="bg-white text-pau-primary">
  {/* ... */}
</section>
```

## 📐 Composants partagés

### `<PageHero />`
Hero standard avec image de fond + gradient bleu primaire
```jsx
<PageHero
  image="/images/hero-equipe.jpg"
  surtitle="Effectif · Saison 2025-2026"
  title="L'ÉQUIPE"
  subtitle="Découvrez les joueurs..."
/>
```

### `<SectionLight />`
Section sur fond blanc avec texte bleu primaire
```jsx
<SectionLight>
  <h2 className="text-pau-primary">Titre</h2>
  <p>Contenu...</p>
</SectionLight>
```

### `<PartnerLogo />`
Logo partenaire avec fallback texte (utilise doré, pas jaune)
```jsx
<PartnerLogo
  name="Groupama"
  logo="/logos/partners/groupama.png"
  href="https://groupama.fr"
/>
```

## 📏 Layout constants

Container principal :
```jsx
className="mx-auto max-w-7xl px-6"
```

Espacement sections :
```jsx
className="py-12 md:py-16"
```

Gap entre cartes :
```jsx
className="gap-4 md:gap-6"
```

## ✏️ Typographie

Échelle stricte :
- `text-xs` : 12px - labels, captions
- `text-sm` : 14px - texte secondaire
- `text-base` : 16px - corps
- `text-lg` : 18px - lead
- `text-xl` : 20px - sous-titres cartes
- `text-2xl` : 24px - titres section mobile
- `text-3xl` : 30px - h2 desktop
- `text-4xl` : 36px - h2 large
- `text-5xl` : 48px - hero mobile
- `text-6xl` : 60px - hero desktop
- `text-7xl` : 72px - hero XL

Styles standards :
```jsx
// Titres pages (h1)
className="text-5xl md:text-7xl font-black uppercase tracking-tight"

// Titres sections (h2)
className="text-3xl md:text-4xl font-black uppercase"

// Sous-titres cartes (h3)
className="text-lg md:text-xl font-black uppercase"

// Surtitres jaune
className="text-xs font-semibold tracking-[0.25em] uppercase text-pau-yellow"

// Corps
className="text-base md:text-lg leading-relaxed"

// Captions
className="text-xs tracking-widest uppercase"
```

## ⚠️ Règles strictes

### ❌ INTERDIT
- Mixer jaune (`#FFCC00`) et doré (`#CBA74D`) dans une même section
- Utiliser le doré hors de la zone partenaires
- Container sans `mx-auto max-w-7xl px-6`
- Tailles typo hors échelle (`text-[17px]`, etc.)

### ✅ OBLIGATOIRE
- Cartes produit (boutique) : `bg-pau-night`
- Cartes éditoriales : `bg-pau-primary`
- Section partenaires : accent doré uniquement
- Header/Footer : `bg-pau-night`

## 🎨 Dashboard admin

Style Shopify-like avec couleurs Pau FC :

- **Sidebar** : `bg-pau-night` + texte blanc + hover jaune
- **Topbar** : `bg-pau-night` + séparateur subtil
- **Contenu** : `bg-white` + `text-pau-primary`
- **Boutons primaires** : `bg-pau-yellow text-pau-night`
- **Boutons secondaires** : `border-pau-primary text-pau-primary`
- **Tableaux** : entêtes `bg-pau-primary/5`

Status badges :
- Published/Active : `bg-green-100 text-green-800`
- Draft : `bg-pau-primary/10 text-pau-primary`
- Archived : `bg-red-100 text-red-800`

## 📅 Dernière mise à jour

27 avril 2026 — Application charte officielle client
