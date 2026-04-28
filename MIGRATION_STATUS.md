# Migration vers Maquette Client - Status

*Dernière mise à jour : 28 avril 2026 15:30*

## ✅ PHASES TERMINÉES

### Phase 1 : Fondations (DONE ✓)
- [x] Assets téléchargés (8 images homepage + boutique)
- [x] Polices intégrées (Oswald + Inter)
- [x] Variables CSS maquette client
- [x] Configuration Tailwind

**Commit** : `9dbd3bc` - feat(maquette): Phase 1 - Migration fondations

---

### Phase 2 : Homepage (DONE ✓)
- [x] HeaderMaquette (logo centré, nav 25%/75%)
- [x] MatchCardWithCountdown (compte à rebours live)
- [x] NewsletterPopup (offre bienvenue 10%)
- [x] ScrollingBanner (bandeau défilant)
- [x] Layout splitté desktop (vidéo 50% + image 50%)
- [x] Version mobile responsive

**Commit** : `69d32f2` - feat(maquette): Phase 2 - Homepage layout splitté

**Pages créées** :
- `app/(public)/page-maquette.js` (nouvelle homepage)

---

### Phase 3 : Boutique (DONE ✓)
- [x] HeroCarousel (3 slides + thumbnails)
- [x] AsymmetricSection (sidebar sticky + grille)
- [x] ProductCardMaquette (bouton AJOUTER au hover)
- [x] QuickAddModal (taille + quantité)
- [x] Page boutique complète avec 3 sections

**Commit** : `d66727e` - feat(maquette): Phase 3 - Boutique layout asymétrique

**Pages créées** :
- `app/(public)/boutique/page-maquette.js` (nouvelle boutique)

---

## 🚧 PHASES RESTANTES

### Phase 4 : Composants globaux (TODO)
Durée estimée : 1-2h

- [ ] Footer style maquette
- [ ] Navigation sticky (avec sections)
- [ ] Drawer panier (slide-in droite)
- [ ] Drawer user/connexion
- [ ] Bandeau handle top (jaune avec flèche)

### Phase 5 : Pages secondaires (TODO)
Durée estimée : 2-3h

- [ ] Adapter page Calendrier (style maquette)
- [ ] Adapter page Équipe (style maquette)
- [ ] Adapter page Actualités (style maquette)
- [ ] Adapter page Academy (style maquette)
- [ ] Pages statiques (CGV, mentions, etc.)

### Phase 6 : Polish final (TODO)
Durée estimée : 1-2h

- [ ] Tests responsive complet (360px, 768px, 1280px, 1920px)
- [ ] Animations scroll (déjà OK avec ScrollReveal)
- [ ] Loading states / Skeleton screens
- [ ] Performance check (Lighthouse)
- [ ] Fix bugs potentiels
- [ ] Documentation finale

---

## 📊 PROGRESS

**Temps passé** : ~6-7h
**Temps restant** : ~4-7h
**Completion** : **50%** des phases

---

## 🎯 PROCHAINES ACTIONS

### Option A : Activer la maquette maintenant
Remplacer les pages actuelles par les versions maquette :
```bash
mv app/(public)/page.js app/(public)/page-old.js
mv app/(public)/page-maquette.js app/(public)/page.js

mv app/(public)/boutique/page.js app/(public)/boutique/page-old.js
mv app/(public)/boutique/page-maquette.js app/(public)/boutique/page.js
```

### Option B : Continuer les phases 4-5-6
Terminer la migration complète avant activation.

### Option C : Approche hybride
- Activer homepage maquette
- Garder ancien design pour les autres pages
- Migrer progressivement

---

## 📦 COMPOSANTS CRÉÉS

### Layout & Navigation
- `HeaderMaquette.jsx` - Header minimaliste
- `NewsletterPopup.jsx` - Popup bienvenue
- `ScrollingBanner.jsx` - Bandeau défilant

### Homepage
- `MatchCardWithCountdown.jsx` - Carte match + countdown live
- `page-maquette.js` - Homepage splitté desktop/mobile

### Boutique
- `HeroCarousel.jsx` - Carousel avec thumbnails
- `AsymmetricSection.jsx` - Layout sidebar + grille
- `ProductCardMaquette.jsx` - Card produit style maquette
- `QuickAddModal.jsx` - Modal ajout rapide
- `page-maquette.js` - Boutique complète

**Total** : 10 nouveaux composants

---

## 🎨 STYLE RESPECTÉ

✅ Polices : Oswald + Inter
✅ Couleurs : Variables maquette client
✅ Layout : Splitté desktop, mobile responsive
✅ Animations : Smooth, professionnelles
✅ Composants : Modernes, sans aspect IA

---

## 🐛 ISSUES CONNUES

Aucune pour le moment.

---

## 📝 NOTES

1. **Images manquantes** : Certaines images de la maquette n'ont pas été téléchargées (vidéo hero est manquante, utiliser placeholder)
2. **Polices** : Oswald/Inter sont de bons remplaçants pour Gyst/Bicyclette
3. **Tests** : Les pages maquette ne sont pas encore activées (suffixe `-maquette.js`)
4. **Mobile** : Tests responsive faits en développement, à valider en production

---

*Document maintenu automatiquement durant la migration*
