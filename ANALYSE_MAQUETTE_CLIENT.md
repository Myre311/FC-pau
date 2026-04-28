# Analyse Maquette Client - Pau FC
*Date : 28 avril 2026*

## 🎨 DESIGN SYSTEM

### Couleurs (identiques à notre charte ✓)
```css
--color-dark: #04091D       /* pau-night */
--color-dark-2: #1A1D38     /* pau-primary */
--color-yellow: #FFCC00     /* pau-yellow */
--color-gold: #CBA74D       /* pau-gold */
--color-white: #FFFFFF

/* Fonds */
--bg-dark: #04091D
--bg-darker: #0c1127       /* Desktop uniquement */

/* Bordures */
--white-border: rgba(255,255,255,0.12)
--white-border-hover: rgba(255,255,255,0.25)

/* Textes */
--text-white: #FFFFFF
--text-muted: rgba(255,255,255,0.55)
--text-dimmed: rgba(255,255,255,0.25)
```

### Typographies ⚠️ À CHANGER
**Actuelles (à remplacer)** :
- Big Shoulders Display
- Instrument Sans
- DM Mono

**Maquette client (à intégrer)** :
- **Gyst Variable** (titres, uppercase, 100-900)
- **Bicyclette** (corps de texte, Regular/Light/Bold/Black/Thin/Ultra/Italic)

### Breakpoints
- Desktop : ≥ 993px
- Mobile : < 992px

---

## 📱 STRUCTURE HOMEPAGE

### Version Desktop (≥993px)
```
┌─────────────────────────────────────────┐
│  Header (transparent)                   │
│  Logo (centre) | Billetterie | Boutique │
├──────────────────┬──────────────────────┤
│                  │                      │
│  VIDÉO (50%)     │  IMAGE BOUTIQUE (50%)│
│  Hero fullscreen │  Static image        │
│                  │                      │
│    [Carte Match avec compte à rebours]  │
│                  │                      │
└──────────────────┴──────────────────────┘
```

**Spécificités** :
- Position : `fixed` full viewport
- Vidéo : `object-fit: cover` 50% gauche
- Navigation : Billetterie (25%), Boutique (75%)
- Carte match : centrée avec `position: absolute`

### Version Mobile (<992px)
```
┌─────────────────┐
│ Burger    Logo  │
├─────────────────┤
│                 │
│  VIDÉO HERO     │
│  fullscreen     │
│                 │
│  CTA Buttons    │
├─────────────────┤
│  Prochains      │
│  matchs         │
├─────────────────┤
│  Popup          │
│  Newsletter     │
└─────────────────┘
```

---

## 🛍️ STRUCTURE BOUTIQUE

### Layout Asymétrique
```
┌────────────────────────────────────┐
│  Navigation sticky top             │
├──────────┬─────────────────────────┤
│          │                         │
│ SIDEBAR  │  Grille Produits       │
│ (sticky) │  (scroll vertical)     │
│          │                         │
│  Image   │  [Card] [Card] [Card]  │
│  + Titre │  [Card] [Card] [Card]  │
│  + CTA   │                         │
│          │                         │
└──────────┴─────────────────────────┘
```

**Alternance** : Sidebar gauche/droite par section (reverse-layout)

### Composants Boutique

#### 1. Hero Carousel
- 3 slides avec images de fond
- Navigation par thumbnails en bas
- Overlay sombre pour lisibilité
- CTA "Acheter maintenant"

#### 2. Product Card
```html
<article class="product-item">
  <div class="product-image">
    <img src="..." />
    <button class="quick-add-btn">AJOUTER</button>
  </div>
  <div class="product-details">
    <span class="product-cat">Tenues 25/26</span>
    <h3>Maillot Domicile</h3>
    <p class="price">75€</p>
  </div>
</article>
```

#### 3. Modal Quick Add
- Sélecteur de taille (S/M/L/XL/XXL)
- Sélecteur de quantité (+/-)
- Bouton "AJOUTER AU PANIER — 75€"
- Image produit à gauche

#### 4. Drawers
- **Cart Drawer** (panier) : droite
- **User Drawer** (connexion) : droite
- Overlay avec `onclick` pour fermer

---

## 🎯 COMPOSANTS CLÉS

### 1. Carte Match
```
┌─────────────────────────────────┐
│  [Logo L2 BKT]                  │
│                                 │
│  Compte à rebours               │
│  00j 00h 00m 00s                │
│                                 │
│  [Logo A] vs [Logo B]           │
│  ÉQUIPE A    ÉQUIPE B           │
│                                 │
│  Date · Heure                   │
│  Lieu                           │
│                                 │
│  [Bouton VOS PLACES]            │
└─────────────────────────────────┘
```

### 2. Popup Newsletter
```
┌─────────────────────────────────┐
│              [X]                │
│                                 │
│  OFFRE DE BIENVENUE             │
│                                 │
│  REJOINS                        │
│  LE CLUB.                       │
│                                 │
│  10% de réduction               │
│                                 │
│  [Input Email]                  │
│  [OBTENIR MON CODE]             │
│                                 │
│  Pas de spam, seulement         │
│  l'essentiel du Pau FC.         │
└─────────────────────────────────┘
```

### 3. Menu Burger Mobile
- Fullscreen overlay
- Navigation principale
- Liens secondaires
- Animation slide-in

### 4. Bandeau Défilant
```
HOLY — PAU FC 5 · retire 5€ sur ta première commande
```
Répété en boucle, défilement horizontal infini.

---

## 📦 ASSETS À RÉCUPÉRER

