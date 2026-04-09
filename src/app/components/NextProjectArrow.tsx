import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface NextProjectArrowProps {
  nextProjectLink: string;
  isDark?: boolean;
}

export function NextProjectArrow({ nextProjectLink, isDark = false }: NextProjectArrowProps) {
  const [showArrow, setShowArrow] = useState(false);
  const arrowColor = isDark ? "text-white" : "text-[#0F0F0F]";

  useEffect(() => {
    const handleScroll = () => {
      // Use window scroll since <main> doesn't have its own scroll
      const scrolled = window.scrollY > 200;
      setShowArrow(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {showArrow && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-[88px] md:bottom-[88px] right-[2%] z-[10001]"
        >
          <Link
            to={nextProjectLink}
            className="transition-opacity hover:opacity-70 inline-block touch-manipulation"
            aria-label="Next random project"
            onClick={(e) => {
              e.currentTarget.style.pointerEvents = 'auto';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.click();
            }}
          >
            <ArrowRight className={`w-20 h-20 ${arrowColor}`} strokeWidth={1} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}