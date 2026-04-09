# 🎯 Migration Cloudinary - Documentation

## ✅ Ce qui a été fait

Toutes les images du portfolio ont été migrées vers **Cloudinary CDN** pour une optimisation automatique :

### 📁 Fichiers modifiés :

1. **`/src/app/utils/cloudinary.ts`** (NOUVEAU)
   - Fonctions de transformation des titres → public IDs
   - Génération automatique des URLs Cloudinary optimisées
   - Configuration : Cloud `df2kod03a` | Dossier `Home`

2. **`/src/app/data/photography-data.ts`** (REFACTORISÉ)
   - ❌ Anciens imports `figma:asset`
   - ✅ Nouveaux URLs Cloudinary via `getCloudinaryUrlFromTitle()`
   - **68 photos** (48 Archipel Berlin + 20 Fat Cat)

3. **`/src/app/data/illustration-data.ts`** (REFACTORISÉ)
   - ❌ Anciens imports `figma:asset`
   - ✅ Nouveaux URLs Cloudinary via `getCloudinaryUrlForIllustration()`
   - **52 illustrations** (31 Archipel + 14 Cyberleaders + 7 Rocket Wine)

4. **`/src/app/data/projects-registry.ts`** (REFACTORISÉ)
   - ❌ Anciens imports `figma:asset` (240 lignes!)
   - ✅ Utilise maintenant les données depuis `photography-data.ts` et `illustration-data.ts`
   - **Source unique de vérité** : toutes les images proviennent des fichiers de données

---

## 🔍 Système de mapping

### Pour les **Photos** (avec titres) :

```
Titre → Public ID Cloudinary
"Cheese & Wine" → "Cheese_Wine"
"Burnt Match" → "Burnt_Match"
"Balzac & Croissants" → "Balzac_Croissants"
```

**Transformations appliquées :**
- Espaces → Underscores (`_`)
- Caractères `&` → Supprimés
- Parenthèses → Supprimées

### Pour les **Illustrations** (sans titres) :

```
Projet + Index → Public ID Cloudinary
Archipel #1 → "Archipel_1"
Cyberleaders #5 → "Cyberleaders_5"
Rocket Wine #3 → "Rocket_Wine_3"
```

---

## 🌐 Format des URLs générées

```
https://res.cloudinary.com/df2kod03a/image/upload/f_auto,q_auto/Home/{PUBLIC_ID}
```

**Optimisations automatiques :**
- `f_auto` : Format optimal (WebP, AVIF si supporté)
- `q_auto` : Qualité adaptative selon la connexion

---

## ⚠️ Important : Vérification nécessaire

D'après votre capture d'écran, j'ai vu que certaines images sur Cloudinary ont des **suffixes aléatoires** :

```
❌ Cloudinary : "Burnt_Match_y1fmso"
✅ Code actuel : "Burnt_Match"
```

### 🔧 Solutions possibles :

#### **Option 1** : Renommer les images sur Cloudinary (RECOMMANDÉ)
Dans votre Media Library Cloudinary, renommez les public IDs pour enlever les suffixes :
- `Burnt_Match_y1fmso` → `Burnt_Match`
- `Kiwi_Eye_usue4f` → `Kiwi_Eye`
- etc.

#### **Option 2** : Créer un fichier de mapping manuel
Si vous préférez garder les suffixes, créez un fichier :
```typescript
// /src/app/utils/cloudinary-ids.ts
export const publicIds = {
  "Burnt Match": "Burnt_Match_y1fmso",
  "Kiwi Eye": "Kiwi_Eye_usue4f",
  // ... etc
};
```

#### **Option 3** : Upload en masse avec les bons noms
Re-uploadez toutes les images avec exactement les noms des titres (sans suffixes).

---

## 🧪 Comment tester ?

### 🎯 Page de test visuelle (NOUVEAU!)

J'ai créé une page de test qui affiche les URLs générées avec aperçu visuel :

**👉 Accédez à : `/test-cloudinary`**

Cette page vous permet de :
- ✅ Voir les URLs générées automatiquement
- ✅ Vérifier visuellement si les images se chargent
- ✅ Identifier rapidement les problèmes de mapping (404 errors)

### Test rapide dans la console du navigateur :

```javascript
// Ouvrez n'importe quelle page du portfolio
// Ouvrez la console (F12)
// Testez une URL :

fetch("https://res.cloudinary.com/df2kod03a/image/upload/f_auto,q_auto/Home/Burnt_Match")
  .then(r => r.ok ? "✅ Image trouvée !" : "❌ 404 - Image non trouvée")
  .then(console.log);
```

### URLs d'exemple à tester :

**Photography :**
- `https://res.cloudinary.com/df2kod03a/image/upload/f_auto,q_auto/Home/Cheese_Wine`
- `https://res.cloudinary.com/df2kod03a/image/upload/f_auto,q_auto/Home/Burnt_Match`
- `https://res.cloudinary.com/df2kod03a/image/upload/f_auto,q_auto/Home/Kiwi_Eye`

**Illustrations :**
- `https://res.cloudinary.com/df2kod03a/image/upload/f_auto,q_auto/Home/Archipel_1`
- `https://res.cloudinary.com/df2kod03a/image/upload/f_auto,q_auto/Home/Cyberleaders_1`
- `https://res.cloudinary.com/df2kod03a/image/upload/f_auto,q_auto/Home/Rocket_Wine_1`

---

## 📊 Avantages de cette migration

✅ **Performance** : Images optimisées automatiquement (WebP/AVIF)
✅ **Bande passante** : Compression intelligente selon l'appareil
✅ **Cache** : CDN mondial Cloudinary
✅ **Responsive** : Format adapté au device
✅ **Maintenance** : Plus besoin de figma:asset

---

## 🚨 Prochaines étapes

1. **Testez les URLs** générées (liste ci-dessus)
2. **Si 404** : Vérifiez les public IDs sur Cloudinary
3. **Ajustez** selon l'Option 1, 2 ou 3
4. **Validez** que toutes les galeries s'affichent correctement

---

**Besoin d'aide ?** Partagez-moi le résultat des tests et je pourrai ajuster ! 🚀