/**
 * CENTRAL PROJECTS REGISTRY
 * Single source of truth for all portfolio projects
 * This ensures links, images, and data stay synchronized across the entire app
 * 
 * ✨ Now uses Cloudinary CDN for all images via data files
 */

import { photographyData } from './photography-data';
import { illustrationData } from './illustration-data';
import { brandIdentityData } from './brand-identity-data';

export interface ProjectData {
  slug: string;
  title: string;
  name: string; // Display name for the project
  path: string;
  category: 'photography' | 'illustration' | 'brand-design';
  description?: string;
  images: string[];
  thumbnail: string; // Main thumbnail for the project
}

// Placeholder image URL (used temporarily while waiting for complete asset list)
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23f3f4f6' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23999'%3E⚠️ En attente des assets Cloudinary%3C/text%3E%3C/svg%3E";

// Photography Projects
const photographyProjects: ProjectData[] = [
  {
    slug: 'archipel-berlin',
    title: 'Archipel Berlin',
    name: 'Archipel Berlin',
    path: '/photography/archipel-berlin',
    category: 'photography',
    description: photographyData['archipel-berlin'].description,
    images: photographyData['archipel-berlin'].photos.length > 0 
      ? photographyData['archipel-berlin'].photos.map(photo => photo.src)
      : [PLACEHOLDER_IMAGE],
    thumbnail: photographyData['archipel-berlin'].photos[0]?.src || PLACEHOLDER_IMAGE,
  },
  {
    slug: 'fat-cat',
    title: 'Fat Cat',
    name: 'Fat Cat',
    path: '/photography/fat-cat',
    category: 'photography',
    description: photographyData['fat-cat'].description,
    images: photographyData['fat-cat'].photos.length > 0
      ? photographyData['fat-cat'].photos.map(photo => photo.src)
      : [PLACEHOLDER_IMAGE],
    thumbnail: photographyData['fat-cat'].photos[0]?.src || PLACEHOLDER_IMAGE,
  },
];

// Illustration Projects
const illustrationProjects: ProjectData[] = [
  {
    slug: 'archipel',
    title: 'Archipel',
    name: 'Archipel',
    path: '/illustration/archipel',
    category: 'illustration',
    description: illustrationData.archipel.description,
    images: illustrationData.archipel.illustrations.length > 0
      ? illustrationData.archipel.illustrations.map(ill => ill.src)
      : [PLACEHOLDER_IMAGE],
    thumbnail: illustrationData.archipel.illustrations[0]?.src || PLACEHOLDER_IMAGE,
  },
  {
    slug: 'cyberleaders',
    title: 'Cyberleaders',
    name: 'Cyberleaders',
    path: '/illustration/cyberleaders',
    category: 'illustration',
    description: illustrationData.cyberleaders.description,
    images: illustrationData.cyberleaders.illustrations.length > 0
      ? illustrationData.cyberleaders.illustrations.map(ill => ill.src)
      : [PLACEHOLDER_IMAGE],
    thumbnail: illustrationData.cyberleaders.illustrations[0]?.src || PLACEHOLDER_IMAGE,
  },
  {
    slug: 'rocket-wine',
    title: 'Rocket Wine',
    name: 'Rocket Wine',
    path: '/illustration/rocket-wine',
    category: 'illustration',
    description: illustrationData['rocket-wine'].description,
    images: illustrationData['rocket-wine'].illustrations.length > 0
      ? illustrationData['rocket-wine'].illustrations.map(ill => ill.src)
      : [PLACEHOLDER_IMAGE],
    thumbnail: illustrationData['rocket-wine'].illustrations[0]?.src || PLACEHOLDER_IMAGE,
  },
];

// Brand Identity Projects
const brandIdentityProjects: ProjectData[] = [
  {
    slug: 'archipel',
    title: 'Archipel Berlin',
    name: 'Archipel Berlin',
    path: '/brand-design/archipel',
    category: 'brand-design',
    description: brandIdentityData['archipel'].description,
    images: brandIdentityData['archipel'].images.map(img => img.src),
    thumbnail: brandIdentityData['archipel'].images[0]?.src || PLACEHOLDER_IMAGE,
  },
];

// All Projects Registry
export const allProjects: ProjectData[] = [
  ...photographyProjects,
  ...illustrationProjects,
  ...brandIdentityProjects,
];

// Helper functions
export const getProjectBySlug = (slug: string): ProjectData | undefined => {
  return allProjects.find(project => project.slug === slug);
};

export const getProjectsByCategory = (category: 'photography' | 'illustration' | 'brand-design'): ProjectData[] => {
  return allProjects.filter(project => project.category === category);
};

export const getAllProjectImages = (): string[] => {
  return allProjects.flatMap(project => project.images);
};

export const getPhotographyImages = (): string[] => {
  return photographyProjects.flatMap(project => project.images);
};

export const getIllustrationImages = (): string[] => {
  return illustrationProjects.flatMap(project => project.images);
};

export const getBrandIdentityImages = (): string[] => {
  return brandIdentityProjects.flatMap(project => project.images);
};

// Export organized by category for easy access
export const projectsRegistry = {
  photography: photographyProjects,
  illustration: illustrationProjects,
  brandIdentity: brandIdentityProjects,
  all: allProjects,
};