import { useHomeImage } from "../contexts/HomeImageContext";
import { SEO } from "../components/SEO";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Home() {
  const {
    hoveredImage,
    showComingSoon,
    currentProjectPath,
    currentProjectName,
    cycleRandomImage
  } = useHomeImage();

  const navigate = useNavigate();

  useEffect(() => {
    if (hoveredImage) {
      const img = new Image();
      img.src = hoveredImage;
    }
  }, [hoveredImage]);

  const handleNavigateToProject = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentProjectPath) navigate(currentProjectPath);
  };

  const handlePreviewPointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.pointerType === "mouse") {
      if (currentProjectPath) navigate(currentProjectPath);
      return;
    }

    cycleRandomImage();
  };

  return (
    <>
      <SEO
        title="Adrien Denis-Pasquier - Creative Portfolio | Photography, Illustration & Design"
        description="Multidisciplinary designer working across brand identity, graphic design, illustration, photography and digital direction. Crafting coherent visual worlds with sensitivity to light, texture and atmosphere."
        keywords={[
          "photographer Berlin",
          "illustrator Berlin",
          "graphic designer",
          "creative portfolio",
          "visual identity",
          "art direction",
          "product photography",
          "editorial illustration",
        ]}
      />

      <div className="h-[calc(100vh-73px-88px)] lg:h-[calc(100vh-73px-120px)] overflow-hidden px-[2%] relative flex items-center justify-center lg:justify-center">
        {showComingSoon && (
          <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center">
            <p className="tracking-wide text-[64px] uppercase">Coming Soon</p>
          </div>
        )}

        {hoveredImage && !showComingSoon && (
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div
              className="flex flex-col items-center gap-4 max-w-[80dvw] lg:max-w-[60dvw] max-h-[85dvh] relative pointer-events-none"
              data-popup-image
            >
              {hoveredImage.endsWith(".mp4") ? (
                <video
                  key={hoveredImage}
                  src={hoveredImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-auto w-auto max-w-[80dvw] lg:max-w-[60dvw] max-h-[85dvh] object-contain select-none pointer-events-auto"
                  style={{ cursor: "none", touchAction: "manipulation" }}
                  data-popup-clickable
                  onPointerUp={handlePreviewPointerUp}
                />
              ) : (
                <ImageWithFallback
                  key={hoveredImage}
                  src={hoveredImage}
                  alt="Preview from Adrien Denis-Pasquier creative portfolio"
                  className="h-auto w-auto max-w-[80dvw] lg:max-w-[60dvw] max-h-[85dvh] object-contain opacity-100 select-none pointer-events-auto"
                  style={{ cursor: "none", touchAction: "manipulation" }}
                  loading="eager"
                  draggable={false}
                  data-popup-clickable
                  onPointerUp={handlePreviewPointerUp}
                />
              )}

              {currentProjectPath && currentProjectName && (
                <div
                  className="lg:hidden flex items-center gap-2 text-black text-[12px] uppercase mt-2 pointer-events-auto"
                  style={{ cursor: "auto" }}
                  onClick={handleNavigateToProject}
                  onTouchStart={handleNavigateToProject}
                >
                  <span>{currentProjectName}</span>
                  <ArrowRight size={20} strokeWidth={1.5} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}