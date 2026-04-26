# 🎬 Comment ajouter la vidéo dans le hero

## Problème

YouTube bloque l'autoplay dans les iframes embedded pour des raisons de politique.  
La meilleure solution est d'**héberger la vidéo directement**.

---

## ✅ Solution recommandée : Vidéo MP4 hébergée

### Étape 1 : Télécharger la vidéo YouTube

**Lien vidéo** : https://www.youtube.com/watch?v=0zS2GEkFwOc

**Méthode A - Site web** :
1. Aller sur https://yt1s.com/ ou https://y2mate.com/
2. Coller le lien : `https://www.youtube.com/watch?v=0zS2GEkFwOc`
3. Choisir qualité : **720p MP4** (bon compromis poids/qualité)
4. Télécharger le fichier `.mp4`

**Méthode B - yt-dlp (ligne de commande)** :
```bash
# Installer yt-dlp
pip install yt-dlp

# Télécharger en 720p
yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" \
  -o "hero.mp4" \
  https://www.youtube.com/watch?v=0zS2GEkFwOc
```

---

### Étape 2 : Optimiser la vidéo (optionnel mais recommandé)

**Réduire le poids avec FFmpeg** :
```bash
# Installer FFmpeg : https://ffmpeg.org/download.html

# Compresser pour le web (cible ~5-10MB)
ffmpeg -i hero-original.mp4 \
  -vcodec libx264 \
  -crf 28 \
  -preset medium \
  -vf "scale=1280:-2" \
  -acodec aac \
  -b:a 128k \
  hero.mp4
```

**Résultat** : Vidéo optimisée pour le web, chargement rapide.

---

### Étape 3 : Placer la vidéo dans le projet

```
fcpau/
└── public/
    └── videos/
        └── hero.mp4  ← Placer ici
```

**Commandes** :
```bash
mkdir -p public/videos
mv hero.mp4 public/videos/
```

---

### Étape 4 : Décommenter le code dans AnimatedHero.jsx

**Fichier** : `components/animations/AnimatedHero.jsx`

**Ligne ~17-26** : Décommenter ce bloc :

```javascript
{/* OPTION 1: Vidéo MP4 hébergée (recommandé) */}
<video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 h-full w-full object-cover"
>
  <source src="/videos/hero.mp4" type="video/mp4" />
</video>
```

**Et commenter** : le bloc "OPTION 2: Dégradé animé" (ligne ~29-48)

---

### Étape 5 : Tester localement

```bash
npm run dev
```

Ouvrir http://localhost:3000 → La vidéo devrait jouer automatiquement en fond.

---

### Étape 6 : Déployer sur Vercel

```bash
git add public/videos/hero.mp4
git add components/animations/AnimatedHero.jsx
git commit -m "feat: ajouter vidéo hero background"
git push origin main
```

Vercel déploie automatiquement. **Durée** : ~3-5 min.

---

## 📊 Taille fichier recommandée

| Qualité | Résolution | Poids | Recommandation |
|---------|-----------|-------|----------------|
| 480p | 854×480 | ~3-5 MB | Mobile uniquement |
| 720p | 1280×720 | ~5-10 MB | ✅ **Recommandé** |
| 1080p | 1920×1080 | ~15-30 MB | Desktop haute qualité |

**Conseil** : Utiliser 720p (bon compromis). Si > 10 MB, compresser avec FFmpeg.

---

## 🔄 Alternative : Héberger sur Cloudinary/Bunny

Si la vidéo est trop lourde pour GitHub/Vercel :

**Cloudinary** (gratuit jusqu'à 25 GB) :
1. Créer compte : https://cloudinary.com/
2. Upload la vidéo
3. Copier l'URL : `https://res.cloudinary.com/[ton-cloud]/video/upload/hero.mp4`
4. Utiliser dans `<video src="https://res.cloudinary.com/..." />`

**Bunny CDN** (payant mais rapide) :
- CDN ultra-rapide
- ~0.01$/GB
- Parfait pour vidéos

---

## ✅ Résultat final

```
┌─────────────────────────────────────┐
│                                      │
│   [VIDÉO EN BOUCLE AUTOMATIQUE]     │
│                                      │
│     PAU FOOTBALL CLUB                │
│     Soutenez les Sang et Or          │
│                                      │
│         [BOUTON VOS PLACES]          │
│                                      │
└─────────────────────────────────────┘
```

- ✅ Autoplay automatique
- ✅ Loop infini
- ✅ Mute (requis pour autoplay)
- ✅ Responsive (object-cover)
- ✅ Overlay gradient pour texte lisible

---

**Besoin d'aide ?** Ping-moi une fois la vidéo téléchargée, je finalise l'intégration ! 🎬
