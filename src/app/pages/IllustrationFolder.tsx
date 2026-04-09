import { useParams } from "react-router";
import { motion } from "motion/react";
import { illustrationData } from "../data/illustration-data";
import { GalleryLayout } from "../components/GalleryLayout";
import { SEO } from "../components/SEO";
import { RandomIllustrationCard } from "../components/RandomIllustrationCard";
import { useMemo, useState, useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";

type LayoutPos = { left: number; top: number; size: number; aspectRatio: number };

type ScatterItem =
  | {
      kind: "image";
      idx: number; // original illustration index
      src: string;
      title?: string;
      aspectRatio: number;
      widthVw: number;
      heightVw: number;
    }
  | {
      kind: "text";
      id: string;
      text: string;
      widthVw: number;
      heightVw: number;
    };

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const randBetween = (min: number, max: number) => min + Math.random() * (max - min);

function splitIntoSentences(text: string) {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function estimateTextHeightVw(text: string, widthVw: number, isMobile: boolean) {
  // Improved height estimation with larger safety margin for mobile
  const charsPerLine = isMobile ? Math.max(15, Math.floor(widthVw * 0.45)) : Math.max(28, Math.floor(widthVw * 1.1));
  const lines = Math.max(2, Math.ceil(text.length / charsPerLine));
  const lineH = isMobile ? 6.5 : 2.9; // increased from 5.2 to 6.5 for mobile
  const padding = isMobile ? 10 : 4.5; // increased from 7 to 10 for mobile
  return lines * lineH + padding;
}

export default function IllustrationFolder() {
  const { slug } = useParams();
  
  // Track when all images are loaded
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Generate random project link (different from current)

  // Legacy folder type for non-illustration folder data
  interface LegacyFolder {
    title: string;
    description: string;
    projects: Array<{ image: string; title: string; category: string }>;
  }

  // ❌ REMOVED: Legacy Rocket Wine with figma:asset
  // Now ALL projects use illustrationData with Cloudinary URLs
  const legacyFolderData: Record<string, LegacyFolder> = {};

  // ✅ Try to load from illustrationData first, then fall back to legacy
  const illustrationFolder = slug ? (illustrationData as any)?.[slug] ?? null : null;
  const legacyFolder = slug && !illustrationFolder ? legacyFolderData[slug] ?? null : null;

  const archipelFolder = slug === "archipel" ? illustrationFolder : null;

  // ✅ Freeze viewport width once to prevent "big → resizes after a few seconds"
  const [frozenWidth, setFrozenWidth] = useState<number | null>(null);
  useEffect(() => {
    setFrozenWidth(window.innerWidth);
  }, []);
  
  // Preload all images when component mounts
  useEffect(() => {
    if (archipelFolder && archipelFolder.displayType === "random") {
      const imageUrls = archipelFolder.illustrations.map((ill: any) => ill.src);
      imageUrls.forEach((url: string) => {
        const img = new Image();
        img.src = url;
      });
    }
  }, [archipelFolder]);

  // Scroll progress tracking - MUST be at top level
  useEffect(() => {
    // Only track scroll for grid and legacy layouts (not random archipel layout)
    if ((illustrationFolder && illustrationFolder.displayType === "grid") || legacyFolder) {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0; // 0 to 1, not 0 to 100!
        setScrollProgress(progress);
      };

      window.addEventListener('scroll', handleScroll);
      // Initial calculation
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [illustrationFolder, legacyFolder]);

  const description =
    `Archipel branding became inseparable from the "doodles", as they created a visual hook for the visitor, both on Instagram and online. ` +
    `They were meant to be playful and conveying a certain naivety present in all of us, therefore calling for a sense of cosiness.`;

  // (Optional) slightly cleaner rephrasing (you can swap it in)
  const descriptionRephrased =
    `Archipel's branding became inseparable from the "doodles," which created an immediate visual hook — on Instagram and on the website. ` +
    `Playful and gently naïve, they echo something soft in all of us, inviting a sense of comfort and closeness. ` +
    `Some were used as a "mini-portrait" for work email signatures.` +
    `What began as polished and carefully rendered forms gradually evolved into something more distilled. The illustrations became lighter, faster, and more instinctive — prioritising energy and expression over refinement.` ;

  const sentences = splitIntoSentences(descriptionRephrased); // using rephrased version

  const {
    imagePositions, // LayoutPos[] for images only, indexed by illustration index
    containerHeightVw,
  } = useMemo(() => {
    if (!archipelFolder || archipelFolder.displayType !== "random" || !frozenWidth) {
      return {
        imagePositions: [] as LayoutPos[],
        containerHeightVw: 0,
      };
    }

    const w = frozenWidth;
    const isMobile = w < 768;

    // ✅ Desktop sizes per your request
    // ✅ Mobile: bigger so it's not tiny
    const IMAGE_SIZE = isMobile ? { min: 38, max: 78 } : { min: 20, max: 38 };

    const EDGE = isMobile ? 4 : 3;      // vw
    const PAD = isMobile ? 4.5 : 3;     // vw (increased spacing between boxes)
    const TAIL = isMobile ? 24 : 24;    // vw

    // Try to keep content dense (bias Y toward top)
    const attemptsPerItem = 90;

    const illustrations = archipelFolder.illustrations as Array<{
      src: string;
      title: string;
      width: number;
      height: number;
    }>;

    // Build items: images only (no text stickers)
    const items: ScatterItem[] = [];

    illustrations.forEach((ill, idx) => {
      const ar = ill.width / ill.height;

      // More contrast (small/med/large)
      const r = Math.random();
      let size = randBetween(IMAGE_SIZE.min, IMAGE_SIZE.max);
      if (r < 0.25) size = randBetween(IMAGE_SIZE.min, IMAGE_SIZE.min + (IMAGE_SIZE.max - IMAGE_SIZE.min) * 0.25);
      else if (r > 0.78) size = randBetween(IMAGE_SIZE.max - (IMAGE_SIZE.max - IMAGE_SIZE.min) * 0.22, IMAGE_SIZE.max);

      const widthVw = size;
      const heightVw = size / ar;

      items.push({
        kind: "image",
        idx,
        src: ill.src,
        title: ill.title,
        aspectRatio: ar,
        widthVw,
        heightVw,
      });
    });

    // Placement state
    type Box = { left: number; top: number; w: number; h: number; item: ScatterItem };
    const placed: Box[] = [];

    const maxX = 100 - EDGE;

    // start height budget (grows if needed)
    let yBudget = isMobile ? 240 : 170;

    const overlaps = (a: { left: number; top: number; w: number; h: number }, b: { left: number; top: number; w: number; h: number }) => {
      return !(
        a.left + a.w + PAD <= b.left ||
        b.left + b.w + PAD <= a.left ||
        a.top + a.h + PAD <= b.top ||
        b.top + b.h + PAD <= a.top
      );
    };

    const tryPlace = (item: ScatterItem): { left: number; top: number } | null => {
      const w = item.widthVw;
      const h = item.heightVw;

      const xMin = EDGE;
      const xMax = maxX - w;

      if (xMax <= xMin) return { left: EDGE, top: 0 };

      for (let attempt = 0; attempt < attemptsPerItem; attempt++) {
        // strong bias toward top, but still allows deep placements
        const yBias = Math.random() ** 1.9;
        const top = yBias * yBudget;

        const left = randBetween(xMin, xMax);

        const box = { left, top, w, h };
        if (!placed.some((p) => overlaps(box, p))) {
          return { left, top };
        }
      }

      return null;
    };

    // Place all items
    for (const item of items) {
      const spot = tryPlace(item);

      if (spot) {
        placed.push({ left: spot.left, top: spot.top, w: item.widthVw, h: item.heightVw, item });
      } else {
        // fallback: place at bottom and expand budget
        const left = randBetween(EDGE, Math.max(EDGE, maxX - item.widthVw));
        const top = yBudget + PAD;
        placed.push({ left, top, w: item.widthVw, h: item.heightVw, item });
        yBudget += item.heightVw + PAD;
      }
    }

    // ✅ Final quick anti-overlap “safety” pass (cheap, fixes rare overlaps)
    placed.sort((a, b) => a.top - b.top);
    for (let i = 0; i < placed.length; i++) {
      for (let j = 0; j < i; j++) {
        if (overlaps(placed[i], placed[j])) {
          placed[i].top = placed[j].top + placed[j].h + PAD;
        }
      }
    }

    // Output maps
    const imagePositions: LayoutPos[] = new Array(illustrations.length);

    let maxBottom = 0;
    for (const p of placed) {
      maxBottom = Math.max(maxBottom, p.top + p.h);

      if (p.item.kind === "image") {
        imagePositions[p.item.idx] = {
          left: p.left,
          top: p.top,
          size: p.item.widthVw,
          aspectRatio: p.item.aspectRatio,
        };
      }
    }

    // ✅ Safety check: ensure ALL images have positions (shouldn't be needed, but just in case)
    imagePositions.forEach((pos, idx) => {
      if (!pos) {
        console.warn(`Image ${idx} missing position, adding fallback`);
        imagePositions[idx] = {
          left: EDGE + Math.random() * 20,
          top: maxBottom + PAD,
          size: IMAGE_SIZE.min,
          aspectRatio: illustrations[idx].width / illustrations[idx].height,
        };
        maxBottom += (IMAGE_SIZE.min / (illustrations[idx].width / illustrations[idx].height)) + PAD;
      }
    });

    const minHeight = isMobile ? 220 : 140;

    return {
      imagePositions,
      containerHeightVw: Math.max(minHeight, maxBottom + TAIL),
    };
  }, [archipelFolder, frozenWidth, slug]);

  if (!archipelFolder && !legacyFolder && !illustrationFolder) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl mb-4">Folder not found</h1>
        <Link to="/illustration" className="text-gray-600 hover:text-black">
          Back to Illustration
        </Link>
      </div>
    );
  }

  // ✅ Grid layout for non-random illustration folders (e.g., Cyberleaders)
  if (illustrationFolder && illustrationFolder.displayType === "grid") {
    // Check if this is the cyberleaders project
    const isCyberleaders = slug === "cyberleaders";
    // Rocket Wine should have white background (isDark = false)
    const isRocketWine = slug === "rocket-wine";

    return (
      <>
        <SEO
          title={`${illustrationFolder.title} - Adrien Denis-Pasquier | Illustration`}
          description={illustrationFolder.description}
          keywords={['illustration', illustrationFolder.title, 'digital art', 'conceptual illustration', 'Berlin illustrator']}
        />
        <GalleryLayout
          backLink="/illustration"
          backLabel="Back to Illustration"
          title={illustrationFolder.title}
          subtitle={illustrationFolder.subtitle}
          description={illustrationFolder.description}
          isDark={isCyberleaders}
        >
          <div className="flex flex-col gap-[2dvw]">
            {illustrationFolder.illustrations.map((illustration: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="w-full"
              >
                <ImageWithFallback
                  src={illustration.src}
                  alt={`${illustrationFolder.title} Illustration by Adrien Denis-Pasquier`}
                  className="w-full h-auto select-none"
                  sizes="100vw"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  draggable={false}
                />
              </motion.div>
            ))}
          </div>
        </GalleryLayout>
      </>
    );
  }

  if (archipelFolder && archipelFolder.displayType === "random") {
    return (
      <>
        <SEO
          title={`${archipelFolder.title} - Adrien Denis-Pasquier | Illustration Doodles`}
          description={archipelFolder.description}
          keywords={['archipel doodles', 'playful illustration', 'brand illustration', 'Berlin illustrator', 'editorial doodles']}
        />
        <GalleryLayout
          backLink="/illustration"
          backLabel="Back to Illustration"
          title={archipelFolder.title}
          subtitle={archipelFolder.subtitle}
          description={archipelFolder.description}
          isDark={false}
        >
          <div className="flex flex-col gap-[2dvw]">
            {archipelFolder.illustrations.map((illustration: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="w-full"
              >
                <ImageWithFallback
                  src={illustration.src}
                  alt={`${archipelFolder.title} Illustration by Adrien Denis-Pasquier`}
                  className="w-full h-auto select-none"
                  sizes="100vw"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  draggable={false}
                />
              </motion.div>
            ))}
          </div>
        </GalleryLayout>
      </>
    );
  }

  if (legacyFolder) {
    return (
      <>
        <SEO
          title={`${legacyFolder.title} - Adrien Denis-Pasquier | Illustration & Poster Design`}
          description={legacyFolder.description}
          keywords={['wine poster design', 'event poster', 'natural wine illustration', 'Berlin poster design', 'Rocket Wine']}
        />
        <GalleryLayout
          backLink="/illustration"
          backLabel="Back to Illustration"
          title={legacyFolder.title}
          description={legacyFolder.description}
          isDark={false}
        >
          <div className="flex flex-col gap-[1dvw] lg:gap-[2dvh]">
            {legacyFolder.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="w-full"
              >
                <ImageWithFallback
                  src={project.image}
                  alt={`${project.title} ${project.category} by Adrien Denis-Pasquier`}
                  className="w-full h-auto select-none"
                  sizes="100vw"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  draggable={false}
                />
              </motion.div>
            ))}
          </div>
        </GalleryLayout>
      </>
    );
  }

  return null;
}