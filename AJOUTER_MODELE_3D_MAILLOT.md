# 👕 Comment ajouter le modèle 3D du maillot Pau FC

## Problème actuel

Le configurateur 3D existe déjà dans `app/(public)/boutique/[slug]/personnaliser/page.js` avec :
- ✅ Three.js installé (`@react-three/fiber` + `@react-three/drei`)
- ✅ Formulaire de personnalisation (nom, numéro, police, taille)
- ✅ Fallback 2D si WebGL indisponible
- ✅ Sauvegarde en base de données
- ❌ Mais utilise des **primitives géométriques** au lieu d'un vrai modèle GLTF

**Il manque** : Le fichier 3D du maillot au format `.glb` ou `.gltf`

---

## 🎯 Objectif

Obtenir un modèle 3D du maillot Pau FC au format **GLB** (optimisé pour le web) et l'intégrer dans le configurateur pour un rendu comme le FC Barcelone.

---

## Option A : Contacter l'équipementier officiel (recommandé)

**Équipementier Pau FC** : **Joma** (vérifier sur le site officiel)

### Étapes

1. **Identifier le contact** :
   - Email support Joma France : `france@joma-sport.com`
   - Ou contact commercial via https://www.joma-sport.com/fr/

2. **Email type à envoyer** :

```
Objet : Demande modèle 3D maillot Pau FC 2025-2026

Bonjour,

Nous développons le site e-commerce officiel du Pau FC et souhaitons intégrer un configurateur 3D pour la personnalisation des maillots (nom + numéro), similaire à celui du FC Barcelone.

Auriez-vous un modèle 3D du maillot Pau FC saison 2025-2026 au format GLTF/GLB que vous pourriez nous fournir ?

Nous avons besoin :
- Maillot domicile (jaune/bleu)
- Résolution optimisée web (< 2 MB)
- Licence d'utilisation pour le site officiel du club

Merci d'avance,
[Votre nom]
FC Pau - Développement Web
```

3. **Attendre la réponse** (délai : 1-2 semaines)

**Avantages** :
- ✅ Modèle officiel exact
- ✅ Qualité professionnelle
- ✅ Licence d'utilisation claire

**Inconvénients** :
- ❌ Peut prendre du temps
- ❌ Pas garanti qu'ils aient le modèle

---

## Option B : Sites de modèles 3D gratuits/payants

### 1. TurboSquid (marketplace 3D)

**Site** : https://www.turbosquid.com/

**Recherche** : `soccer jersey`, `football shirt 3D model`

**Prix** : 
- Gratuit : modèles génériques basiques
- Payant : 20-100€ pour modèles haute qualité

**Étapes** :
1. Créer un compte gratuit
2. Rechercher "soccer jersey" ou "football shirt"
3. Filtrer par format : **GLB** ou **GLTF**
4. Télécharger un modèle générique
5. Customiser les textures dans Blender (voir Option C)

**Exemples de modèles** :
- "Soccer Jersey GLB" (~20-50€)
- "Football Shirt Low Poly" (gratuit, mais moins détaillé)

---

### 2. Sketchfab (plateforme 3D communautaire)

**Site** : https://sketchfab.com/

**Recherche** : `football jersey`, `soccer shirt`

**Licence** : Vérifier les droits (CC BY, CC BY-SA) avant téléchargement

**Étapes** :
1. Rechercher "football jersey" sur Sketchfab
2. Filtrer par **"Downloadable"**
3. Vérifier la licence (CC BY ou CC0 pour usage commercial)
4. Télécharger au format **GLTF** ou **GLB**
5. Customiser dans Blender si nécessaire

**Exemple** :
- https://sketchfab.com/3d-models/soccer-jersey-...

---

### 3. CGTrader (marketplace 3D)

**Site** : https://www.cgtrader.com/

**Recherche** : `soccer jersey 3D model`

**Prix** : 15-80€

**Étapes** :
1. Rechercher "soccer jersey"
2. Filtrer par format : **glTF**
3. Acheter et télécharger
4. Customiser les couleurs/textures

---

## Option C : Modéliser avec Blender (si tu as du temps)

**Logiciel** : **Blender** (gratuit, open-source)

**Site** : https://www.blender.org/download/

### Tutoriel rapide (niveau intermédiaire)

1. **Installer Blender** (version 4.x)

