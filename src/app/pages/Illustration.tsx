import { Link } from "react-router";
import { useMemo } from "react";
import { motion } from "motion/react";
import { illustrationData } from "../data/illustration-data";
import { SEO } from "../components/SEO";

export default function Illustration() {
  const folders = useMemo(() => [
    {
      slug: "archipel",
      title: "Archipel Doodles",
      description: "Illustration · archipel.berlin",
      thumbnail: illustrationData["archipel"].cover || illustrationData["archipel"].illustrations[0]?.src,
    },
    {
      slug: "cyberleaders",
      title: "Cyberleaders",
      description: "Illustration · Futuristic tech portraits",
      thumbnail: illustrationData["cyberleaders"].cover || illustrationData["cyberleaders"].illustrations[0]?.src,
    },
    {
      slug: "rocket-wine",
      title: "Rocket Wine",
      description: "Illustration · Wine label & packaging",
      thumbnail: illustrationData["rocket-wine"].cover || illustrationData["rocket-wine"].illustrations[0]?.src,
    },
  ], []);

  return (
    <>
      <SEO
        title="Illustration - Adrien Denis-Pasquier | Editorial & Conceptual Artwork"
        description="Explore my illustration work including Archipel doodles, Cyberleaders futuristic portraits, and Rocket Wine packaging designs. Digital and editorial illustration from Berlin."
        keywords={['illustration', 'editorial illustration', 'conceptual illustration', 'digital art', 'Cyberleaders', 'Rocket Wine', 'Berlin illustrator']}
      />

      <div className="pt-[calc(var(--header-height)+2rem)] pb-20 px-[2%]">
        {/* <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[clamp(40px,7vw,96px)] leading-[0.9] tracking-tight font-normal text-[#0F0F0F] mb-10 md:mb-14"
        >
          Illustration
        </motion.h1> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {folders.map((folder, index) => (
            <motion.div
              key={folder.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link to={`/illustration/${folder.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden mb-3">
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
