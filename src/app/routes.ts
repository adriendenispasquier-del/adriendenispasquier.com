import { createHashRouter } from "react-router";
import { lazy } from "react";
import Root from "./pages/Root";
import Home from "./pages/Home";

// Lazy load heavier pages
const Photography = lazy(() => import("./pages/Photography"));
const PhotographyFolder = lazy(() => import("./pages/PhotographyFolder"));
const Illustration = lazy(() => import("./pages/Illustration"));
const IllustrationFolder = lazy(() => import("./pages/IllustrationFolder"));
const BrandIdentity = lazy(() => import("./pages/BrandIdentity"));
const BrandIdentityFolder = lazy(() => import("./pages/BrandIdentityFolder"));
const About = lazy(() => import("./pages/About"));
const Impressum = lazy(() => import("./pages/Impressum"));
const AGBs = lazy(() => import("./pages/AGBs"));
const DownloadAssets = lazy(() => import("./pages/DownloadAssets"));

export const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "photography", Component: Photography },
      { path: "photography/:slug", Component: PhotographyFolder },
      { path: "illustration", Component: Illustration },
      { path: "illustration/:slug", Component: IllustrationFolder },
      { path: "brand-design", Component: BrandIdentity },
      { path: "brand-design/:slug", Component: BrandIdentityFolder },
      { path: "about", Component: About },
      { path: "impressum", Component: Impressum },
      { path: "agb", Component: AGBs },
      { path: "agbs", Component: AGBs },
      { path: "download-assets", Component: DownloadAssets },
    ],
  },
]);