2. **Créer la forme du maillot** :
   - Ajouter un cube (`Shift + A` → Mesh → Cube)
   - Modifier avec `Tab` (Edit Mode)
   - Extruder (`E`) pour créer le corps, les manches
   - Subdiviser (`Ctrl + 2`) pour lisser

3. **Texturer aux couleurs Pau FC** :
   - Matériau jaune (`#FFCC00`)
   - Matériau bleu nuit (`#04091D`)
   - Appliquer avec UV mapping

4. **Exporter en GLB** :
   - `File` → `Export` → `glTF 2.0 (.glb)`
   - Options :
     - Format : **glTF Binary (.glb)**
     - Include : Selected Objects
     - Transform : +Y Up
   - Sauvegarder dans `public/models/maillot-pau-fc.glb`

**Durée estimée** : 4-8h pour un débutant, 1-2h pour un expert

**Tutoriels YouTube recommandés** :
- "Blender 3D Soccer Jersey Tutorial" (chercher sur YouTube)
- "Export Blender to Three.js GLTF"

---

## 📦 Intégration dans le code

Une fois le fichier `.glb` obtenu :

### 1. Placer le fichier

```
fcpau/
└── public/
    └── models/
        └── maillot-pau-fc.glb  ← Placer ici
```

### 2. Modifier `components/customizer/JerseyScene.jsx`

Remplacer les primitives géométriques par le modèle GLTF :

```javascript
import { useGLTF } from '@react-three/drei';

function JerseyModel({ customization }) {
  const { scene } = useGLTF('/models/maillot-pau-fc.glb');
  
  return (
    <primitive 
      object={scene.clone()} 
      scale={2}
      position={[0, 0, 0]}
    />
  );
}

// Preload pour performance
useGLTF.preload('/models/maillot-pau-fc.glb');
```

### 3. Tester localement

```bash
npm run dev
```

Aller sur : http://localhost:3000/boutique/maillot-domicile-2526/personnaliser

Le modèle 3D devrait s'afficher et tourner.

---

## 📊 Spécifications techniques recommandées

| Propriété | Valeur |
|-----------|--------|
| Format | **GLB** (glTF 2.0 Binary) |
| Poids | < 2 MB (optimisé web) |
| Résolution textures | 1024x1024 ou 2048x2048 max |
| Polycount | 5 000 - 20 000 triangles |
| Animations | Pas nécessaires |
| Textures | Embedded dans le GLB |

**Outils de compression** :
- https://gltf.report/ (analyser le modèle)
- https://glb.studio/ (compresser en ligne)
- Blender : Export avec "Apply Modifiers" + "Compression"

---

## 🚀 Optimisation pour performances web

Une fois le modèle intégré :

1. **Réduire la qualité des textures** si > 2 MB
2. **Activer le draco compression** :
   ```javascript
   import { useGLTF } from '@react-three/drei';
   useGLTF('/models/maillot-pau-fc.glb', true); // draco=true
   ```

3. **Lazy loading** :
   ```javascript
   <Suspense fallback={<Loader />}>
     <JerseyModel />
   </Suspense>
   ```

4. **Désactiver les ombres** si performances faibles :
   ```javascript
   <Canvas shadows={false}>
   ```

---

## ✅ Résultat final

Avec le modèle 3D intégré, le configurateur affichera :

```
┌─────────────────────────────────────────┐
│                                          │
│   [MODÈLE 3D MAILLOT TOURNANT]          │
│                                          │
│   Nom : BERNARD        Numéro : 10      │
│   Police : [Classic] [Modern] [Retro]   │
│   Taille : [S] [M] [L] [XL]             │
│                                          │
│   Prix : 69.90€ + 15.00€ (flocage)      │
│                                          │
│   [AJOUTER AU PANIER - 84.90€]          │
│                                          │
└─────────────────────────────────────────┘
```

---

## 📌 Plan d'action recommandé

**Court terme** (cette semaine) :
1. ✅ Contacter Joma par email
2. ⏳ Chercher sur TurboSquid / Sketchfab en parallèle

**Moyen terme** (si pas de réponse Joma après 1 semaine) :
3. Acheter un modèle générique sur TurboSquid (~30€)
4. Customiser les couleurs dans Blender

**Long terme** (si budget/temps disponible) :
5. Faire modéliser par un freelance 3D (Fiverr, Malt) : 100-300€

---

**Besoin d'aide ?** Ping-moi une fois le modèle obtenu, je l'intègre dans le code ! 👕
