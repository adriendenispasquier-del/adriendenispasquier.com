import { motion } from "motion/react";
import { Link } from "react-router";
import { useState } from "react";

interface ProjectThumbnailProps {
  title: string;
  path: string;
  thumbnail: string;
  index: number;
}

export function ProjectThumbnail({ title, path, thumbnail, index }: ProjectThumbnailProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group"
    >
      <Link to={path} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <motion.img
            src={thumbnail}
            alt={`${title} - Project thumbnail`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <motion.h3
          className="mt-3 text-[14px] tracking-wide uppercase group-hover:translate-x-1 transition-transform duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.2 }}
        >
          {title}
        </motion.h3>
      </Link>
    </motion.div>
  );
}
