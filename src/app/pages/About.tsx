import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { ScrollIndicator } from "../components/ScrollIndicator";
import { SEO } from "../components/SEO";
import portraitImage from "figma:asset/e2ba8a312a67517ad80ca9c56c5f2bec09bcc98c.png";

export default function About() {
  const navigate = useNavigate();


  return (
    <>
      <SEO
        title="About - Adrien Denis-Pasquier | Multidisciplinary Creative in Berlin"
        description="Multidisciplinary creative based in Berlin working across illustration, photography, graphic design and visual direction. Specializing in visual identity, art direction, set design, and editorial illustration."
        type="profile"
        keywords={['about photographer', 'about illustrator', 'Berlin creative', 'visual identity designer', 'art director', 'set designer', 'creative director Berlin']}
      />
      <div className="min-h-full pt-[calc(var(--header-height)+4rem)] pb-20 bg-[#d5d0bb]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full px-[2%]"
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Column - Sticky */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-[400px] flex-shrink-0"
            >
              <div className="lg:sticky lg:top-24">
                <img
                  src={portraitImage}
                  alt="Portrait of Adrien Denis-Pasquier - Photographer, Illustrator and Graphic Designer based in Berlin"
                  className="w-full h-auto object-cover mb-8"
                />

                {/* Skills List */}
                <div className="text-right text-[#000000]">
                  <h1 className="text-[20px] uppercase mb-4">Practice</h1>
                  <div className="text-[15px] whitespace-pre-line">
                    {`Visual Identity & Brand Design
Art Direction
Illustration (Editorial & Conceptual)
Photography (Product & Atmosphere)
Set Design & Visual Staging
Graphic Design (Print & Digital)
Layout & Typography
Poster & Publication Design
Visual Systems Development
Creative Direction & Concept Development`}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Scrollable with custom scrollbar */}
            <div className="flex-1 relative flex gap-8">
              {/* Custom scroll indicator */}
              <ScrollIndicator />

              {/* Text content */}
              <h5 className="font-serif flex-1 space-y-6 text-[#000000] whitespace-pre-line leading-[1.3] text-[50px]">
                {`I am a multidisciplinary creative working across illustration, photography, graphic design and visual direction based in Berlin.

My work moves between mediums, developing visual languages that can unfold across print and digital spaces. Whether designing identities, creating editorial illustrations or photographing products, I'm interested in revealing what defines a subject visually while shaping a coherent atmosphere around it.

Over time, my approach has evolved toward reduction and clarity. I tend to trust simplicity — allowing fewer elements to carry more meaning — while balancing intuition with careful attention to composition and structure.

Rather than focusing on a single discipline, I work transversally, letting each medium inform the other. This way of working allows projects to grow as complete systems, where image, typography and narrative resonate together.

I'm drawn to processes that combine thoughtful direction with hands-on experimentation, and to collaborations where structure and spontaneity can coexist.`}
              </h5>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}