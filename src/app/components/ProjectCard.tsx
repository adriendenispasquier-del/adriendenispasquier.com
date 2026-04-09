import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  index: number;
  folderName?: string;
}

export function ProjectCard({ image, title, category, index, folderName }: ProjectCardProps) {
  const altText = folderName 
    ? `${folderName} Illustration by Adrien Denis-Pasquier`
    : `${title} by Adrien Denis-Pasquier`;
    
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-50">
        <ImageWithFallback
          src={image}
          alt={altText}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <p className="text-xs tracking-widest uppercase text-gray-500">{category}</p>
        <h3 className="mt-1 text-lg tracking-wide">{title}</h3>
      </div>
    </motion.div>
  );
}