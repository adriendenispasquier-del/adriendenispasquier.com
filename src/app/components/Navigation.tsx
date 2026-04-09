import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useHomeImage } from "../contexts/HomeImageContext";
import { photographyData } from "../data/photography-data";
import { illustrationData } from "../data/illustration-data";
import { brandIdentityData } from "../data/brand-identity-data";

export function Navigation() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { handleSectionHover, handleSectionLeave } = useHomeImage();

  // Check if we're on home page
  const isHomePage = location.pathname === "/";

  // Check if we're on menu pages (Photography, Illustration, or Brand Design)
  const isMenuPage = location.pathname === "/photography" ||
                     location.pathname === "/illustration" ||
                     location.pathname === "/brand-design";

  // Check if we're on a project page (any page deeper than menu)
  const isProjectPage = !isHomePage && !isMenuPage &&
                        (location.pathname.startsWith("/photography/") ||
                         location.pathname.startsWith("/illustration/") ||
                         location.pathname.startsWith("/brand-design/"));

  // Parent section for the back link
  const parentPath = location.pathname.startsWith("/photography/") ? "/photography"
                   : location.pathname.startsWith("/illustration/") ? "/illustration"
                   : "/brand-design";

  // Current project slug
  const projectSlug = location.pathname.split("/").pop() || "";

  // Current project title for back button label
  const projectTitle = location.pathname.startsWith("/photography/")
    ? (photographyData[projectSlug]?.title ?? projectSlug)
    : location.pathname.startsWith("/illustration/")
    ? (illustrationData[projectSlug]?.title ?? projectSlug)
    : (brandIdentityData[projectSlug]?.title ?? projectSlug);

  // Check if we're on the cyberleaders page
  const isCyberleaders = location.pathname.includes("/illustration/cyberleaders");
  // Dark photography folders
  const isDarkPhotoFolder = ["/photography/archipel-berlin", "/photography/fat-cat"].includes(location.pathname);
  // Dark page = any page with dark background
  const isDarkPage = isCyberleaders || isDarkPhotoFolder;
  // Check if we're on the about page
  const isAbout = location.pathname === "/about";

  const textColor = isDarkPage ? "text-white" : "text-black";
  const hoverColor = isDarkPage ? "hover:text-gray-300" : "hover:text-gray-600";
  const underlineColor = isDarkPage ? "bg-white" : "bg-black";

  // Match page background color
  const bgColor = isDarkPage ? "bg-[#111111]" : isAbout ? "bg-[#d5d0bb]" : "bg-[#f7f5f0]";

  const links = [
    { path: "/illustration", label: "Illustration" },
    { path: "/photography", label: "Photography" },
    { path: "/brand-design", label: "Brand Design" },
    { path: "/about", label: "About" },
  ];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <nav className={`w-full ${bgColor} lg:bg-transparent`}>
        <div className="w-full py-2 px-[2%]">
          <div className="relative flex items-center justify-between">

            {isProjectPage ? (
              <Link
                to={parentPath}
                className={`flex items-center gap-2 text-[25px] lg:text-[30px] leading-[1.1] tracking-tight font-normal ${textColor} ${hoverColor} transition-colors`}
              >
                <ArrowLeft className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={1} />
                {projectTitle}
              </Link>
            ) : (
              <Link to="/" className={`text-[25px] lg:text-[30px] leading-[1.1] tracking-tight font-normal ${textColor}`}>
                Adrien Denis-Pasquier
              </Link>
            )}

            {/* Desktop Menu */}
            <div className="hidden lg:flex gap-4 font-normal">
              {links.map((link) => {
                const slug = link.path === "/illustration" ? "illustration" :
                             link.path === "/photography" ? "photography" :
                             link.path === "/brand-design" ? "brandIdentity" :
                             link.path === "/about" ? "about" : "";

                const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + "/");

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onMouseEnter={() => isHomePage && handleSectionHover(slug)}
                    onMouseLeave={() => isHomePage && handleSectionLeave()}
                    className={`relative text-[30px] leading-[1.1] tracking-tight ${textColor} ${hoverColor} transition-colors ${isActive ? 'italic' : ''}`}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="underline"
                        className={`absolute -bottom-1 left-0 right-0 h-[1px] ${underlineColor}`}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleDrawer}
              className={`lg:hidden p-2 transition-colors font-normal ${textColor}`}
              aria-label="Toggle menu"
            >
              {isDrawerOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 40, stiffness: 300 }}
            className={`fixed top-[45px] left-0 right-0 z-[100001] lg:hidden ${bgColor}`}
          >
            <div className="px-[2%] py-4">
              <div className="space-y-0">
                {links.map((link, index) => {
                  const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + "/");

                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        to={link.path}
                        onClick={closeDrawer}
                        className={`block py-1 text-[25px] leading-[1.1] tracking-tight transition-colors font-normal ${textColor} ${hoverColor} ${isActive ? 'italic' : ''}`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
