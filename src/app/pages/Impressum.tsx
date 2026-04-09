import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function Impressum() {
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  
  // All text content
  const sections = [
    {
      title: "Angaben gemäß § 5 TMG",
      content: "Adrien Denis-Pasquier Freelance Creative"
    },
    {
      title: "Kontakt",
      content: "E-Mail: adriendenispasquier@gmail.com Instagram: @mr_w_cat"
    },
    {
      title: "Verantwortlich für den Inhalt",
      content: "Adrien Denis-Pasquier E-Mail: adriendenispasquier@gmail.com"
    },
    {
      title: "Haftungsausschluss",
      subsections: [
        {
          subtitle: "Haftung für Inhalte",
          content: "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich."
        },
        {
          subtitle: "Haftung für Links",
          content: "Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich."
        },
        {
          subtitle: "Urheberrecht",
          content: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. © 2026 Adrien Denis-Pasquier. Alle Rechte vorbehalten."
        }
      ]
    },
    {
      title: "Datenschutz",
      content: "Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis."
    }
  ];
  
  // Count total words
  let totalWords = 0;
  sections.forEach(section => {
    totalWords += section.title.split(/\s+/).length;
    if (section.content) {
      totalWords += section.content.split(/\s+/).length;
    }
    if (section.subsections) {
      section.subsections.forEach(sub => {
        totalWords += sub.subtitle.split(/\s+/).length;
        totalWords += sub.content.split(/\s+/).length;
      });
    }
  });
  
  // Animate word reveal on mount
  useEffect(() => {
    let currentCount = 0;
    const interval = setInterval(() => {
      currentCount += 3; // Reveal 3 words at a time
      setVisibleWordCount(currentCount);
      
      if (currentCount >= totalWords) {
        clearInterval(interval);
      }
    }, 50); // Every 50ms
    
    return () => clearInterval(interval);
  }, [totalWords]);
  
  // Helper to render animated words
  const renderAnimatedText = (text: string, startIndex: number) => {
    return text.split(/\s+/).map((word, index) => {
      const globalIndex = startIndex + index;
      const isVisible = globalIndex < visibleWordCount;
      
      return (
        <motion.span
          key={`${startIndex}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="inline-block mr-[0.35em]"
        >
          {word}
        </motion.span>
      );
    });
  };
  
  return (
    <div className="min-h-full py-16">
      <div className="px-[2%] py-24 max-w-6xl mx-auto">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="tracking-tight text-[28px] uppercase mb-12">
              Impressum
            </h1>
          </motion.div>

          <div className="space-y-8 text-[22px] md:text-[28px] text-[#000000]">
            {(() => {
              let wordIndex = 0;
              
              return sections.map((section, sIndex) => {
                const titleStartIndex = wordIndex;
                wordIndex += section.title.split(/\s+/).length;
                
                return (
                  <div key={sIndex}>
                    <h2 className="text-[28px] md:text-[36px] mb-2 uppercase">
                      {renderAnimatedText(section.title, titleStartIndex)}
                    </h2>
                    
                    {section.content && (() => {
                      const contentStartIndex = wordIndex;
                      wordIndex += section.content.split(/\s+/).length;
                      
                      return (
                        <p>
                          {renderAnimatedText(section.content, contentStartIndex)}
                        </p>
                      );
                    })()}
                    
                    {section.subsections && (
                      <div className="space-y-4">
                        {section.subsections.map((sub, subIndex) => {
                          const subtitleStartIndex = wordIndex;
                          wordIndex += sub.subtitle.split(/\s+/).length;
                          const subContentStartIndex = wordIndex;
                          wordIndex += sub.content.split(/\s+/).length;
                          
                          return (
                            <div key={subIndex}>
                              <h3 className="text-[24px] md:text-[32px] mb-1 font-medium">
                                {renderAnimatedText(sub.subtitle, subtitleStartIndex)}
                              </h3>
                              <p>
                                {renderAnimatedText(sub.content, subContentStartIndex)}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}