### Homepage
```
Source/
├── HEADER NC V2 (1).mp4          # Vidéo hero
├── Logo-Pau-FC-2023.png          # Logo officiel
├── Logo-MHSC.png                 # Logo équipe adverse
├── Billetterie-hover.png         # Nav hover
├── Boutique-hover.png            # Nav hover
├── Boutique.png                  # Splitscreen droite
├── Couronne.png                  # Icon
├── billetterie-enfant.jpg        # Section
├── maillot-ext-dom.jpg           # Section
└── Word-presse-ordi.png          # ?
```

### Boutique
```
Images/
├── Boutique-1.jpg                # Maillot domicile
├── Boutique-2.jpg                # Maillot extérieur
├── Holy-maillot.jpg              # Maillot gardien rose
├── Maillot-Holy-2.jpg            # Maillot gardien vert
├── Tenues2526.jpg                # Sidebar cover
├── couverture (2).jpg            # Training cover
├── Palois.jpg                    # Lifestyle cover
├── HOLY-12.jpg                   # Accessoires cover
├── maillot training.jpg
├── pull-training.jpg
├── haut-survet-sortie.png
├── maillot-warm-up.jpg
├── echarpe.jpg
├── ballon_sans_ombre.png
├── maillot-dom-court.png
└── News-letter.jpg
```

### Polices
```
fonts/
├── Gyst-Variable.otf
├── Bicyclette-Regular.ttf
├── Bicyclette-Light.ttf
├── Bicyclette-Bold.ttf
├── Bicyclette-Black.ttf
├── Bicyclette-Thin.ttf
├── Bicyclette-Ultra.ttf
└── Bicyclette-Italic.ttf
```

---

## 🚀 PLAN DE MIGRATION HYBRIDE

### ✅ Ce qu'on GARDE (Next.js structure)
- Structure App Router Next.js 14
- Prisma + Supabase
- Routes API
- Server Components / Client Components
- Notre système d'auth
- Notre gestion de panier (Zustand)
- Notre logique métier

### 🔄 Ce qu'on ADAPTE (style maquette)

#### Phase 1 : Fondations (1-2h)
- [ ] Télécharger toutes les images/vidéos de la maquette
- [ ] Intégrer les polices Gyst Variable + Bicyclette
- [ ] Mettre à jour `tailwind.config.js` avec les nouvelles polices
- [ ] Mettre à jour `globals.css` avec les variables CSS de la maquette

#### Phase 2 : Homepage (2-3h)
- [ ] Refaire le Header : logo centré + nav simple
- [ ] Créer le layout desktop splitté (vidéo/image)
- [ ] Créer la carte match avec compte à rebours
- [ ] Adapter version mobile avec hero vidéo
- [ ] Ajouter popup newsletter
- [ ] Ajouter menu burger mobile

#### Phase 3 : Boutique (3-4h)
- [ ] Créer le hero carousel
- [ ] Créer le layout asymétrique sidebar + grille
- [ ] Adapter les product cards (style maquette)
- [ ] Créer modal Quick Add
- [ ] Créer les drawers (panier + user)
- [ ] Implémenter l'alternance sidebar gauche/droite

#### Phase 4 : Composants globaux (1-2h)
- [ ] Refaire le Footer (style maquette)
- [ ] Bandeau défilant promotionnel
- [ ] Navigation sticky
- [ ] Transitions page

#### Phase 5 : Pages secondaires (2-3h)
- [ ] Adapter Calendrier
- [ ] Adapter Équipe
- [ ] Adapter Actualités
- [ ] Adapter Academy
- [ ] Adapter pages statiques

#### Phase 6 : Polish (1-2h)
- [ ] Animations (ScrollReveal existant OK)
- [ ] Transitions carousel
- [ ] Hover states
- [ ] Loading states
- [ ] Responsive final check

---

## 🎨 DIFFÉRENCES CLÉS vs NOTRE DESIGN ACTUEL

| Aspect | Actuel | Maquette Client |
|--------|--------|-----------------|
| **Typo** | Big Shoulders + Instrument | Gyst + Bicyclette |
| **Homepage Desktop** | Grille classique | Splitté 50/50 fixe |
| **Navigation** | Header classique | Minimaliste centré |
| **Boutique** | Grille simple | Layout asymétrique |
| **Match card** | Card simple | Card avec countdown |
| **Mobile menu** | Drawer latéral | Fullscreen overlay |
| **Popup** | Pas de popup | Newsletter onload |

---

## ⚠️ POINTS D'ATTENTION

### Performance
- Vidéo hero : lazy-load conditionnelle (desktop/mobile)
- Images : Next/Image avec blur placeholder
- Polices : font-display: swap

### Accessibilité
- aria-labels sur tous les boutons
- Drawer avec aria-modal
- Navigation keyboard-friendly

### SEO
- Metadata Next.js sur toutes les pages
- Images avec alt descriptifs
- Sitemap/robots.txt

### Responsive
- Breakpoint strict 992px (maquette)
- Tests 360px (mobile) et 768px (tablet)
- Desktop min 1280px

---

## 📝 NOTES IMPORTANTES

1. **Sans aspect IA** :
   - Utiliser les vraies images de la maquette
   - Respecter exactement les espacements
   - Copier les animations subtiles
   - Textes réels (pas de Lorem)
   - Polices officielles

2. **Structure hybride** :
   - On garde Next.js + Prisma + Supabase (backend)
   - On porte uniquement le frontend/design
   - Les composants React restent nos composants
   - On adapte juste le style CSS

3. **Timeline estimée** :
   - Total : ~10-15h de dev
   - Priorité : Homepage + Boutique (70% de l'impact)
   - Reste : pages secondaires peuvent suivre le pattern

---

*Document créé par Claude Code - À jour au 28/04/2026*
