// Dominant colour of every picture, worked out at build time, so a picture's box can show its colour while the
// picture loads. Small versions are read from Cloudinary (or the site's own uploads) and cached between builds.
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { prepare, type Project } from "../src/pages";
import { norm } from "../src/media";

const CLOUD = "https://res.cloudinary.com/df2kod03a/";
const json = (f: string) => JSON.parse(readFileSync(f, "utf8"));

/** The colour covering most of the picture (transparent parts ignored), and its proportions ("w / h"). */
async function dominant(buf: Buffer): Promise<{ c: string; r?: string } | null> {
  const meta = await sharp(buf, { pages: 1 }).metadata();
  const w = meta.autoOrient?.width ?? meta.width, h = meta.autoOrient?.height ?? meta.height;
  const { data, info } = await sharp(buf, { pages: 1 }).resize(24, 24, { fit: "fill" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const bins = new Map<number, [number, number, number, number]>();
  for (let i = 0; i < info.width * info.height * 4; i += 4) {
    if (data[i + 3] < 128) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2], k = (r >> 4) << 8 | (g >> 4) << 4 | (b >> 4);
    const s = bins.get(k) || [0, 0, 0, 0]; s[0]++; s[1] += r; s[2] += g; s[3] += b; bins.set(k, s);
  }
  let best: [number, number, number, number] | null = null;
  for (const s of bins.values()) if (!best || s[0] > best[0]) best = s;
  if (!best) return null;
  const c = "#" + [best[1], best[2], best[3]].map(v => Math.round(v / best![0]).toString(16).padStart(2, "0")).join("");
  return { c, ...(w && h ? { r: `${w} / ${h}` } : {}) };
}

async function read(m: string, root: string): Promise<Buffer | null> {
  if (m.startsWith("/")) { const f = resolve(root, "public", "." + decodeURI(m)); return existsSync(f) ? readFileSync(f) : null; }
  const url = m.startsWith("video:") ? `${CLOUD}video/upload/so_1,w_64/${m.slice(6).replace(/\.\w+$/, ".jpg")}`
    : /^https?:/.test(m) ? m : `${CLOUD}image/upload/c_limit,w_64,f_png,pg_1/${m}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  return res.ok ? Buffer.from(await res.arrayBuffer()) : null;
}

/** Each picture's dominant colour and proportions (known before it loads, so the strip never shifts while you scroll). */
export async function dominantColours(root: string): Promise<{ colours: Record<string, string>; ratios: Record<string, string> }> {
  const dir = resolve(root, "content/projects");
  const projects: Project[] = prepare(readdirSync(dir).filter(f => f.endsWith(".json")).map(f => [f.replace(/\.json$/, ""), json(resolve(dir, f))]));
  const portrait = json(resolve(root, "content/site.json")).about?.portrait;
  const media = [...new Set([...projects.flatMap(p => [p.cover, ...p.media]), portrait ? norm(portrait) : null].filter(Boolean) as string[])];
  const cacheFile = resolve(root, "node_modules/.cache/adp-media.json");
  const cache: Record<string, { c: string; r?: string }> = existsSync(cacheFile) ? json(cacheFile) : {};
  const todo = media.filter(m => !(m in cache));
  for (let i = 0; i < todo.length; i += 8) {
    await Promise.all(todo.slice(i, i + 8).map(async m => {
      try { const buf = await read(m, root); const c = buf && await dominant(buf); if (c) cache[m] = c; } catch { /* leave grey */ }
    }));
  }
  mkdirSync(resolve(root, "node_modules/.cache"), { recursive: true });
  writeFileSync(cacheFile, JSON.stringify(cache));
  const known = media.filter(m => cache[m]);
  return { colours: Object.fromEntries(known.map(m => [m, cache[m].c])), ratios: Object.fromEntries(known.filter(m => cache[m].r).map(m => [m, cache[m].r!])) };
}
