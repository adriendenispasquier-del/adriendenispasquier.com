# CDN Image Optimization Setup

This portfolio uses automatic CDN-based image optimization via Cloudinary's fetch API to deliver images in modern formats (AVIF/WebP) with automatic resizing and quality optimization.

## How It Works

All images throughout the app are automatically optimized through the `ImageWithFallback` component, which:

1. **Detects if CDN can be used** - Skips CDN for `figma:asset`, data URIs, and relative paths
2. **Generates responsive srcset** - Creates multiple image sizes (320w, 640w, 960w, 1280w, 1600w)
3. **Uses modern formats** - Automatically serves AVIF/WebP with transparency support
4. **Provides fallbacks** - Falls back to original URL if CDN fails

## Configuration

### Update Cloudinary Cloud Name

Open `/src/app/utils/cdn-image.ts` and replace the demo cloud name:

```typescript
const CLOUDINARY_CLOUD_NAME = 'demo'; // Replace with your cloud name
```

### Get Your Cloudinary Cloud Name

1. Sign up for free at https://cloudinary.com
2. Your cloud name is in the dashboard URL: `https://console.cloudinary.com/console/c-{YOUR_CLOUD_NAME}`
3. Copy your cloud name and paste it in the config above

## Features

### Automatic Format Selection
- Serves AVIF to supported browsers (Chrome, Edge)
- Falls back to WebP for older browsers
- Preserves transparency for PNG images

### Responsive Images
- Generates 5 sizes automatically based on viewport
- Configured via `sizes` prop (defaults to `(max-width: 768px) 90vw, 40vw`)
- Browser downloads only the size it needs

### Lazy Loading
- Images below the fold load lazily by default
- Use `eager` prop for above-the-fold images

### Safe Fallbacks
- `figma:asset` URLs bypass CDN (not fetchable externally)
- If CDN fails, falls back to original URL
- Never breaks existing functionality

## Alternative CDN Providers

### Imgix
Replace the CDN base URL in `/src/app/utils/cdn-image.ts`:

```typescript
const CDN_BASE_URL = `https://YOUR_SUBDOMAIN.imgix.net`;

// Update getCDNUrl to use Imgix parameters:
// fm=auto, q=auto, w=WIDTH
```

### Cloudflare Images
```typescript
const CDN_BASE_URL = `https://YOUR_ACCOUNT_HASH.cloudflareimages.com`;
// Use /cdn-cgi/image/ with format=auto,quality=auto,width=WIDTH
```

## Testing

1. Open DevTools Network tab
2. Filter by "Img"
3. Check image URLs contain cloudinary.com (or your CDN)
4. Verify `Content-Type` shows `image/avif` or `image/webp`
5. Check different sizes are downloaded based on viewport

## Disable CDN

To disable CDN optimization, set `canUseCDN` to always return false in `/src/app/utils/cdn-image.ts`:

```typescript
function canUseCDN(src: string | undefined): boolean {
  return false; // Disable CDN completely
}
```
