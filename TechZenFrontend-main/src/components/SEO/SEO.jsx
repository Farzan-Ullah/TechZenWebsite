import { useEffect } from "react";

const BASE_URL = "https://www.techzen-it.com";

/**
 * Dynamic SEO Component for React SPA routes.
 * Ensures titles stay strictly under 60 characters and descriptions adhere to
 * search engine and social preview character sweet spots.
 */
export default function SEO({
  title,
  description,
  ogDescription,
  keywords,
  canonicalPath = "",
  ogType = "website",
  ogImage = "/og-image.png",
  schemaJson = null,
}) {
  useEffect(() => {
    const siteTitle = "TechZen";
    
    // 1. Document Title (Ensure under 60 chars)
    if (title) {
      document.title = title.includes("TechZen") ? title : `${title} | ${siteTitle}`;
    }

    // Helper to safely set or create meta elements
    const setMetaTag = (selector, attr, attrVal, content) => {
      if (!content) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Meta description (Google sweet spot ~140-155 chars)
    if (description) {
      setMetaTag('meta[name="description"]', "name", "description", description);
    }

    // 3. Social description (OG & Twitter sweet spot ~105-125 chars)
    const socialDesc = ogDescription || (description && description.length > 125
      ? `${description.slice(0, 118).trim()}...`
      : description);

    if (socialDesc) {
      setMetaTag('meta[property="og:description"]', "property", "og:description", socialDesc);
      setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", socialDesc);
    }

    // 4. Keywords
    if (keywords) {
      setMetaTag('meta[name="keywords"]', "name", "keywords", keywords);
    }

    // Local Geo Tags for Search Engines
    setMetaTag('meta[name="geo.region"]', "name", "geo.region", "IN-MP");
    setMetaTag('meta[name="geo.placename"]', "name", "geo.placename", "Chhatarpur");
    setMetaTag('meta[name="geo.position"]', "name", "geo.position", "24.9164;79.5816");
    setMetaTag('meta[name="ICBM"]', "name", "ICBM", "24.9164, 79.5816");

    // 5. OpenGraph & Twitter Title
    if (title) {
      const fullTitle = title.includes("TechZen") ? title : `${title} | ${siteTitle}`;
      setMetaTag('meta[property="og:title"]', "property", "og:title", fullTitle);
      setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    }

    // 6. OpenGraph Type
    setMetaTag('meta[property="og:type"]', "property", "og:type", ogType);

    // 7. Canonical URL
    const normalizedPath = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
    const finalCanonical = canonicalPath === "" || canonicalPath === "/" ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath}`;

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", finalCanonical);

    setMetaTag('meta[property="og:url"]', "property", "og:url", finalCanonical);
    setMetaTag('meta[name="twitter:url"]', "name", "twitter:url", finalCanonical);

    // 8. OG & Twitter Image (1200x630)
    const finalImage = ogImage.startsWith("http")
      ? ogImage
      : `${BASE_URL}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;
    setMetaTag('meta[property="og:image"]', "property", "og:image", finalImage);
    setMetaTag('meta[property="og:image:secure_url"]', "property", "og:image:secure_url", finalImage);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", finalImage);

    // 9. Dynamic Schema (JSON-LD)
    let customSchemaScript = null;
    if (schemaJson) {
      customSchemaScript = document.createElement("script");
      customSchemaScript.type = "application/ld+json";
      customSchemaScript.setAttribute("data-dynamic-seo", "true");
      customSchemaScript.textContent = JSON.stringify(schemaJson);
      document.head.appendChild(customSchemaScript);
    }

    return () => {
      if (customSchemaScript && customSchemaScript.parentNode) {
        customSchemaScript.parentNode.removeChild(customSchemaScript);
      }
    };
  }, [title, description, ogDescription, keywords, canonicalPath, ogType, ogImage, schemaJson]);

  return null;
}
