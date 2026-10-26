// Content for the browser: reads content/projects/*.json and content/site.json.
import site from "../content/site.json";
import { prepare, makePages, type Project, type Site } from "./pages";

const files = import.meta.glob<Omit<Project, "slug">>("/content/projects/*.json", { eager: true, import: "default" });

export const PROJECTS = prepare(Object.entries(files).map(([path, p]) => [path.split("/").pop()!.replace(/\.json$/, ""), p]));
export const SITE = site as Site;
export const { buildPage, filtered, listHTML, itemsOf, FILTERS } = makePages(PROJECTS, SITE);
export { legacyPath, canonical, LIST_COPIES, type Page, type Item } from "./pages";
export { big, huge, thumb, fallback, isVideo } from "./media";
