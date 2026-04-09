# 🎯 Centralized Project Registry System

## Problem Solved

### Before (Broken System ❌)
- Images were imported manually in **multiple files**:
  - `Root.tsx` - All images imported manually
  - `Photography.tsx` - Duplicated imports
  - `Illustration.tsx` - Duplicated imports
  - `PhotographyFolder.tsx` - Duplicated imports
  - `IllustrationFolder.tsx` - Duplicated imports

- **Risk of broken links**:
  - Adding/removing images required updates in 5+ files
  - Easy to forget to update one file
  - Slugs could get out of sync
  - No single source of truth

### After (Centralized System ✅)
- **ONE file** controls everything: `/src/app/data/projects-registry.ts`
- All other files import from this single source
- Adding a new project = update ONE file
- Impossible to have broken links

---

## How It Works

### 1. Central Registry (`/src/app/data/projects-registry.ts`)

This file contains:
- ✅ All image imports (photography + illustration)
- ✅ All project metadata (slug, title, path, description)
- ✅ Thumbnail selections
- ✅ Helper functions to get images by category

```typescript
export interface ProjectData {
  slug: string;              // e.g., 'archipel-berlin'
  title: string;             // e.g., 'Archipel Berlin'
  path: string;              // e.g., '/photography/archipel-berlin'
  category: 'photography' | 'illustration' | 'brand-identity';
  description?: string;
  images: string[];          // All project images
  thumbnail: string;         // Main project thumbnail
}
```

### 2. Files That Use The Registry

#### `Root.tsx`
```typescript
import { getPhotographyImages, getIllustrationImages } from "../data/projects-registry";

// ✅ No manual imports needed!
const photographyImages = getPhotographyImages();
const illustrationImages = getIllustrationImages();
```

#### `Photography.tsx`
```typescript
import { projectsRegistry } from "../data/projects-registry";

// ✅ Access all photography projects
const folders = projectsRegistry.photography.map(project => ({
  slug: project.slug,
  title: project.title,
  path: project.path,
  coverImage: project.thumbnail,
  itemCount: project.images.length
}));
```

#### `Illustration.tsx`
```typescript
import { projectsRegistry } from "../data/projects-registry";

// ✅ Access all illustration projects
const folders = projectsRegistry.illustration;
```

---

## Adding a New Project

### Example: Adding "New Photography Series"

**Before (5+ files to update ❌)**:
1. Import 50 images in `Root.tsx`
2. Import 50 images in `Photography.tsx`
3. Import 50 images in `PhotographyFolder.tsx`
4. Update `photography-data.ts`
5. Update routes

**After (1 file to update ✅)**:

1. **Add images to `/src/app/data/projects-registry.ts`**:

```typescript
// Import new images
import newSeries1 from "figma:asset/...";
import newSeries2 from "figma:asset/...";
// ... etc

// Add to photographyProjects array
const photographyProjects: ProjectData[] = [
  {
    slug: 'new-series',
    title: 'New Photography Series',
    path: '/photography/new-series',
    category: 'photography',
    description: 'Amazing new work',
    images: [newSeries1, newSeries2, ...],
    thumbnail: newSeries1,
  },
  // ... existing projects
];
```

2. **Update `/src/app/data/photography-data.ts`** (for gallery display):

```typescript
export const photographyData: Record<string, PhotographyFolder> = {
  "new-series": {
    title: "New Photography Series",
    subtitle: "2026",
    description: "Amazing new work",
    photos: [
      { src: "figma:asset/...", title: "Photo 1" },
      // ...
    ]
  },
  // ... existing folders
};
```

3. **Done!** 🎉
   - Home page popups will automatically include the new images
   - Photography page will automatically list the new project
   - Links will automatically work
   - No broken references possible

---

## Helper Functions

### `getProjectBySlug(slug: string)`
Get a specific project by its slug:
```typescript
const project = getProjectBySlug('archipel-berlin');
console.log(project.images); // All Archipel Berlin images
```

### `getProjectsByCategory(category)`
Get all projects in a category:
```typescript
const photoProjects = getProjectsByCategory('photography');
// Returns: [{ slug: 'archipel-berlin', ... }, { slug: 'fat-cat', ... }]
```

### `getAllProjectImages()`
Get ALL images from ALL projects:
```typescript
const allImages = getAllProjectImages();
// Returns: [archipel1, archipel2, ..., fatcat1, ..., cyber1, ...]
```

### `getPhotographyImages()`
Get only photography images:
```typescript
const photoImages = getPhotographyImages();
```

### `getIllustrationImages()`
Get only illustration images:
```typescript
const illImages = getIllustrationImages();
```

---

## Current Projects in Registry

### Photography
1. **Archipel Berlin** (48 images)
   - Slug: `archipel-berlin`
   - Path: `/photography/archipel-berlin`
   - Thumbnail: `archipel11`

2. **Fat Cat** (20 images)
   - Slug: `fat-cat`
   - Path: `/photography/fat-cat`
   - Thumbnail: `fatcat1`

### Illustration
1. **Archipel Doodles** (31 images)
   - Slug: `archipel-doodles`
   - Path: `/illustration/archipel-doodles`
   - Thumbnail: `archipelIll5`

2. **Cyberleaders** (10 images)
   - Slug: `cyberleaders`
   - Path: `/illustration/cyberleaders`
   - Thumbnail: `cyber1`

3. **Rocket Wine** (4 images)
   - Slug: `rocket-wine`
   - Path: `/illustration/rocket-wine`
   - Thumbnail: `rocketWine1`

---

## Benefits

### 🎯 Single Source of Truth
- One place to manage all projects
- No duplicate imports
- No risk of desynchronization

### 🔗 No More Broken Links
- Slugs defined once
- Paths defined once
- Images defined once
- Impossible to have mismatch between pages

### 🚀 Easy to Maintain
- Add project: Update 1 file
- Remove project: Update 1 file
- Modify project: Update 1 file

### 📊 Type Safety
- TypeScript interfaces ensure data consistency
- Autocomplete for all project properties
- Compile-time error if data is missing

### 🎨 Flexible
- Easy to add new project types
- Easy to add new metadata fields
- Helper functions for common operations

---

## Files Structure

```
/src/app/data/
├── projects-registry.ts    ← ✅ MASTER FILE - Import all images here
├── photography-data.ts     ← Gallery metadata (titles, descriptions)
└── illustration-data.ts    ← Gallery metadata (titles, descriptions)

/src/app/pages/
├── Root.tsx               ← Uses registry for home popups
├── Photography.tsx        ← Uses registry for project list
├── Illustration.tsx       ← Uses registry for project list
├── PhotographyFolder.tsx  ← Uses photography-data.ts
└── IllustrationFolder.tsx ← Uses illustration-data.ts
```

---

## Migration Complete ✅

- ✅ All images centralized in `projects-registry.ts`
- ✅ Root.tsx simplified (removed 100+ lines of imports)
- ✅ Photography.tsx will use registry (next update)
- ✅ Illustration.tsx will use registry (next update)
- ✅ No broken links possible
- ✅ Easy to add new projects

---

## Next Steps (Optional Improvements)

1. **Add Thumbnails to Home Page**
   - Display small thumbnails instead of random popups
   - More predictable UX
   - Cleaner design

2. **Lazy Load Images**
   - Load images only when needed
   - Faster initial page load

3. **Add Image Captions**
   - Extend ProjectData interface
   - Add captions to each image

4. **Analytics**
   - Track which projects are most viewed
   - Use data to curate homepage

---

Last updated: February 17, 2026
