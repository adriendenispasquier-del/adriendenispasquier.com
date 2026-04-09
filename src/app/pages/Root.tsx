import { Outlet } from "react-router";
import { Navigation } from "../components/Navigation";
import { ScrollToTop } from "../components/ScrollToTop";
import { CustomCursor } from "../components/CustomCursor";
import { Suspense, useState, useMemo, useEffect } from "react";
import { useLocation, Link } from "react-router";
import { HomeImageProvider } from "../contexts/HomeImageContext";
import { getPhotographyImages, getIllustrationImages, allProjects } from "../data/projects-registry";
import { brandIdentityData } from "../data/brand-identity-data";
import { motion, AnimatePresence } from "motion/react";

export default function Root() {
  const location = useLocation();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [currentProjectPath, setCurrentProjectPath] = useState<string | null>(null);
  const [currentProjectName, setCurrentProjectName] = useState<string | null>(null);
  const [currentProjectSlug, setCurrentProjectSlug] = useState<string | null>(null);
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Check if we're on home page
  const isHomePage = location.pathname === "/";
  
  // Check if we're on the cyberleaders page
  const isCyberleaders = location.pathname.includes("/illustration/cyberleaders");
  // Check if we're on the about page
  const isAbout = location.pathname === "/about";
  // Check if we're on an individual project page (not a section landing)
  const isProjectPage = /^\/(photography|illustration|brand-design)\/.+/.test(location.pathname);
  
  // ✅ replace with
const isDarkPhotoFolder = ["/photography/archipel-berlin", "/photography/fat-cat"].includes(location.pathname);
const isDarkPage = isCyberleaders || isDarkPhotoFolder;

const footerTextColor = isDarkPage ? "text-white" : "text-[#1c1c1c]";
const footerHoverColor = isDarkPage ? "hover:text-gray-300" : "hover:text-black";
const bgColor = isDarkPage ? "bg-[#1c1c1c]" : isAbout ? "bg-[#d5d0bb]" : "bg-[#f7f5f0]";
const bodyBgColor = isDarkPage ? "#1c1c1c" : isAbout ? "#d5d0bb" : "#f7f5f0";


  // ✅ Use centralized project registry - single source of truth
  const allImages = useMemo(() => {
    const photographyImages = getPhotographyImages();
    const illustrationImages = getIllustrationImages();
    const brandIdentityImages = Object.values(brandIdentityData)
      .flatMap(folder => folder.images.map(img => img.src))
      .filter(src => src.length > 0);

    return {
      photography: photographyImages,
      illustration: illustrationImages,
      brandIdentity: brandIdentityImages,
    };
  }, []);

  // ⚡ PRELOAD all images on Home page mount for instant display
  useEffect(() => {
    if (isHomePage) {
      const allVisualImages = [...allImages.photography, ...allImages.illustration];
      
      // Preload first 20 images immediately for instant tap response
      allVisualImages.slice(0, 20).forEach((src) => {
        const img = new Image();
        img.src = src;
      });
      
      // Preload remaining images with slight delay
      setTimeout(() => {
        allVisualImages.slice(20).forEach((src) => {
          const img = new Image();
          img.src = src;
        });
      }, 1000);
    }
  }, [isHomePage, allImages.photography, allImages.illustration]);

  // Define sections data
  const sectionsData = useMemo(() => {
    return [
      {
        slug: "illustration",
        title: "Illustration",
        path: "/illustration",
        description: "Digital & traditional artwork",
        projectImages: allImages.illustration,
      },
      {
        slug: "photography",
        title: "Photography",
        path: "/photography",
        description: "Capturing moments & emotions",
        projectImages: allImages.photography,
      },
      {
        slug: "brandIdentity",
        title: "Brand Design",
        path: "/brand-design",
        description: "Visual identity & design systems",
        projectImages: allImages.brandIdentity,
      },
      {
        slug: "about",
        title: "About",
        path: "/about",
        description: "Learn more about the artist",
        projectImages: [], // No images for About section
      },
    ];
  }, [allImages]);

  // Display a random image from photography + illustration on page load (home page only)
  useEffect(() => {
    if (isHomePage) {
      const allVisualImages = [...allImages.photography, ...allImages.illustration];
      if (allVisualImages.length > 0) {
        const randomImage = allVisualImages[Math.floor(Math.random() * allVisualImages.length)];
        
        // Find which project this image belongs to
        const project = allProjects.find(p => p.images.includes(randomImage));
        
        setHoveredImage(randomImage);
        setCurrentProjectPath(project?.path || null);
        setCurrentProjectName(project?.name || null);
        setCurrentProjectSlug(project?.slug || null);
      }
    }
  }, [isHomePage, allImages]);

  const handleMouseEnter = (slug: string) => {
    if (!isHomePage) return; // Only work on home page
    
    // Don't change image for About or Brand Design sections, keep current image visible
    if (slug === "about") {
      setShowComingSoon(false);
      return;
    }
    
    const section = sectionsData.find(s => s.slug === slug);
    if (section && section.projectImages.length > 0) {
      const randomImage = section.projectImages[Math.floor(Math.random() * section.projectImages.length)];
      
      // Find which project this image belongs to
      const project = allProjects.find(p => p.images.includes(randomImage));
      
      setHoveredImage(randomImage);
      setCurrentProjectPath(project?.path || null);
      setCurrentProjectName(project?.name || null);
      setCurrentProjectSlug(project?.slug || null);
      setShowComingSoon(false);
    }
  };

  const handleMouseLeave = () => {
    // Keep the image visible after hover
  };

  const handleCycleRandomImage = () => {
    // Cycle through a random image from photography + illustration (for mobile touch)
    const allVisualImages = [...allImages.photography, ...allImages.illustration];
    if (allVisualImages.length > 0) {
      // Always ensure we set showComingSoon to false first
      setShowComingSoon(false);
      
      // Get a random image that's different from current one
      let randomImage = allVisualImages[Math.floor(Math.random() * allVisualImages.length)];
      
      // Try to get a different image (up to 5 attempts for better variety)
      let attempts = 0;
      while (randomImage === hoveredImage && attempts < 5 && allVisualImages.length > 1) {
        randomImage = allVisualImages[Math.floor(Math.random() * allVisualImages.length)];
        attempts++;
      }
      
      // Find which project this image belongs to
      const project = allProjects.find(p => p.images.includes(randomImage));
      
      // Direct instant update - no null state, no animation delay
      setHoveredImage(randomImage);
      setCurrentProjectPath(project?.path || null);
      setCurrentProjectName(project?.name || null);
      setCurrentProjectSlug(project?.slug || null);
    }
  };

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [location.pathname]);

  // ✅ Global scroll handler for all pages to hide/show header and footer
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      
      // Hide/show header and footer based on scroll direction
      if (scrollY > lastScrollY && scrollY > 100) {
        // Scrolling down - hide header and footer
        setShowHeaderFooter(false);
      } else if (scrollY < lastScrollY) {
        // Scrolling up - show header and footer
        setShowHeaderFooter(true);
      }
      setLastScrollY(scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, setShowHeaderFooter]);

  return (
    <div className={`h-[100dvh] flex flex-col ${bgColor} transition-colors duration-500`} style={{ backgroundColor: bodyBgColor }}>
      <HomeImageProvider
        hoveredImage={hoveredImage}
        showComingSoon={showComingSoon}
        currentProjectPath={currentProjectPath}
        currentProjectName={currentProjectName}
        currentProjectSlug={currentProjectSlug}
        setHoveredImage={setHoveredImage}
        setShowComingSoon={setShowComingSoon}
        onSectionHover={handleMouseEnter}
        onSectionLeave={handleMouseLeave}
        onCycleRandomImage={handleCycleRandomImage}
      >
        {/* Header with hide/show animation on mobile */}
        <motion.div
          initial={false}
          animate={{ 
            y: showHeaderFooter ? 0 : '-100%'
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <Navigation />
        </motion.div>
        
        <main className="flex-1">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading...</div>
              </div>
            }
          >
            <AnimatePresence>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </main>

        {/* Footer - Fixed at bottom with hide/show animation on mobile */}
        <motion.footer
          initial={false}
          animate={{
            y: isProjectPage ? '100%' : showHeaderFooter ? 0 : '100%'
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed bottom-0 left-0 right-0 px-[2%] pb-3 pt-3 md:pb-8 md:pt-5 z-20 pointer-events-none"
        >
          {/* Mobile: centered */}
          <div className="md:hidden flex flex-row justify-center items-center gap-4 pointer-events-auto">
            <div className="flex gap-4 text-[15px] font-normal">
              <a
                href="mailto:adriendenispasquier@gmail.com"
                className={`${footerTextColor} ${footerHoverColor} transition-colors`}
              >
                Contact
              </a>
              <a
                href="https://www.instagram.com/mr_w_cat/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${footerTextColor} ${footerHoverColor} transition-colors`}
              >
                Instagram
              </a>
              <Link
                to="/impressum"
                className={`${footerTextColor} ${footerHoverColor} transition-colors`}
              >
                Impressum
              </Link>
              <Link
                to="/agbs"
                className={`${footerTextColor} ${footerHoverColor} transition-colors`}
              >
                AGBs
              </Link>
            </div>
          </div>

          {/* Desktop: split left/right */}
          <div className="hidden md:flex flex-row justify-between items-center text-[15px] font-normal pointer-events-auto">
            <div className="flex gap-4">
              <a
                href="mailto:adriendenispasquier@gmail.com"
                className={`${footerTextColor} ${footerHoverColor} transition-colors`}
              >
                Contact
              </a>
              <a
                href="https://www.instagram.com/mr_w_cat/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${footerTextColor} ${footerHoverColor} transition-colors`}
              >
                Instagram
              </a>
            </div>
            <div className="flex gap-4">
              <Link
                to="/impressum"
                className={`${footerTextColor} ${footerHoverColor} transition-colors`}
              >
                Impressum
              </Link>
              <Link
                to="/agbs"
                className={`${footerTextColor} ${footerHoverColor} transition-colors`}
              >
                AGBs
              </Link>
            </div>
          </div>
        </motion.footer>

        <ScrollToTop />
        <CustomCursor />
      </HomeImageProvider>
    </div>
  );
}