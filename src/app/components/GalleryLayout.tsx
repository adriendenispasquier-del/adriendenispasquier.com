import { motion } from "motion/react";
import { ScrollIndicator } from "./ScrollIndicator";
import { ReactNode } from "react";

interface GalleryLayoutProps {
  backLink: string;
  backLabel: string;
  title: string;
  subtitle?: string;
  description: string;
  credits?: {
    featuring?: string;
    products?: string | { name: string; url: string }[];
  };
  isDark?: boolean;
  children: ReactNode;
  nextProjectLink?: string;
}

export function GalleryLayout({
  backLink,
  backLabel,
  title,
  subtitle,
  description,
  credits,
  isDark = false,
  children,
  nextProjectLink,
}: GalleryLayoutProps) {
  const textColor = isDark ? "text-white" : "text-black";
  const bgColor = isDark ? "bg-black" : "";

  // Parse markdown-style links in description [text](url)
  const parseDescription = (text: string) => {
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-70 transition-opacity"
            style={{ cursor: 'none' }}
          >
            {linkText}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className={`px-[2%] pt-[calc(var(--header-height)+4rem)] pb-20 min-h-screen ${bgColor}`}>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* LEFT COLUMN - STICKY TEXT */}
        <div className="hidden lg:block w-1/3">
          <div className="sticky top-24 space-y-4">
            {subtitle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className={`text-[16px] ${textColor}`}>
                  {subtitle}
                </h3>
              </motion.div>
            )}

            {/* Separator line */}
            <div className={`w-full h-[1px] ${isDark ? 'bg-white' : 'bg-black'}`} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className={`${textColor} text-[14px] whitespace-pre-line leading-snug`}>
                {parseDescription(description)}
              </p>
            </motion.div>

            {credits && (
              <>
                {credits.featuring && (
                  <>
                    <div className="space-y-2">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <h2 className={`text-[20px] ${textColor}`}>Featuring</h2>
                      </motion.div>

                      {/* Separator line */}
                      <div className={`w-full h-[1px] ${isDark ? 'bg-white' : 'bg-black'}`} />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <p className={`${textColor} text-[14px] leading-snug`}>
                        {credits.featuring}
                      </p>
                    </motion.div>
                  </>
                )}

                {credits.products && (
                  <>
                    <div className="space-y-2">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <h2 className={`text-[20px] ${textColor}`}>Products</h2>
                      </motion.div>

                      {/* Separator line */}
                      <div className={`w-full h-[1px] ${isDark ? 'bg-white' : 'bg-black'}`} />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      {typeof credits.products === 'string' ? (
                        <p className={`${textColor} text-[14px] leading-snug`}>
                          {credits.products}
                        </p>
                      ) : (
                        <p className={`${textColor} text-[14px] leading-snug`}>
                          {credits.products.map((product, index) => (
                            <span key={index}>
                              <a
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:opacity-70 transition-opacity"
                                style={{ cursor: 'none' }}
                              >
                                {product.name}
                              </a>
                              {index < credits.products.length - 1 && ', '}
                            </span>
                          ))}
                        </p>
                      )}
                    </motion.div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* MOBILE TEXT - NOT STICKY */}
        <div className="block lg:hidden w-full mb-6 space-y-4">
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className={`text-[16px] ${textColor}`}>
                {subtitle}
              </h3>
            </motion.div>
          )}

          {/* Separator line */}
          <div className={`w-full h-[1px] ${isDark ? 'bg-white' : 'bg-black'}`} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className={`${textColor} text-[14px] whitespace-pre-line leading-snug`}>
              {parseDescription(description)}
            </p>
          </motion.div>

          {credits && (
            <>
              {credits.featuring && (
                <>
                  <div className="space-y-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <h2 className={`text-[20px] ${textColor}`}>Featuring</h2>
                    </motion.div>

                    {/* Separator line */}
                    <div className={`w-full h-[1px] ${isDark ? 'bg-white' : 'bg-black'}`} />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <p className={`${textColor} text-[14px] leading-snug`}>
                      {credits.featuring}
                    </p>
                  </motion.div>
                </>
              )}

              {credits.products && (
                <>
                  <div className="space-y-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <h2 className={`text-[20px] ${textColor}`}>Products</h2>
                    </motion.div>

                    {/* Separator line */}
                    <div className={`w-full h-[1px] ${isDark ? 'bg-white' : 'bg-black'}`} />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {typeof credits.products === 'string' ? (
                      <p className={`${textColor} text-[14px] leading-snug`}>
                        {credits.products}
                      </p>
                    ) : (
                      <p className={`${textColor} text-[14px] leading-snug`}>
                        {credits.products.map((product, index) => (
                          <span key={index}>
                            <a
                              href={product.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:opacity-70 transition-opacity"
                              style={{ cursor: 'none' }}
                            >
                              {product.name}
                            </a>
                            {index < credits.products.length - 1 && ', '}
                          </span>
                        ))}
                      </p>
                    )}
                  </motion.div>
                </>
              )}
            </>
          )}
        </div>

        {/* RIGHT COLUMN - GALLERY WITH SCROLL INDICATOR */}
        <div className="relative flex gap-8 w-full lg:w-[55%] lg:ml-auto">
          <ScrollIndicator isDark={isDark} />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
