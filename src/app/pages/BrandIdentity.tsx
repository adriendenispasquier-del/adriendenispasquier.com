import { Link } from "react-router";
import { useMemo } from "react";
import { motion } from "motion/react";
import { brandIdentityData } from "../data/brand-identity-data";
import { SEO } from "../components/SEO";

export default function BrandIdentity() {
  const folders = useMemo(() => [
    {
      slug: "archipel",
      title: "Archipel Berlin",
      description: "Brand Identity · Web Design · 2019–2026",
      thumbnail: brandIdentityData["archipel"]?.cover || brandIdentityData["archipel"]?.images[0]?.src,
    },
    {
      slug: "naya-films",
      title: "Naya Films",
      description: "Brand Identity · 2025",
      thumbnail: brandIdentityData["naya-films"]?.cover || brandIdentityData["naya-films"]?.images[0]?.src,
    },
    {
      slug: "albatross-og-venner",
      title: "Albatross og Venner",
      description: "Brand Identity · 2025",
      thumbnail: brandIdentityData["albatross-og-venner"]?.cover || brandIdentityData["albatross-og-venner"]?.images[0]?.src,
    },
    {
      slug: "albatross-bakery",
      title: "Albatross Bakery",
      description: "Brand Identity · 2025",
      thumbnail: brandIdentityData["albatross-bakery"]?.cover || brandIdentityData["albatross-bakery"]?.images[0]?.src,
    },
    {
      slug: "worldesters",
      title: "Worldesters",
      description: "Brand Identity · 2025",
      thumbnail: brandIdentityData["worldesters"]?.cover || brandIdentityData["worldesters"]?.images[0]?.src,
    },
  ], []);

  return (
    <>
      <SEO
        title="Brand Design - Adrien Denis-Pasquier | Visual Identity & Design Systems"
        description="Brand identity and visual design projects including logo design, typography systems and art direction. Multidisciplinary branding work based in Berlin."
        keywords={['brand design', 'visual identity', 'design systems', 'logo design', 'brand strategy']}
      />

      <div className="pt-[calc(var(--header-height)+2rem)] pb-20 px-[2%]">
        {/* <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[clamp(40px,7vw,96px)] leading-[0.9] tracking-tight font-normal text-[#0F0F0F] mb-10 md:mb-14"
        >
          Brand Design
        </motion.h1> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {folders.map((folder, index) => (
            <motion.div
              key={folder.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link to={`/brand-design/${folder.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden mb-3 bg-[#f0f0f0]">
                  {folder.thumbnail && (
                    <img
                      src={folder.thumbnail}
                      alt={folder.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  )}
                </div>
                <p className="text-sm font-normal text-[#0F0F0F]">{folder.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{folder.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
