/**
 * Cloudinary CDN Configuration
 * Cloud name: df2kod03a
 * Folder: Home
 */

import { getPublicId } from "../../data/cloudinary-mapping";

const CLOUDINARY_CLOUD_NAME = "df2kod03a";
const CLOUDINARY_FOLDER = "Home";

/**
 * Transforms a photo/illustration title into a Cloudinary public ID
 * Example: "Cheese & Wine" → "Cheese_Wine"
 * 
 * @deprecated Use cloudinary-mapping.ts instead for precise public_id matching
 */
export function titleToPublicId(title: string): string {
  return title
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[&]/g, "") // Remove ampersands
    .replace(/[()]/g, "") // Remove parentheses
    .replace(/__+/g, "_") // Replace multiple underscores with single
    .replace(/^_|_$/g, ""); // Remove leading/trailing underscores
}

/**
 * Generates an optimized Cloudinary URL for an image
 * Mobile-optimized: smaller size for faster loading
 * NO format conversion - preserve original format (including GIFs)
 */
export function getCloudinaryUrl(publicId: string): string {
  // GIFs require special handling - NO transformations at all
  // Safari on iPad needs the raw GIF without any transformations
  // Must include folder path for proper resolution
  if (publicId.endsWith('.gif')) {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
  }
  
  // For other formats: mobile optimization with transformations
  // Reduce size to 1200px width max for 3-4x faster loading
  // Auto quality for best compression without visible loss
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_limit,w_3000,q_auto/${publicId}`;
}

/**
 * Generates a Cloudinary URL from a photo/illustration title
 * Uses the precise cloudinary-mapping.ts for real public IDs
 */
export function getCloudinaryUrlFromTitle(title: string): string {
  const publicId = getPublicId(title);
  return getCloudinaryUrl(publicId);
}

/**
 * Generates a Cloudinary URL for numbered illustrations
 * Example: getCloudinaryUrlForIllustration("Archipel", 1) → uses mapping for "Image 1"
 */
export function getCloudinaryUrlForIllustration(project: string, index: number): string {
  // Pour les illustrations, on utilise le format "Image X" dans le mapping
  const title = `Image ${index}`;
  const publicId = getPublicId(title);
  return getCloudinaryUrl(publicId);
}