# Guide pour créer votre image Open Graph

## Qu'est-ce qu'une image Open Graph ?

C'est l'image qui apparaît quand vous partagez votre site sur :
- Facebook
- LinkedIn
- Twitter/X
- WhatsApp
- Discord
- Slack

## Spécifications requises

- **Dimensions** : 1200 x 630 pixels (ratio 1.91:1)
- **Format** : JPG ou PNG
- **Poids** : Maximum 8 MB (idéalement < 1 MB)
- **Nom du fichier** : `og-image.jpg` ou `og-image.png`

## Contenu suggéré pour votre image

### Option 1 - Minimaliste (recommandé)
```
┌─────────────────────────────────────────────┐
│                                             │
│                                             │
│         ADRIEN DENIS-PASQUIER               │
│                                             │
│    Photography • Illustration • Design      │
│                                             │
│                  Berlin                     │
│                                             │
└─────────────────────────────────────────────┘
```

**Style** :
- Fond : `#f7f5f0` (votre couleur de fond)
- Texte : Noir `#000000`
- Police : Sans-serif, bold pour le nom
- Espacement généreux (minimaliste)

### Option 2 - Avec une de vos meilleures photos
```
┌─────────────────────────────────────────────┐
│                                             │
│  [Votre meilleure photo en fond]           │
│                                             │
│  Overlay semi-transparent                   │
│                                             │
│  ADRIEN DENIS-PASQUIER                      │
│  Creative Portfolio                         │
│                                             │
└─────────────────────────────────────────────┘
```

### Option 3 - Grid de vos travaux
Montrer 3-4 images de vos meilleurs projets en grille

## Comment créer l'image

### Méthode 1 : Figma (recommandé pour vous)
1. Créez un frame de 1200x630px
2. Ajoutez votre design
3. Exportez en JPG (qualité 90%) ou PNG

### Méthode 2 : Canva
1. Créez un design personnalisé 1200x630px
2. Utilisez le template "Facebook Post" puis ajustez
3. Téléchargez en JPG

### Méthode 3 : Photoshop
1. Nouveau document 1200x630px, 72 DPI
2. Design minimaliste avec typographie
3. Sauvegardez pour le web (JPG qualité 90%)

## Où placer le fichier

**Placez votre fichier dans** : `/public/og-image.jpg`

Le système SEO est déjà configuré pour utiliser ce fichier :
```
https://adriendenispasquier.figma.site/og-image.jpg
```

## Tester votre image Open Graph

Après avoir ajouté l'image, testez-la avec :

1. **Facebook Debugger** : https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator** : https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector** : https://www.linkedin.com/post-inspector/

Collez votre URL et vérifiez que l'image s'affiche correctement.

## Recommandations

✅ **À FAIRE** :
- Garder le texte grand et lisible
- Utiliser des contrastes élevés
- Tester sur mobile (l'aperçu sera plus petit)
- Garder les éléments importants au centre (les bords peuvent être coupés)

❌ **À ÉVITER** :
- Texte trop petit (< 60px)
- Trop d'informations
- Couleurs peu contrastées
- Éléments importants trop près des bords

## Zone de sécurité

Gardez tous les éléments importants dans cette zone :
- Marges : 100px de chaque côté
- Zone de contenu : 1000 x 430px au centre

## Exemple de texte pour l'image

**Texte principal** : ADRIEN DENIS-PASQUIER
**Sous-titre** : Photography • Illustration • Design
**Lieu** : Berlin

OU

**Texte principal** : ADRIEN DENIS-PASQUIER
**Sous-titre** : Multidisciplinary Creative
**CTA** : View Portfolio

---

**Note** : Une fois l'image créée et placée dans `/public/og-image.jpg`, elle sera automatiquement utilisée pour tous les partages de votre site !