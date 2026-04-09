import { Link } from "react-router";
import { useMemo } from "react";
import { motion } from "motion/react";
import { photographyData } from "../data/photography-data";
import { SEO } from "../components/SEO";

export default function Photography() {
  const folders = useMemo(() => [
    {
      slug: "archipel-berlin",
      title: "Archipel Berlin",
      description: "Product Photography · Set Design · 2019–2026",
      thumbnail: photographyData["archipel-berlin"].cover || photographyData["archipel-berlin"].photos[0]?.src,
    },
    {
      slug: "fat-cat",
      title: "Fat Cat",
      description: "Product Photography · Set Design · 2018–2020",
      thumbnail: photographyData["fat-cat"].cover || photographyData["fat-cat"].photos[0]?.src,
    },
  ], []);

  return (
    <>
      <SEO
        title="Photography - Adrien Denis-Pasquier | Product & Atmosphere Photography"
        description="Explore my photography and set design projects, including Archipel Berlin and Fat Cat, showcasing product photography from 2018 to 2026."
        keywords={['photography', 'set design', 'product photography', 'Archipel Berlin', 'Fat Cat', 'food photography', 'Berlin photographer']}
      />

      <div className="pt-[calc(var(--header-height)+2rem)] pb-20 px-[2%]">
        {/* <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[clamp(40px,7vw,96px)] leading-[0.9] tracking-tight font-normal text-[#0F0F0F] mb-10 md:mb-14"
        >
          Photography
        </motion.h1> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {folders.map((folder, index) => (
            <motion.div
              key={folder.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link to={`/photography/${folder.slug}`} className="group block">
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
