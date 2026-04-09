import { useParams, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
} from "motion/react";
import { brandIdentityData } from "../data/brand-identity-data";
import { photographyData } from "../data/photography-data";
import { SEO } from "../components/SEO";
import { Link } from "react-router";
import { BrandDesignPasswordGate } from "../components/BrandDesignPasswordGate";
import { ArrowUp } from "lucide-react";

// Smooth fade-in block component with viewport detection
function FadeInBlock({
  children,
  className,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function BrandIdentityFolder() {
  const { slug } = useParams();
  const currentFolder = slug ? brandIdentityData[slug] : null;
  const navigate = useNavigate();

  // Split description into paragraphs
  const paragraphs =
    currentFolder?.description.split("\\n\\n") || [];

  // Process secondary description for section 3
  const secondaryParagraphs =
    currentFolder?.secondaryDescription?.split("\\n\\n") || [];

  // Get Archipel photography data for gallery
  const archipelPhotos =
    photographyData["archipel-berlin"]?.photos || [];

  // Use the secondaryDescription from brand-identity-data (the photography text)
  const photographyText =
    currentFolder?.secondaryDescription || "";

  // Gallery state
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);
  const [activeSide, setActiveSide] = useState<
    "left" | "right"
  >("left");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showPhotoCount, setShowPhotoCount] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
  });
  const [shuffledPhotos, setShuffledPhotos] = useState<
    typeof archipelPhotos
  >([]);

  // Shuffle photos on mount
  useEffect(() => {
    const shuffled = [...archipelPhotos].sort(
      () => Math.random() - 0.5,
    );
    setShuffledPhotos(shuffled);
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollArrows, setShowScrollArrows] =
    useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0,
      );
    };
    checkTouch();
  }, []);

  // Handle scroll to show arrows and hide/show header on mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      // Show arrows only when near the end (last section or close to bottom)
      const isNearEnd =
        scrollTop + clientHeight >= scrollHeight - 100;
      setShowScrollArrows(isNearEnd);
    };

    // Listen to window scroll instead of container scroll
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!currentFolder) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl mb-4">Project not found</h1>
        <Link
          to="/brand-design"
          className="text-gray-600 hover:text-black"
        >
          Back to Brand Design
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={currentFolder.title}
        description={currentFolder.description.substring(
          0,
          160,
        )}
      />

    <BrandDesignPasswordGate enabled={currentFolder.protected}>


        {/* Fluid scroll container - NO snap points */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide px-[3%] md:px-[2%] pt-[calc(var(--header-height)+4rem)] pb-32"
          style={{
            backgroundColor:
              currentFolder.backgroundColor || "#f7f5f0",
          }}
        >
          {/* Section 1: Asymmetric Layout - Text Left (35%) + Image Right (65%) */}
          <section
            className="w-full flex flex-col md:flex-row gap-8 md:gap-12 max-h-[100vh]"
            style={{
              backgroundColor:
                currentFolder.backgroundColor || "#f7f5f0",
              marginBottom: "clamp(40px, 8vh, 120px)",
            }}
          >
            {/* Left Column: Text Content (35%) - STICKY */}
            <div className="w-full md:w-[30%] md:sticky md:top-[calc(var(--header-height)+4rem)] md:self-start">
              <div className="space-y-8">
                {/* Project Title */}
                <FadeInBlock delay={0}>
                  <h2 className="tracking-tight">
                    {currentFolder.title}
                  </h2>
                </FadeInBlock>

                {/* Services list */}
                {currentFolder.services &&
                  currentFolder.services.length > 0 && (
                    <FadeInBlock delay={0.1}>
                      <div className="pb-4 border-b border-black/20">
                        <p className="text-[14px] md:text-[14px] opacity-70">
                          {currentFolder.services.join(" | ")}
                        </p>
                      </div>
                    </FadeInBlock>
                  )}

                {/* Description Paragraphs */}
                <div className="space-y-6">
                  {paragraphs.map((paragraph, pIndex) => (
                    <FadeInBlock
                      key={pIndex}
                      delay={0.2 + pIndex * 0.1}
                    >
                      <p className="text-[14px] md:text-[14px] leading-[1.4] opacity-90">
                        {paragraph}
                      </p>
                    </FadeInBlock>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Visual (70%) - Centered Vertically */}
            <div className="w-full md:w-[70%] flex items-center">
              <FadeInBlock delay={0.3} className="w-full">
                <img
                  src="https://res.cloudinary.com/df2kod03a/image/upload/v1774535107/Archipel_Billboard_by_Adrien_Denis-Pasquier_xa1ocv.jpg"
                  alt={currentFolder.title}
                  className="w-full h-auto"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </FadeInBlock>
            </div>
          </section>

          {/* Section 2.0: Quote Left (30%) + Video Right (70%) */}
          <section
            className="w-full flex flex-col md:flex-row gap-8 md:gap-12 max-h-[100vh]"
            style={{
              backgroundColor:
                currentFolder.backgroundColor || "#f7f5f0",
              marginBottom: "clamp(40px, 8vh, 120px)",
            }}
          >
            {/* Left Column: Quote - STICKY */}
            <div className="w-full md:w-[30%] md:sticky md:top-[calc(var(--header-height)+4rem)] md:self-start">
                <FadeInBlock delay={0}>
                  <h2 className="tracking-tight">
                    A gourmet logo
                  </h2>
                </FadeInBlock>
              <FadeInBlock delay={0}>
                <p className="text-[14px] md:text-[14px] leading-[1.4] opacity-90">
The Archipel logo typeface was entirely hand-drawn and was designed to feel both rich and approachable. Its generous curves and full, rounded strokes evoke abundance and indulgence, while its finer lines bring balance and a quiet sense of elegance.                </p>
              </FadeInBlock>
            </div>

            {/* Right Column: Image - Centered Vertically */}
            <div className="w-full md:w-[70%] flex items-center">
              <FadeInBlock delay={0.2} className="w-full">
                <video
                  src="https://res.cloudinary.com/df2kod03a/video/upload/v1774527159/Archipel_logo_by_Adrien_Denis-Pasquier4_lcp5gb.mp4"
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </FadeInBlock>
            </div>
          </section>

           {/* Section 2.1: Quote Left (30%) + Video Right (70%) */}
          <section
            className="w-full flex flex-col md:flex-row gap-8 md:gap-12 max-h-[100vh]"
            style={{
              backgroundColor:
                currentFolder.backgroundColor || "#f7f5f0",
              marginBottom: "clamp(40px, 8vh, 120px)",
            }}
          >
            {/* Left Column: Quote - STICKY */}
            <div className="w-full md:w-[30%] md:sticky md:top-[calc(var(--header-height)+4rem)] md:self-start">
                <FadeInBlock delay={0}>
                  <h2 className="tracking-tight">
                    Fonts and Colors
                  </h2>
                </FadeInBlock>
              <FadeInBlock delay={0}>
                <p className="text-[14px] md:text-[14px] leading-[1.4] opacity-90">
                The online delicatessen was conceived as a gallery for quality goods, refined, yet inviting. It needed to create contrast without ever feeling cold or distant.

A palette of warm, luminous tones was chosen: <b>ivory and light beige</b> form a soft, neutral base, while earthy accents, <b>terracotta</b>, reminiscent of traditional tomette tiles, bring depth and warmth. <br></br>The overall atmosphere evokes a sunlit summer terrace, where everything feels calm and generous.

<br></br><br></br>For typography, <b>Acumin Pro</b> was selected as the primary typeface for titles and body text, ensuring clarity and structure. <b>Ivy Presto</b> complements it for product names and more expressive, narrative elements, adding character and a touch of refinement. Together, they create a harmonious dialogue with the visuals and the logo—both functional and sensorial.
                  
                </p>
              </FadeInBlock>
            </div>

            {/* Right Column: Image - Centered Vertically */}
            <div className="w-full md:w-[70%] flex items-center">
              <FadeInBlock delay={0.2} className="w-full">
                <img
                  src="https://res.cloudinary.com/df2kod03a/image/upload/v1774276283/Archipel_by_Adrien_Denis-Pasquier_book_yhjllp.jpg"
                   alt={currentFolder.title}
                  className="w-full h-auto"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </FadeInBlock>
            </div>
          </section>
          
          {/* Section 2.2: Quote Left (30%) + Video Right (70%) */}
          <section
            className="w-full flex flex-col md:flex-row gap-8 md:gap-12 max-h-[100vh]"
            style={{
              backgroundColor:
                currentFolder.backgroundColor || "#f7f5f0",
              marginBottom: "clamp(40px, 8vh, 120px)",
            }}
          >
            {/* Left Column: Quote - STICKY */}
            <div className="w-full md:w-[30%] md:sticky md:top-[calc(var(--header-height)+4rem)] md:self-start">
                <FadeInBlock delay={0}>
                  <h2 className="tracking-tight">
                    Designing a Getaway
                  </h2>
                </FadeInBlock>
              <FadeInBlock delay={0}>
                <p className="text-[14px] md:text-[14px] leading-[1.4] opacity-90">
                  The goal was to transform an online
                  delicatessen into an atmospheric space. The
                  platform was not meant to feel transactional,
                  but immersive. Every visual decision supported
                  that intention.
                </p>
              </FadeInBlock>
            </div>

            {/* Right Column: Video - Centered Vertically */}
            <div className="w-full md:w-[70%] flex items-center">
              <FadeInBlock delay={0.2} className="w-full">
                <video
                  src="https://res.cloudinary.com/df2kod03a/video/upload/v1774431517/MacBook_Archipel_by_Adrien_Denis-Pasquier_tpu1hv.mp4"
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </FadeInBlock>
            </div>
          </section>

          {/* Section 2.3: Quote Left (30%) + Video Right (70%) */}
          <section
            className="w-full flex flex-col md:flex-row gap-8 md:gap-12 max-h-[100vh]"
            style={{
              backgroundColor:
                currentFolder.backgroundColor || "#f7f5f0",
              marginBottom: "clamp(40px, 8vh, 120px)",
            }}
          >
            {/* Left Column: Quote - STICKY */}
            <div className="w-full md:w-[30%] md:sticky md:top-[calc(var(--header-height)+4rem)] md:self-start">
                <FadeInBlock delay={0}>
                  <h2 className="tracking-tight">
                    Innocent Lines
                  </h2>
                </FadeInBlock>
              <FadeInBlock delay={0}>
                <p className="text-[14px] md:text-[14px] leading-[1.4] opacity-90">
                
                Funny, tender, and full of soul, Archipel’s “doodles” began as simple eye-catchers but quickly grew a true language of expression.

Over time, they found their way beyond the screen, appearing on prints, flyers, and postcards. What started as a playful detail has become a defining feature of Archipel’s identity—something people recognize, connect with, and carry with them.
                 
                </p>
              </FadeInBlock>
            </div>

            {/* Right Column: Video - Centered Vertically */}
            <div className="w-full md:w-[70%] flex items-center">
              <FadeInBlock delay={0.2} className="w-full">
                <video
                  src="https://res.cloudinary.com/df2kod03a/video/upload/v1774426403/phones_illus_by_Adrien_Denis-Pasquier3_peufyl.mp4"
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </FadeInBlock>
            </div>
          </section>

          {/* Section 3: Gallery Right (70%) + Text Left (30%) */}
          <section
            className="w-full flex flex-col md:flex-row gap-8 md:gap-12 max-h-[100vh]"
            style={{
              backgroundColor:
                currentFolder.backgroundColor || "#f7f5f0",
              marginBottom: "clamp(40px, 8vh, 120px)",
            }}
          >
            {/* Left Column: Photography Text - STICKY */}
            <div className="w-full md:w-[30%] md:sticky md:top-[calc(var(--header-height)+4rem)] md:self-start">
                <FadeInBlock delay={0}>
                  <h2 className="tracking-tight">
                    Portraying Food
                  </h2>
                </FadeInBlock>
              <FadeInBlock delay={0}>
                <p className="text-[14px] md:text-[14px] leading-[1.4] opacity-90">
                  {photographyText}
                </p>
              </FadeInBlock>
            </div>

            {/* Right Column: Visual (70%) - Centered Vertically */}
            <div className="w-full md:w-[70%] flex items-center">
              <FadeInBlock delay={0.3} className="w-full">
                <img
                  src="https://res.cloudinary.com/df2kod03a/image/upload/v1774426105/Bookb_biadhp.gif"
                  alt={currentFolder.title}
                  className="w-full h-auto"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </FadeInBlock>
            </div>
          </section>

          {/* Section 4: Full-width image */}
          <section
            className="w-full"
            style={{
              marginBottom: "clamp(40px, 8vh, 80px)",
            }}
          >
            <FadeInBlock delay={0}>
              <img
                src="https://res.cloudinary.com/df2kod03a/image/upload/v1774535905/posters_wwsq9m.jpg"
                alt= "Archipel by Adrien Denis-Pasquier"
                className="w-full h-auto"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </FadeInBlock>
          </section>

          {/* Section 5: Final full-width image */}
          <section
            className="w-full"
            style={{
              marginBottom: "clamp(40px, 8vh, 80px)",
            }}
          >
            <FadeInBlock delay={0}>
              <img
                src="https://res.cloudinary.com/df2kod03a/image/upload/v1774270286/phones_copie_udq4rq.jpg"
                alt="Archipel by Adrien Denis-Pasquier"
                className="w-full h-auto"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </FadeInBlock>
          </section>
     

        {/* Section 6: Final full-width image */}
          <section
            className="w-full"
            style={{
              marginBottom: "clamp(40px, 8vh, 80px)",
            }}
          >
            <FadeInBlock delay={0}>
              <img
                src="https://res.cloudinary.com/df2kod03a/image/upload/v1774536517/Large_Fence_Banner_Archipel_by_Adrien_Denis-Pasquier_olv994.jpg"
                alt="Archipel by Adrien Denis-Pasquier"
                className="w-full h-auto"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </FadeInBlock>
          </section>


<section
            className="w-full"
            style={{
              marginBottom: "clamp(40px, 8vh, 80px)",
          
            }}
          > 
        
              <FadeInBlock delay={0.2}>
                <video
                  src="https://res.cloudinary.com/df2kod03a/video/upload/v1774780131/Linen_bag_ybryd5.mp4"
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </FadeInBlock>
            
          </section>

          
        </div>

        {/* Scroll to Top Arrow - only at bottom of page */}
        <AnimatePresence>
          {showScrollArrows && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="fixed left-[2%] z-[10001] flex items-center gap-3 transition-colors cursor-pointer text-xs tracking-normal font-normal hover:opacity-70"
              style={{
                color: "#000000",
                bottom: "20px",
              }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-20 h-20" strokeWidth={1} />
            </motion.button>
          )}
        </AnimatePresence>
      </BrandDesignPasswordGate>
    </>
  );
}