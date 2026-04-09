import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  isDark?: boolean;
}

export function ScrollIndicator({ isDark = false }: ScrollIndicatorProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      // Use window scroll since <main> doesn't have its own scroll
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const circleColor = isDark ? "bg-white" : "bg-black";

  return (
    <div className="hidden lg:block relative w-[20px] flex-shrink-0">
      <div className="fixed top-[200px] h-[calc(100vh-400px)]">
        <div className="relative h-full">
          <motion.div
            className={`absolute left-1/2 -translate-x-1/2 w-[8px] h-[8px] ${circleColor} rounded-full`}
            style={{ top: `${scrollProgress * 92}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>
    </div>
  );
}