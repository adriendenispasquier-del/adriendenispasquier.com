import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PhotoCardProps {
  src: string;
  title?: string;
  index: number;
  folderName?: string;
}

export function PhotoCard({ src, title, index, folderName }: PhotoCardProps) {
  const altText = folderName 
    ? `${folderName} Photography by Adrien Denis-Pasquier`
    : `${title || "Photo"} by Adrien Denis-Pasquier`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group cursor-pointer relative aspect-[2/3] overflow-hidden bg-gray-50
        lg:[&:nth-child(4n+2)]:-mt-[50%]
        lg:[&:nth-child(4n+4)]:-mt-[50%]
        landscape:md:[&:nth-child(3n+2)]:-mt-[50%]
        portrait:md:[&:nth-child(2n+2)]:-mt-[50%]
        landscape:sm:[&:nth-child(2n+2)]:-mt-[50%]"
    >
      <ImageWithFallback
        src={src}
        alt={altText}
        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
    </motion.div>
  );
}