/// <reference types="vite/client" />
declare module "virtual:colours" {
  /** Dominant colour of each picture, by its media value ("v123/name.jpg", "video:…", "/uploads/…"). */
  const colours: Record<string, string>;
  export default colours;
  /** Proportions of each picture ("1600 / 1200"), known at build time. */
  export const RATIOS: Record<string, string>;
}
