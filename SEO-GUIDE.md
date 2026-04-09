# SEO Optimization Guide - Portfolio Adrien Denis-Pasquier

## ✅ Implémentations SEO déjà en place

### 1. **Composant SEO dynamique** (`/src/app/components/SEO.tsx`)
- Gestion dynamique des meta tags pour chaque page
- Open Graph tags pour les réseaux sociaux
- Twitter Card tags
- Données structurées Schema.org (JSON-LD)
- URLs canoniques
- Meta robots, keywords, description

### 2. **Sitemap XML** (`/public/sitemap.xml`)
- Liste complète de toutes les pages
- Fréquence de mise à jour définie
- Priorités établies par importance

### 3. **Robots.txt** (`/public/robots.txt`)
- Autorisation de crawl pour tous les robots
- Référence au sitemap

### 4. **Balises SEO par page**
- **Home** : Titre optimisé avec mots-clés principaux
- **About** : Type "profile" pour Schema.org
- **Photography** : Descriptions de projets spécifiques
- **Illustration** : Mots-clés ciblés par discipline

---

## 🔧 Actions à effectuer avant la mise en ligne

### 1. ✅ URLs du domaine MISES À JOUR
Les URLs ont été mises à jour avec votre domaine actuel :
- ✅ `/src/app/components/SEO.tsx`
- ✅ `/public/sitemap.xml`
- ✅ `/public/robots.txt`

**Votre domaine** : `https://adriendenispasquier.com

### 2. **Créer une image Open Graph**
- Créez une image `og-image.jpg` (1200x630px recommandé)
- Placez-la dans `/public/`
- Mettez à jour la référence dans `/src/app/components/SEO.tsx` ligne 16 :
  ```typescript
  image = 'https://adriendenispasquier.com/og-image.jpg',
  ```

### 3. **Ajouter des alt texts aux images**
Actuellement, beaucoup d'images ont `alt=""`. Pour le SEO, ajoutez des descriptions :
```tsx
// ❌ Mauvais
<img src={image} alt="" />

// ✅ Bon
<img src={image} alt="Product photography for Archipel Berlin - artisanal bread" />
```

### 4. **Google Search Console**
Après le déploiement :
1. Créez un compte sur [Google Search Console](https://search.google.com/search-console)
2. Ajoutez votre propriété (domaine)
3. Soumettez votre sitemap : `https://adriendenispasquier.figma.site/sitemap.xml`
4. Vérifiez l'indexation après 48-72h

### 5. **Structured Data Testing**
Testez vos données structurées avec :
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

---

## 📊 Recommandations additionnelles

### Performance SEO
1. **Lazy loading des images** ✅ Déjà en place (`loading="eager"` sur les previews)
2. **Compression d'images** - Utilisez WebP quand possible
3. **Vitesse de chargement** - Testez avec [PageSpeed Insights](https://pagespeed.web.dev/)

### Contenu SEO
1. **Titles uniques** ✅ Implémenté pour chaque page
2. **Meta descriptions** ✅ Implémentées et descriptives
3. **Headers hiérarchisés** - Vérifiez que vous utilisez h1, h2, h3 correctement
4. **Internal linking** ✅ Navigation en place

### Réseaux sociaux
1. **Open Graph** ✅ Implémenté
2. **Twitter Cards** ✅ Implémenté
3. **Handle Twitter** - Changez `@mr_w_cat` si nécessaire dans SEO.tsx

### Accessibilité (impact SEO)
1. **Alt text sur images** ⚠️ À améliorer
2. **Labels sur formulaires** - Si vous ajoutez des formulaires
3. **Contraste des couleurs** ✅ Bon
4. **Navigation au clavier** ✅ Fonctionnel

---

## 🎯 Mots-clés principaux à cibler

Votre portfolio cible actuellement ces mots-clés :
- `photographer Berlin`
- `illustrator Berlin`
- `graphic designer Berlin`
- `creative portfolio`
- `visual identity designer`
- `art direction`
- `product photography`
- `editorial illustration`
- `set design`

### Suggestions de contenu pour améliorer le SEO :
1. **Blog/Articles** - Ajoutez une section blog pour publier :
   - "Behind the scenes" de vos projets
   - Process créatif
   - Études de cas détaillées
   
2. **Texte descriptif** - Ajoutez plus de texte sur chaque projet (actuellement minimal)

3. **Témoignages clients** - Section avec avis de clients (crédibilité)

---

## 📈 Checklist avant lancement

- [ ] Remplacer toutes les URLs `your-domain.com`
- [ ] Créer et ajouter l'image Open Graph
- [ ] Ajouter des alt texts descriptifs aux images principales
- [ ] Tester tous les meta tags avec [Meta Tags](https://metatags.io/)
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Tester la vitesse avec PageSpeed Insights
- [ ] Vérifier les données structurées Schema.org
- [ ] Tester le partage sur Facebook/Twitter/LinkedIn
- [ ] Configurer Google Analytics (optionnel mais recommandé)
- [ ] Créer un fichier `manifest.json` pour PWA (optionnel)

---

## 🔗 Ressources utiles

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

**Note importante** : Le SEO est un processus continu. Les premiers résultats apparaissent généralement après 2-3 mois. Mettez à jour régulièrement votre contenu et suivez vos analytics.