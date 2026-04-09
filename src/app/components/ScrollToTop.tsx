import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useLocation } from "react-router";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Detect if we're on a black background page (cyberleaders)
  const isBlackBg = location.pathname.includes("cyberleaders");

  // Brand Design pages handle their own scroll-to-top (bottom-only)
  const isBrandDesign = location.pathname.includes("brand-design");

  useEffect(() => {
    const handleScroll = () => {
      // Use window scroll since <main> doesn't have its own scroll
      const scrolled = window.scrollY > 200;
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]); // Re-run when location changes

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const textColor = isBlackBg ? "text-white" : "text-[#0F0F0F]";
  const hoverColor = isBlackBg ? "hover:text-gray-300" : "hover:text-gray-600";

  return (
    <AnimatePresence>
      {isVisible && !isBrandDesign && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className={`fixed bottom-[56px] left-[2%] z-[10001] flex items-center gap-3 ${textColor} ${hoverColor} transition-colors cursor-pointer text-xs tracking-normal font-normal`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-20 h-20" strokeWidth={1} />
          
        </motion.button>
      )}
    </AnimatePresence>
  );
}