# 🏆 Comment ajouter les logos officiels des clubs de Ligue 2

## Liste des 16 clubs avec slugs exacts

| Club | Slug fichier | Fichier à créer |
|------|-------------|-----------------|
| Pau FC | `pau-fc` | `/public/logos/pau-fc.svg` |
| Paris FC | `paris-fc` | `/public/logos/paris-fc.svg` |
| EA Guingamp | `guingamp` | `/public/logos/guingamp.svg` |
| AC Ajaccio | `ajaccio` | `/public/logos/ajaccio.svg` |
| SC Bastia | `bastia` | `/public/logos/bastia.svg` |
| SM Caen | `caen` | `/public/logos/caen.svg` |
| Grenoble Foot 38 | `grenoble` | `/public/logos/grenoble.svg` |
| Stade Lavallois | `laval` | `/public/logos/laval.svg` |
| FC Annecy | `annecy` | `/public/logos/annecy.svg` |
| Amiens SC | `amiens` | `/public/logos/amiens.svg` |
| Rodez AF | `rodez` | `/public/logos/rodez.svg` |
| ESTAC Troyes | `troyes` | `/public/logos/troyes.svg` |
| USL Dunkerque | `dunkerque` | `/public/logos/dunkerque.svg` |
| FC Martigues | `martigues` | `/public/logos/martigues.svg` |
| FC Lorient | `lorient` | `/public/logos/lorient.svg` |
| Red Star FC | `red-star` | `/public/logos/red-star.svg` |

---

## 📥 Méthode 1 : football-logos.cc (recommandé)

**Avantages** : SVG vectoriel, haute qualité, tous les clubs français

**Site** : https://football-logos.cc/france/ligue-2/

### Étapes

1. Aller sur https://football-logos.cc/france/ligue-2/
2. Pour chaque club :
   - Cliquer sur le logo du club
   - Choisir **SVG** (format vectoriel)
   - Taille : **512x512** ou **1024x1024**
   - Télécharger
3. Renommer le fichier selon le slug (ex: `pau-fc.svg`)
4. Placer dans `C:\Users\Bernardi\Projets\fcpau\public\logos\`

---

## 📥 Méthode 2 : Wikimedia Commons (libre de droits)

**Avantages** : Licence CC BY-SA 4.0, légal pour usage commercial

**Site** : https://commons.wikimedia.org/wiki/Category:SVG_association_football_logos_of_France

### Étapes

1. Rechercher `[Nom du club] logo` sur Wikimedia Commons
2. Exemple : https://commons.wikimedia.org/wiki/File:Paris_FC_logo.svg
3. Cliquer sur **"Download"** → **"Original file"**
4. Renommer selon le slug
5. Placer dans `/public/logos/`

**Clubs disponibles sur Wikimedia** :
- ✅ Paris FC : `File:Paris_FC_logo.svg`
- ✅ EA Guingamp : `File:En_Avant_Guingamp_logo.svg`
- ✅ AC Ajaccio : `File:AC_Ajaccio_logo.svg`
- ✅ SM Caen : `File:SM_Caen_logo.svg`
- ✅ Grenoble Foot 38 : `File:Grenoble_Foot_38_logo.svg`
- ✅ Amiens SC : `File:Amiens_SC_logo.svg`
- ✅ FC Lorient : `File:FC_Lorient_logo.svg`
- ✅ Red Star FC : `File:Red_Star_FC_logo.svg`

---

## 📥 Méthode 3 : Brandfetch (assets officiels)

**Avantages** : Assets de marque officiels, plusieurs formats

**Site** : https://brandfetch.com/

### Étapes

1. Rechercher `[Nom du club]` sur Brandfetch
2. Exemple : https://brandfetch.com/eaguingamp.fr
3. Télécharger le logo au format **SVG** ou **PNG transparent**
4. Renommer et placer dans `/public/logos/`

---

## 🔧 Vérifier que ça fonctionne

Une fois les logos téléchargés :

1. Vérifier que tous les fichiers sont dans `/public/logos/`
2. Vérifier les noms de fichiers (minuscules, tirets, pas d'espaces)
3. Tester sur la page d'accueil : les logos doivent apparaître dans le composant `MatchCountdown`

Le composant `TeamLogo.jsx` cherche automatiquement les logos :
```javascript
const logoPath = slug ? `/logos/${slug}.svg` : null;
```

Si un logo est manquant, il affiche automatiquement les 3 premières lettres du nom du club.

---

## 📊 Format recommandé

| Propriété | Valeur |
|-----------|--------|
| Format | SVG (priorité) ou PNG transparent |
| Taille | 512x512px minimum |
| Ratio | 1:1 (carré) |
| Poids | < 50 KB par fichier |
| Licence | Libre de droits ou usage autorisé |

---

## 🎯 Raccourci : Script PowerShell (optionnel)

Si tous les logos sont téléchargés dans un dossier temporaire, ce script peut les renommer automatiquement :

```powershell
# Renommer logos selon slugs
$mapping = @{
    'Paris_FC_logo.svg' = 'paris-fc.svg'
    'En_Avant_Guingamp_logo.svg' = 'guingamp.svg'
    'AC_Ajaccio_logo.svg' = 'ajaccio.svg'
    # ... ajouter tous les clubs
}

foreach ($old in $mapping.Keys) {
    $new = $mapping[$old]
    if (Test-Path $old) {
        Move-Item $old "C:\Users\Bernardi\Projets\fcpau\public\logos\$new"
        Write-Host "✓ $new"
    }
}
```

---

## ✅ Résultat final

Une fois tous les logos ajoutés, la page d'accueil affichera les vrais logos des équipes dans les matchs :

```
┌─────────────────────────────────────┐
│                                      │
│   [LOGO PAU FC]  VS  [LOGO PARIS FC]│
│                                      │
│     SAMEDI 10 MAI · NOUSTE CAMP     │
│     Compte à rebours : 14J 5H 32M   │
│                                      │
│         [RÉSERVER VOS PLACES]       │
│                                      │
└─────────────────────────────────────┘
```

---

**Besoin d'aide ?** Ping-moi une fois les logos téléchargés si tu veux que je vérifie qu'ils sont bien intégrés ! 🏆
