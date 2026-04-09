import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function AGBs() {
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  
  // All text content
  const sections = [
    {
      title: "1. Geltungsbereich",
      content: "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Aufträge und Leistungen von Adrien Denis-Pasquier (nachfolgend \"Auftragnehmer\") im Bereich Fotografie, Illustration und Grafikdesign. Sie gelten gegenüber Unternehmern, juristischen Personen des öffentlichen Rechts oder öffentlich-rechtlichen Sondervermögen."
    },
    {
      title: "2. Vertragsabschluss",
      content: "Der Vertrag kommt durch die Annahme des Angebots durch den Auftraggeber zustande. Mündliche Nebenabreden bestehen nicht. Änderungen und Ergänzungen bedürfen zu ihrer Wirksamkeit der Schriftform."
    },
    {
      title: "3. Leistungsumfang",
      content: "Der Umfang der zu erbringenden Leistungen ergibt sich aus der Leistungsbeschreibung im Angebot. Nachträgliche Änderungen des Leistungsinhalts bedürfen der schriftlichen Bestätigung. Mehr- oder Minderaufwand wird gesondert berechnet."
    },
    {
      title: "4. Vergütung und Zahlung",
      content: "Die Vergütung ergibt sich aus dem Angebot. Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer. Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zur Zahlung fällig. Bei Zahlungsverzug werden Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz berechnet."
    },
    {
      title: "5. Urheberrecht und Nutzungsrechte",
      paragraphs: [
        "Der Auftragnehmer behält sich alle Urheber- und Nutzungsrechte an den erstellten Werken vor. Die Übertragung von Nutzungsrechten erfolgt nur im vereinbarten Umfang und nach vollständiger Bezahlung der Vergütung.",
        "Die Werke dürfen ohne ausdrückliche Zustimmung des Auftragnehmers nicht verändert, bearbeitet oder für andere als die vereinbarten Zwecke verwendet werden.",
        "Der Auftraggeber verpflichtet sich, bei jeder Veröffentlichung den Namen des Auftragnehmers zu nennen, sofern nicht anders vereinbart."
      ]
    },
    {
      title: "6. Korrektur und Abnahme",
      content: "Der Auftraggeber hat das Recht, innerhalb einer vereinbarten Frist Korrekturwünsche zu äußern. Nach der Abnahme oder nach Ablauf der Korrekturfrist gilt die Leistung als genehmigt. Weitere Änderungen werden gesondert berechnet."
    },
    {
      title: "7. Mitwirkungspflichten",
      content: "Der Auftraggeber stellt alle notwendigen Informationen, Materialien und Unterlagen rechtzeitig zur Verfügung. Verzögerungen durch nicht rechtzeitig zur Verfügung gestellte Informationen gehen zu Lasten des Auftraggebers."
    },
    {
      title: "8. Haftung",
      content: "Der Auftragnehmer haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem Verhalten beruhen. Die Haftung ist auf den vorhersehbaren, vertragstypischen Schaden begrenzt."
    },
    {
      title: "9. Geheimhaltung",
      content: "Beide Vertragsparteien verpflichten sich, alle im Rahmen der Zusammenarbeit bekannt gewordenen vertraulichen Informationen geheim zu halten."
    },
    {
      title: "10. Schlussbestimmungen",
      content: "Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt."
    }
  ];
  
  // Count total words
  let totalWords = 0;
  sections.forEach(section => {
    totalWords += section.title.split(/\s+/).length;
    if (section.content) {
      totalWords += section.content.split(/\s+/).length;
    }
    if (section.paragraphs) {
      section.paragraphs.forEach(para => {
        totalWords += para.split(/\s+/).length;
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
              Allgemeine Geschäftsbedingungen
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
                    
                    {section.paragraphs && (
                      <div className="space-y-4">
                        {section.paragraphs.map((para, pIndex) => {
                          const paraStartIndex = wordIndex;
                          wordIndex += para.split(/\s+/).length;
                          
                          return (
                            <p key={pIndex}>
                              {renderAnimatedText(para, paraStartIndex)}
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              });
            })()}
            
            <div className="pt-8 border-t border-gray-200">
              <p className="text-[14px] md:text-[18px] opacity-60">Stand: Februar 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}