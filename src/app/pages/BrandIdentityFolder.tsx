import { useRef } from "react";
import { useParams, Link } from "react-router";
import { motion, useInView } from "motion/react";
import { brandIdentityData } from "../data/brand-identity-data";
import { SEO } from "../components/SEO";
import { BrandDesignPasswordGate } from "../components/BrandDesignPasswordGate";

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

// ─── Shared stub layout for projects without content yet ───────────────────
function StubProject({ slug }: { slug: string }) {
  const currentFolder = brandIdentityData[slug];
  if (!currentFolder) return null;

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
          </section>
        </div>
      </BrandDesignPasswordGate>
    </>
  );
}

// ─── Archipel ─────────────────────────────────────────────────────────────
function ArchipelProject() {
  const currentFolder = brandIdentityData["archipel"];
  const paragraphs = currentFolder?.description.split("\\n\\n") || [];
  const photographyText = currentFolder?.secondaryDescription || "";

  if (!currentFolder) return null;

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
          {/* ── Section 1: Title + description + billboard ── */}
          <section className="w-full flex flex-col gap-8 md:gap-12" style={{ marginBottom: sectionGap }}>
            <div className="w-full md:w-1/2">
              <div className="space-y-8">
                {/*   <FadeInBlock delay={0}>
                  <h2 className="tracking-tight">{currentFolder.title}</h2>
                </FadeInBlock> */}
                {currentFolder.services && currentFolder.services.length > 0 && (
                  <FadeInBlock delay={0.1}>
                    <div className="pb-4 border-b border-black/20">
                      <p className="text-[14px] opacity-70">
                        {currentFolder.services.join(" | ")}
                      </p>
                    </div>
                  </FadeInBlock>
                )}
                <div className="space-y-6">
                  {paragraphs.map((paragraph, pIndex) => (
                    <FadeInBlock key={pIndex} delay={0.2 + pIndex * 0.1}>
                      <p className="text-[14px] leading-[1.4] opacity-90">{paragraph}</p>
                    </FadeInBlock>
                  ))}
                </div>
              </div>
            </div>
            <FadeInBlock delay={0.2} className="w-full">
              <MediaClip>
                <img
                  src="https://res.cloudinary.com/df2kod03a/image/upload/v1774535107/Archipel_Billboard_by_Adrien_Denis-Pasquier_xa1ocv.jpg"
                  alt={currentFolder.title}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={noSelect}
                />
              </MediaClip>
            </FadeInBlock>
          </section>

          {/* ── Section 2: A gourmet logo + logo video ── */}
          <section className="w-full flex flex-col gap-8 md:gap-12" style={{ marginBottom: sectionGap }}>
            <div className="w-full md:w-1/2">
              <FadeInBlock delay={0}>
                <h2 className="tracking-tight">A gourmet logo</h2>
              </FadeInBlock>
              <FadeInBlock delay={0.1}>
                <p className="text-[14px] leading-[1.4] opacity-90 mt-4">
                  The Archipel logo typeface was entirely hand-drawn and was designed to feel both rich and approachable. Its generous curves and full, rounded strokes evoke abundance and indulgence, while its finer lines bring balance and a quiet sense of elegance.
                </p>
              </FadeInBlock>
            </div>
            <FadeInBlock delay={0.2} className="w-full">
              <MediaClip>
                <video
                  src="https://res.cloudinary.com/df2kod03a/video/upload/v1774527159/Archipel_logo_by_Adrien_Denis-Pasquier4_lcp5gb.mp4"
                  autoPlay loop muted playsInline
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={noSelect}
                />
              </MediaClip>
            </FadeInBlock>
          </section>

          {/* ── Section 3: Fonts and Colors + book image ── */}
          <section className="w-full flex flex-col gap-8 md:gap-12" style={{ marginBottom: sectionGap }}>
            <div className="w-full md:w-1/2">
              <FadeInBlock delay={0}>
                <h2 className="tracking-tight">Fonts and Colors</h2>
              </FadeInBlock>
              <FadeInBlock delay={0.1}>
                <p className="text-[14px] leading-[1.4] opacity-90 mt-4">
                  The online delicatessen was conceived as a gallery for quality goods, refined, yet inviting. It needed to create contrast without ever feeling cold or distant.
                </p>
                <p className="text-[14px] leading-[1.4] opacity-90 mt-4">
                  A palette of warm, luminous tones was chosen: <b>ivory and light beige</b> form a soft, neutral base, while earthy accents, <b>terracotta</b>, reminiscent of traditional tomette tiles, bring depth and warmth. The overall atmosphere evokes a sunlit summer terrace, where everything feels calm and generous.
                </p>
                <p className="text-[14px] leading-[1.4] opacity-90 mt-4">
                  For typography, <b>Acumin Pro</b> was selected as the primary typeface for titles and body text, ensuring clarity and structure. <b>Ivy Presto</b> complements it for product names and more expressive, narrative elements, adding character and a touch of refinement. Together, they create a harmonious dialogue with the visuals and the logo—both functional and sensorial.
                </p>
              </FadeInBlock>
            </div>
            <FadeInBlock delay={0.2} className="w-full">
              <MediaClip>
                <img
                  src="https://res.cloudinary.com/df2kod03a/image/upload/v1774276283/Archipel_by_Adrien_Denis-Pasquier_book_yhjllp.jpg"
                  alt={currentFolder.title}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={noSelect}
                />
              </MediaClip>
            </FadeInBlock>
          </section>

          {/* ── Section 4: Designing a Getaway + macbook video ── */}
          <section className="w-full flex flex-col gap-8 md:gap-12" style={{ marginBottom: sectionGap }}>
            <div className="w-full md:w-1/2">
              <FadeInBlock delay={0}>
                <h2 className="tracking-tight">Designing a Getaway</h2>
              </FadeInBlock>
              <FadeInBlock delay={0.1}>
                <p className="text-[14px] leading-[1.4] opacity-90 mt-4">
                  The goal was to transform an online delicatessen into an atmospheric space. The platform was not meant to feel transactional, but immersive. Every visual decision supported that intention.
                </p>
              </FadeInBlock>
            </div>
            <FadeInBlock delay={0.2} className="w-full">
              <MediaClip>
                <video
                  src="https://res.cloudinary.com/df2kod03a/video/upload/v1774431517/MacBook_Archipel_by_Adrien_Denis-Pasquier_tpu1hv.mp4"
                  autoPlay loop muted playsInline
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={noSelect}
                />
              </MediaClip>
            </FadeInBlock>
          </section>

          {/* ── Section 5: Innocent Lines + doodles video ── */}
          <section className="w-full flex flex-col gap-8 md:gap-12" style={{ marginBottom: sectionGap }}>
            <div className="w-full md:w-1/2">
              <FadeInBlock delay={0}>
                <h2 className="tracking-tight">Innocent Lines</h2>
              </FadeInBlock>
              <FadeInBlock delay={0.1}>
                <p className="text-[14px] leading-[1.4] opacity-90 mt-4">
                  Funny, tender, and full of soul, Archipel's "doodles" began as simple eye-catchers but quickly grew a true language of expression.
                </p>
                <p className="text-[14px] leading-[1.4] opacity-90 mt-4">
                  Over time, they found their way beyond the screen, appearing on prints, flyers, and postcards. What started as a playful detail has become a defining feature of Archipel's identity—something people recognize, connect with, and carry with them.
                </p>
              </FadeInBlock>
            </div>
            <FadeInBlock delay={0.2} className="w-full">
              <MediaClip>
                <video
                  src="https://res.cloudinary.com/df2kod03a/video/upload/v1774426403/phones_illus_by_Adrien_Denis-Pasquier3_peufyl.mp4"
                  autoPlay loop muted playsInline
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={noSelect}
                />
              </MediaClip>
            </FadeInBlock>
          </section>

          {/* ── Section 6: Portraying Food + gif ── */}
          <section className="w-full flex flex-col gap-8 md:gap-12" style={{ marginBottom: sectionGap }}>
            <div className="w-full md:w-1/2">
              <FadeInBlock delay={0}>
                <h2 className="tracking-tight">Portraying Food</h2>
              </FadeInBlock>
              <FadeInBlock delay={0.1}>
                <p className="text-[14px] leading-[1.4] opacity-90 mt-4">{photographyText}</p>
              </FadeInBlock>
            </div>
            <FadeInBlock delay={0.2} className="w-full">
              <MediaClip>
                <img
                  src="https://res.cloudinary.com/df2kod03a/image/upload/v1774426105/Bookb_biadhp.gif"
                  alt={currentFolder.title}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={noSelect}
                />
              </MediaClip>
            </FadeInBlock>
          </section>

          {/* ── Standalone full-width media ── */}
          <section className="w-full" style={{ marginBottom: sectionGap }}>
            <FadeInBlock delay={0} className="w-full">
              <MediaClip>
                <img
                  src="https://res.cloudinary.com/df2kod03a/image/upload/v1774535905/posters_wwsq9m.jpg"
                  alt="Archipel by Adrien Denis-Pasquier"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={noSelect}
                />
              </MediaClip>
            </FadeInBlock>
          </section>

          <section className="w-full" style={{ marginBottom: sectionGap }}>
            <FadeInBlock delay={0} className="w-full">
              <MediaClip>
                <img
                  src="https://res.cloudinary.com/df2kod03a/image/upload/v1774270286/phones_copie_udq4rq.jpg"
                  alt="Archipel by Adrien Denis-Pasquier"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={noSelect}
                />
              </MediaClip>
            </FadeInBlock>
          </section>

          <section className="w-full" style={{ marginBottom: sectionGap }}>
            <FadeInBlock delay={0} className="w-full">
              <MediaClip>
                <img
                  src="https://res.cloudinary.com/df2kod03a/image/upload/v1774536517/Large_Fence_Banner_Archipel_by_Adrien_Denis-Pasquier_olv994.jpg"
                  alt="Archipel by Adrien Denis-Pasquier"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={noSelect}
                />
              </MediaClip>
            </FadeInBlock>
          </section>

          <section className="w-full" style={{ marginBottom: sectionGap }}>
            <FadeInBlock delay={0} className="w-full">
              <MediaClip>
                <video
                  src="https://res.cloudinary.com/df2kod03a/video/upload/v1774780131/Linen_bag_ybryd5.mp4"
                  autoPlay loop muted playsInline
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={noSelect}
                />
              </MediaClip>
            </FadeInBlock>
          </section>
        </div>
      </BrandDesignPasswordGate>
    </>
  );
}

// ─── Dispatcher ────────────────────────────────────────────────────────────
export default function BrandIdentityFolder() {
  const { slug } = useParams();

  if (slug === "archipel") return <ArchipelProject />;
  if (slug === "naya-films") return <StubProject slug="naya-films" />;
  if (slug === "albatross-og-venner") return <StubProject slug="albatross-og-venner" />;
  if (slug === "albatross-bakery") return <StubProject slug="albatross-bakery" />;
  if (slug === "worldesters") return <StubProject slug="worldesters" />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl mb-4">Project not found</h1>
      <Link to="/brand-design" className="text-gray-600 hover:text-black">
        Back to Brand Design
      </Link>
    </div>
  );
}
