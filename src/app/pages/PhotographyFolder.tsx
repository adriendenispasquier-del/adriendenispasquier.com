import { useParams } from "react-router";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { photographyData } from "../data/photography-data";
import { GalleryLayout } from "../components/GalleryLayout";
import { SEO } from "../components/SEO";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";
import type { Photo, PhotographyFolder as PhotographyFolderType } from "../data/photography-data";

const darkSlugs = ["archipel-berlin", "fat-cat"];
const portraitOnlySlugs = ["fat-cat"];

// Parse markdown-style links: [text](url) → <a>
function renderDescription(text: string) {
  return text.split(/\n\n+/).map((para, i) => (
    <p key={i} className="mb-[1em] last:mb-0">
      {para.split(/(\[[^\]]+\]\([^)]+\))/).map((chunk, j) => {
        const m = chunk.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (m) {
          return (
            <a key={j} href={m[2]} target="_blank" rel="noopener noreferrer"
              className="underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity">
              {m[1]}
            </a>
          );
        }
        return chunk;
      })}
    </p>
  ));
}

function renderCredits(credits: PhotographyFolderType["credits"]) {
  if (!credits) return null;
  return (
    <div className="flex flex-col gap-3">
      {credits.featuring && (
        <div>
          <span className="opacity-50 mr-2">Featuring</span>
          <span>{credits.featuring}</span>
        </div>
      )}
      {credits.products && (
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {Array.isArray(credits.products)
            ? credits.products.map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                  className="underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity">
                  {p.name}
                </a>
              ))
            : <span>{credits.products}</span>
          }
        </div>
      )}
    </div>
  );
}

