// Pictures uploaded through the admin (public/uploads) are served resized, like the Cloudinary ones:
// /uploads/_w/<width>/<file>.webp. At build time every size is written next to the originals; while developing,
// the dev server makes them on request. GIFs and videos are left as they are.
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

export const WIDTHS = [300, 1600, 2400];
const RESIZABLE = /\.(jpe?g|png|webp)$/i;

/** Resized copy of a file in public/uploads, cached in node_modules/.cache (by size and date of the original). */
export async function resized(root: string, name: string, width: number): Promise<Buffer | null> {
  const src = resolve(root, "public/uploads", name);
  if (!RESIZABLE.test(name) || !existsSync(src)) return null;
  const st = statSync(src), cache = resolve(root, "node_modules/.cache/adp-sizes", String(width), `${st.size}-${Math.round(st.mtimeMs)}-${name}.webp`);
  if (existsSync(cache)) return readFileSync(cache);
  const out = await sharp(readFileSync(src), { animated: true })
    .resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
  mkdirSync(dirname(cache), { recursive: true }); writeFileSync(cache, out);
  return out;
}

/** Every size of every picture that's used, written into dist. */
export async function writeSizes(root: string, names: string[]) {
  for (const name of new Set(names)) for (const w of WIDTHS) {
    const buf = await resized(root, name, w); if (!buf) continue;
    const out = resolve(root, "dist/uploads/_w", String(w), name + ".webp");
    mkdirSync(dirname(out), { recursive: true }); writeFileSync(out, buf);
  }
}
