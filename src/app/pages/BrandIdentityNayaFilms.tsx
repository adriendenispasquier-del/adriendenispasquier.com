import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { brandIdentityData } from "../data/brand-identity-data";
import { SEO } from "../components/SEO";
import { BrandDesignPasswordGate } from "../components/BrandDesignPasswordGate";

const SLUG = "naya-films";
const sectionGap = "clamp(40px, 8vh, 120px)";

const noSelect: React.CSSProperties = {
  userSelect: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  pointerEvents: "none",
  width: "100%",
  height: "auto",
  display: "block",
};

function MediaClip({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-hidden flex items-center" style={{ maxHeight: "100vh" }}>
      {children}
    </div>
  );
}

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
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function BrandIdentityNayaFilms() {
  const currentFolder = brandIdentityData[SLUG];

  return (
    <>
      <SEO
        title={currentFolder.title}
        description={currentFolder.description.substring(0, 160)}
      />

      <BrandDesignPasswordGate enabled={currentFolder.protected}>
        <div
          className="scrollbar-hide px-[3%] md:px-[2%] pt-[calc(var(--header-height)+4rem)] pb-32"
          style={{ backgroundColor: currentFolder.backgroundColor || "#f7f5f0" }}
        >

          {/* ── Section 1: Title + description ── */}
          <section className="w-full flex flex-col gap-8 md:gap-12" style={{ marginBottom: sectionGap }}>
            <div className="w-full md:w-1/2">
              <div className="space-y-8">
                <FadeInBlock delay={0}>
                  <h2 className="tracking-tight">{currentFolder.title}</h2>
                </FadeInBlock>
                {currentFolder.services && currentFolder.services.length > 0 && (
                  <FadeInBlock delay={0.1}>
                    <div className="pb-4 border-b border-black/20">
                      <p className="text-[14px] opacity-70">
                        {currentFolder.services.join(" | ")}
                      </p>
                    </div>
                  </FadeInBlock>
                )}
                <FadeInBlock delay={0.2}>
                  <p className="text-[14px] leading-[1.4] opacity-90">{currentFolder.description}</p>
                </FadeInBlock>
              </div>
            </div>
            {/* Add your first media here */}
          </section>

          {/* Add more sections below */}

        </div>
      </BrandDesignPasswordGate>
    </>
  );
}