export default function PhotographyFolder() {
  const { slug } = useParams();
  const currentFolder = slug ? photographyData[slug] : null;
  const isDarkFolder = darkSlugs.includes(slug ?? "");
  const isPortraitOnly = portraitOnlySlugs.includes(slug ?? "");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPhotoCount, setShowPhotoCount] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [shuffledPhotos, setShuffledPhotos] = useState<Photo[]>([]);
  const [imageHeight, setImageHeight] = useState<string>("100%");
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const updateImageSize = useCallback(() => {
    const img = imageRef.current;
    const container = galleryRef.current;
    if (!img || !container || !img.naturalWidth) return;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const maxHeightFromWidth = (containerWidth * 1.6) / aspectRatio;
    const maxHeightFromHeight = containerHeight / 0.7;
    const computedHeight = Math.min(maxHeightFromWidth, maxHeightFromHeight);
    setImageHeight(`${Math.round(computedHeight)}px`);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(updateImageSize);
    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, [updateImageSize]);

  useEffect(() => {
    setImageHeight("100%");
  }, [currentIndex]);

  useEffect(() => {
    if (isDarkFolder && currentFolder) {
      const shuffled = [...currentFolder.photos].sort(() => Math.random() - 0.5);
      setShuffledPhotos(shuffled);
    }
  }, [slug]);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Close info drawer when navigating away
  useEffect(() => {
    setIsInfoOpen(false);
  }, [slug]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const photosToDisplay = useMemo(() => {
    if (!currentFolder) return [];
    if (isDarkFolder) return shuffleArray(currentFolder.photos);
    return currentFolder.photos;
  }, [slug, currentFolder?.photos]);

  if (!currentFolder) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-xl text-gray-600">Folder not found</p>
        <Link to="/photography" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Photography
        </Link>
      </div>
    );
  }

  // ─── DARK FOLDERS ────────────────────────────────────────────────────────────
  if (isDarkFolder) {
    const photo = shuffledPhotos[currentIndex];

    return (
      <>
        <SEO
          title={currentFolder.title}
          description={currentFolder.description}
          image={shuffledPhotos[0]?.src}
        />

        {/* Desktop cursor counter */}
        {!isTouchDevice && showPhotoCount && (
          <div
            className="fixed text-[14px] font-normal tracking-tight pointer-events-none select-none"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
              transform: "translate(-50%, -50%)",
              zIndex: 99999,
              color: "#f0ede6",
            }}
          >
            {currentIndex + 1}/{shuffledPhotos.length}
          </div>
        )}

        {/* Main gallery */}
        <div
          className="h-[100dvh] overflow-hidden flex flex-col px-[3%] md:px-[2%]"
          style={{
            backgroundColor: "#1c1c1c",
            color: "#f0ede6",
            paddingTop: "calc(var(--header-height))",
            paddingBottom: "calc(var(--header-height))",
          }}
        >
          <div
            ref={galleryRef}
            className="flex-1 min-h-0 relative"
            data-gallery-image
            style={{ cursor: isTouchDevice ? "default" : "none" }}
            onClick={() => {
              if (!shuffledPhotos.length) return;
              setCurrentIndex((currentIndex + 1) % shuffledPhotos.length);
            }}
            onMouseEnter={() => setShowPhotoCount(true)}
            onMouseLeave={() => setShowPhotoCount(false)}
            onMouseMove={(e) => setCursorPosition({ x: e.clientX, y: e.clientY })}
          >
            <div className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center gap-2">
              {photo && (
                <img
                  ref={imageRef}
                  src={photo.src}
                  alt={`${currentFolder.title} by Adrien Denis-Pasquier`}
                  draggable={false}
                  onLoad={updateImageSize}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    height: isPortraitOnly ? "auto" : imageHeight,
                    maxHeight: isPortraitOnly ? "90%" : "none",
                    width: "auto",
                    maxWidth: isPortraitOnly ? "100%" : "none",
                    minWidth: isPortraitOnly ? "unset" : "60%",
                    flexShrink: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                />
              )}
              {/* Mobile counter */}
              <div className="md:hidden text-center flex-shrink-0">
                <span className="text-[14px] font-normal tracking-tight" style={{ color: "#f0ede6" }}>
                  {currentIndex + 1} / {shuffledPhotos.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info toggle button — centered in the bottom padding gap */}
        <button
          onClick={() => setIsInfoOpen((v) => !v)}
          className="fixed left-1/2 select-none transition-opacity"
          style={{
            bottom: "calc(var(--header-height) / 2)",
            transform: "translate(-50%, 50%)",
            zIndex: 100000,
            color: "#f0ede6",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "var(--text-4xl)",
            lineHeight: 1,
            fontFamily: '"kepler-std-semicondensed-sub", serif',
            fontWeight: 400,
          }}
          aria-label={isInfoOpen ? "Close info" : "Open info"}
        >
          <motion.span
            animate={{ rotate: isInfoOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            style={{ display: "inline-block", lineHeight: 1 }}
          >
            +
          </motion.span>
        </button>

        {/* Info drawer — slides up from bottom */}
        <AnimatePresence>
          {isInfoOpen && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.9 }}
              className="fixed bottom-0 left-0 right-0 overflow-y-auto"
              style={{
                zIndex: 99998,
                backgroundColor: "#1c1c1c",
                color: "#f0ede6",
                maxHeight: "70dvh",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "calc(var(--header-height) * 0.8)",
                paddingBottom: "calc(var(--header-height) * 1.4)",
              }}
            >
              <div className="max-w-2xl flex flex-col gap-8 text-[14px] font-normal tracking-tight leading-relaxed">

                {/* Subtitle */}
                {currentFolder.subtitle && (
                  <p className="opacity-50">{currentFolder.subtitle}</p>
                )}

                {/* Description */}
                {currentFolder.description && (
                  <div>{renderDescription(currentFolder.description)}</div>
                )}

                {/* Credits */}
                {currentFolder.credits && (
                  <div>{renderCredits(currentFolder.credits)}</div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // ─── DEFAULT: existing layout ─────────────────────────────────────────────
  return (
    <>
      <SEO
        title={currentFolder.title}
        description={currentFolder.description}
        image={photosToDisplay[0]?.src}
      />
      <GalleryLayout
        backLink="/photography"
        backLabel="Back to Photography"
        title={currentFolder.title}
        subtitle={currentFolder.subtitle}
        description={currentFolder.description}
        credits={currentFolder.credits}
      >
        <div className="flex flex-col gap-[2dvw]">
          {photosToDisplay.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="w-full flex justify-center items-center"
              style={{ maxHeight: "70vh" }}
            >
              <ImageWithFallback
                src={photo.src}
                alt={`${currentFolder.title} by Adrien Denis-Pasquier`}
                className="w-auto h-auto max-h-[70dvh] select-none"
                style={{ objectFit: "contain" }}
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
