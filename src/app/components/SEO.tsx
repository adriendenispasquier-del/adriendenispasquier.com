import { useEffect } from "react";
import { useLocation } from "react-router";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "profile" | "article";
  keywords?: string[];
  canonicalBase?: string;
}

export function SEO({
  title = "Adrien Denis-Pasquier | Designer & Visual Director",
  description = "Multidisciplinary designer working across brand identity, photography and illustration. Crafting cohesive visual worlds rooted in light, texture and atmosphere.",
  image = "https://res.cloudinary.com/df2kod03a/image/upload/v1771498685/og-image_cbc3uv.jpg",
  type = "website",
  keywords = [
    "graphic designer",
    "brand identity",
    "art direction",
    "illustration",
    "photography",
    "Berlin",
    "creative portfolio",
    "visual director",
    "Adrien Denis-Pasquier",
    "photographer Berlin",
    "illustrator Berlin",
  ],
  canonicalBase = "https://www.adriendenispasquier.com",
}: SEOProps) {
  const location = useLocation();
  const url = `${canonicalBase}${location.pathname}`;

  useEffect(() => {
    document.title = title;

    const keywordsArray = Array.isArray(keywords) ? keywords : [];

    const upsertMeta = (key: string, content: string, isName = false) => {
      const attr = isName ? "name" : "property";
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;

      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }

      el.setAttribute("content", content);
    };

    // ✅ Force remove any noindex injected by the platform
    document.querySelectorAll('meta[name="robots"]').forEach(el => el.remove());
    document.querySelectorAll('meta[name="googlebot"]').forEach(el => el.remove());

    // Re-inject clean robots directives
    const robotsMeta = document.createElement("meta");
    robotsMeta.setAttribute("name", "robots");
    robotsMeta.setAttribute("content", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    document.head.insertBefore(robotsMeta, document.head.firstChild);

    const googlebotMeta = document.createElement("meta");
    googlebotMeta.setAttribute("name", "googlebot");
    googlebotMeta.setAttribute("content", "index, follow");
    document.head.insertBefore(googlebotMeta, document.head.firstChild);

    // Standard
    upsertMeta("description", description, true);
    upsertMeta("keywords", keywordsArray.join(", "), true);
    upsertMeta("author", "Adrien Denis-Pasquier", true);

    // Open Graph
    upsertMeta("og:title", title);
    upsertMeta("og:description", description);
    upsertMeta("og:image", image);
    upsertMeta("og:image:width", "1200");
    upsertMeta("og:image:height", "630");
    upsertMeta("og:image:alt", title);
    upsertMeta("og:url", url);
    upsertMeta("og:type", type);
    upsertMeta("og:site_name", "Adrien Denis-Pasquier");
    upsertMeta("og:locale", "en_US");

    // Twitter
    upsertMeta("twitter:card", "summary_large_image", true);
    upsertMeta("twitter:title", title, true);
    upsertMeta("twitter:description", description, true);
    upsertMeta("twitter:image", image, true);
    upsertMeta("twitter:image:alt", title, true);
    upsertMeta("twitter:creator", "@mr_w_cat", true);
    upsertMeta("twitter:site", "@mr_w_cat", true);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // JSON-LD (Person + CreativeWork)
    let ld = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      document.head.appendChild(ld);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": `${canonicalBase}/#person`,
          name: "Adrien Denis-Pasquier",
          url: canonicalBase,
          image: {
            "@type": "ImageObject",
            url: image,
            width: 1200,
            height: 630,
          },
          jobTitle: "Graphic Designer, Photographer & Illustrator",
          description,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Berlin",
            addressCountry: "DE",
          },
          sameAs: [
            "https://www.instagram.com/mr_w_cat/?hl=fr",
            canonicalBase,
          ],
          knowsAbout: keywordsArray,
        },
        {
          "@type": "WebSite",
          "@id": `${canonicalBase}/#website`,
          url: canonicalBase,
          name: "Adrien Denis-Pasquier",
          description,
          author: { "@id": `${canonicalBase}/#person` },
          inLanguage: "en-US",
        },
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: title,
          description,
          isPartOf: { "@id": `${canonicalBase}/#website` },
          about: { "@id": `${canonicalBase}/#person` },
          inLanguage: "en-US",
        },
      ],
    };

    ld.textContent = JSON.stringify(structuredData);
  }, [title, description, image, type, url, keywords, canonicalBase]);

  return null;
}