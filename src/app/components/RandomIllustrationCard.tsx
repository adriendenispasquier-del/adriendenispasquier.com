import { motion } from "motion/react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RandomIllustrationCardProps {
  src: string;
  title?: string;
  left: number;        // vw
  top: number;         // vw
  size: number;        // vw (width)
  aspectRatio: number; // width / height
  index: number;
  onLoad?: () => void;
  style?: React.CSSProperties;
  folderName?: string;
}

export function RandomIllustrationCard({
  src,
  title,
  left,
  top,
  size,
  aspectRatio,
  index,
  onLoad,
  style,
  folderName,
}: RandomIllustrationCardProps) {
  const height = size / aspectRatio;
  const [isLoaded, setIsLoaded] = useState(false);
  
  const altText = folderName 
    ? `${folderName} Illustration by Adrien Denis-Pasquier`
    : `${title || "Illustration"} by Adrien Denis-Pasquier`;

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.025, 0.5) }}
      className="absolute"
      style={{
        left: `${left}vw`,
        top: `${top}vw`,
        width: `${size}vw`,
        height: `${height}vw`,
        willChange: "transform, opacity",
        pointerEvents: "none",
        ...style,
      }}
    >
      <div className="relative size-full overflow-hidden">
        <ImageWithFallback
          src={src}
          alt={altText}
          className="size-full object-contain select-none"
          onLoad={handleImageLoad}
          eager
          sizes={`${size}vw`}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
        />
      </div>
    </motion.div>
  );
}