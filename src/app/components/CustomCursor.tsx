import { useEffect, useState } from "react";
import { ArrowUpLeft, ArrowRight } from "lucide-react";
import { useLocation } from "react-router";
import { useHomeImage } from "../contexts/HomeImageContext";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { hoveredImage, currentProjectPath, currentProjectName } = useHomeImage();
  
  // Check if we're hovering over the popup image (context will provide this)
  const [isHoveringPopup, setIsHoveringPopup] = useState(false);
  const [isHoveringGallery, setIsHoveringGallery] = useState(false);
  
  // Check if we're on cyberleaders or about page for color changes
  const isCyberleaders = location.pathname.includes("/illustration/cyberleaders");
  const isDarkPhotoFolder = ["/photography/archipel-berlin", "/photography/fat-cat"].includes(location.pathname);

  // Check if current image is from Archipel illustration project (black text)
  const isArchipelIllustration = currentProjectPath === '/illustration/archipel';

  // Determine cursor color based on context
  let cursorColor = "text-black";
  if (isCyberleaders || isDarkPhotoFolder) {
    cursorColor = "text-white";
  }
  if (isHoveringPopup && !isArchipelIllustration) {
    cursorColor = "text-white";
  }
  if (isHoveringPopup && isArchipelIllustration) {
    cursorColor = "text-black";
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Check if we're hovering over the popup image
      const target = e.target as HTMLElement;
      const isOverPopup = target.closest('[data-popup-image]') !== null;
      setIsHoveringPopup(isOverPopup);
      
      // Check if we're hovering over the gallery image
      const isOverGallery = target.closest('[data-gallery-image]') !== null;
      setIsHoveringGallery(isOverGallery);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Only show on desktop (not touch devices)
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  // Don't render on touch devices OR when hovering gallery
  if ('ontouchstart' in window || !isVisible || isHoveringGallery) {
    return null;
  }

  return (
    <div
      className="fixed pointer-events-none z-[100002]"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: 'translate(-4px, -4px)',
        transition: 'none', // No transition on position
      }}
    >
      {isHoveringPopup && currentProjectPath && currentProjectName ? (
        // Transform to project cursor
        <div className={`flex items-center gap-2 ${cursorColor} transition-colors duration-300`}>
          <span className="text-[12px] uppercase whitespace-nowrap">{currentProjectName}</span>
          <ArrowRight size={24} strokeWidth={1.5} />
        </div>
      ) : (
        // Default diagonal arrow
        <ArrowUpLeft 
          className={`${cursorColor} transition-colors duration-300`}
          size={32}
          strokeWidth={1.5}
        />
      )}
    </div>
  );
}