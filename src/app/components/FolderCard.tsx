import { motion } from "motion/react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Folder } from "lucide-react";

interface FolderCardProps {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  itemCount: number;
  index: number;
  basePath?: string;
}

export function FolderCard({
  slug,
  title,
  description,
  coverImage,
  itemCount,
  index,
  basePath = "/illustration",
}: FolderCardProps) {
  return (
    <Link to={`${basePath}/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group cursor-pointer"
      >
        <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
          <ImageWithFallback
            src={coverImage}
            alt={title}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
            <Folder className="size-3" />
            <span className="text-xs">{itemCount}</span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl tracking-wide mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
}