import { useEffect } from "react";

const BASE_URL = "https://www.techzen-it.com";

/**
 * Dynamic SEO Component for React SPA routes.
 * Dynamically updates document.title, meta tags (description, keywords, canonical, OG, Twitter),
 * and dynamically injects route-specific JSON-LD structured data.
 */
export default function SEO({
  title,
  description,
  keywords,
  canonicalPath = "",
  ogType = "website",
  ogImage = "/TechZenLogo.png",
  schemaJson = null,
}) {
  useEffect(() => {
    const siteTitle = "TechZen IT Consulting";
    
    // 1. Document Title
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

    // 2. Meta description
    if (description) {
      setMetaTag('meta[name="description"]', "name", "description", description);
      setMetaTag('meta[property="og:description"]', "property", "og:description", description);
      setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    }

    // 3. Keywords
    if (keywords) {
      setMetaTag('meta[name="keywords"]', "name", "keywords", keywords);
    }

    // 4. OpenGraph & Twitter Title
    if (title) {
      const fullTitle = title.includes("TechZen") ? title : `${title} | ${siteTitle}`;
      setMetaTag('meta[property="og:title"]', "property", "og:title", fullTitle);
      setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    }

    // 5. OpenGraph Type
    setMetaTag('meta[property="og:type"]', "property", "og:type", ogType);

    // 6. Canonical URL
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

    // 7. OG & Twitter Image
    const finalImage = ogImage.startsWith("http")
      ? ogImage
      : `${BASE_URL}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;
    setMetaTag('meta[property="og:image"]', "property", "og:image", finalImage);
    setMetaTag('meta[property="og:image:secure_url"]', "property", "og:image:secure_url", finalImage);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", finalImage);

    // 8. Dynamic Schema (JSON-LD)
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
  }, [title, description, keywords, canonicalPath, ogType, ogImage, schemaJson]);

  return null;
}
