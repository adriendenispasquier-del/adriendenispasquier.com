/**
 * CDN Image Optimization Utility
 * 
 * Automatically optimizes images via Cloudinary fetch CDN with:
 * - Automatic format selection (AVIF/WebP with transparency support)
 * - Automatic quality optimization
 * - Dynamic resizing based on display size
 * - Safe fallback for local/special URLs
 */

// Cloudinary cloud name - replace with your own or use a demo one
const CLOUDINARY_CLOUD_NAME = 'df2kod03a';
const CDN_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch`;

/**
 * Check if URL can be fetched by external CDN
 */
function canUseCDN(src: string | undefined): boolean {
  if (!src) return false;
  
  // Skip CDN for:
  // - Already CDN URLs (avoid double-wrapping)
  // - figma:asset URLs (virtual module scheme, not fetchable)
  // - Data URIs
  // - Relative paths
  if (
    src.includes('cloudinary.com') ||
    src.includes('imgix.net') ||
    src.startsWith('figma:') ||
    src.startsWith('data:') ||
    src.startsWith('/') ||
    src.startsWith('./')
  ) {
    return false;
  }
  
  // Only use CDN for full HTTP(S) URLs
  return src.startsWith('http://') || src.startsWith('https://');
}

/**
 * Generate CDN URL with transformations
 */
export function getCDNUrl(
  src: string | undefined,
  options: {
    width?: number;
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  } = {}
): string {
  // Return original if CDN not applicable
  if (!canUseCDN(src)) {
    return src || '';
  }
  
  const { width, quality = 'auto', format = 'auto' } = options;
  
  // Build transformation string
  const transforms: string[] = [
    `f_${format}`, // Format: auto selects best (AVIF/WebP with fallback)
    `q_${quality}`, // Quality: auto optimizes automatically
  ];
  
  if (width) {
    transforms.push(`w_${width}`);
  }
  
  // Encode the original URL
  const encodedSrc = encodeURIComponent(src!);
  
  // Build final CDN URL
  return `${CDN_BASE_URL}/${transforms.join(',')}/${encodedSrc}`;
}

/**
 * Generate srcSet for responsive images
 */
export function generateSrcSet(
  src: string | undefined,
  widths: number[] = [320, 640, 960, 1280, 1600]
): string {
  // Return empty if CDN not applicable
  if (!canUseCDN(src)) {
    return '';
  }
  
  return widths
    .map(width => `${getCDNUrl(src, { width })} ${width}w`)
    .join(', ');
}

/**
 * Props for CDN-optimized images
 */
export interface CDNImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  sizes?: string;
  eager?: boolean; // If true, use loading="eager"
}

/**
 * Check if a URL is a Cloudinary upload URL with a w_ width transform we can vary
 */
function isCloudinaryUploadUrl(src: string): boolean {
  return src.includes('res.cloudinary.com') && src.includes('/image/upload/') && /w_\d+/.test(src) && !src.endsWith('.gif');
}

function withCloudinaryWidth(src: string, width: number): string {
  return src.replace(/w_\d+/, `w_${width}`);
}

/**
 * Generate a native Cloudinary srcSet by swapping the width transform across breakpoints
 */
function generateCloudinarySrcSet(src: string, widths: number[] = [480, 800, 1200, 1600, 2400]): string {
  return widths.map((w) => `${withCloudinaryWidth(src, w)} ${w}w`).join(', ');
}

/**
 * Get optimized image props with CDN support
 */
export function getOptimizedImageProps(
  props: CDNImageProps
): React.ImgHTMLAttributes<HTMLImageElement> {
  const {
    src,
    sizes = '(max-width: 768px) 90vw, 40vw',
    eager = false,
    loading,
    decoding,
    ...rest
  } = props;

  const isCloudinaryUpload = !!src && isCloudinaryUploadUrl(src);
  const useFetchCDN = !isCloudinaryUpload && canUseCDN(src);

  let finalSrc = src;
  let srcSet: string | undefined;

  if (isCloudinaryUpload) {
    finalSrc = withCloudinaryWidth(src!, 1200);
    srcSet = generateCloudinarySrcSet(src!);
  } else if (useFetchCDN) {
    finalSrc = getCDNUrl(src);
    srcSet = generateSrcSet(src);
  }

  // Build optimized props
  const optimizedProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    ...rest,
    src: finalSrc,
    loading: eager ? 'eager' : (loading || 'lazy'),
    decoding: decoding || 'async',
  };

  if (srcSet) {
    optimizedProps.srcSet = srcSet;
    optimizedProps.sizes = sizes;
  }

  return optimizedProps;
}