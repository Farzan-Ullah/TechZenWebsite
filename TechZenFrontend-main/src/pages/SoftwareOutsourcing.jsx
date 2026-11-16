import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../components/SEO/SEO";
import OutsourcingHero from "../components/Outsourcing/OutsourcingHero";
import WhyPartnerSection from "../components/Outsourcing/WhyPartnerSection";
import DevelopmentCapabilities from "../components/Outsourcing/DevelopmentCapabilities";
import DedicatedTeamSection from "../components/Outsourcing/DedicatedTeamSection";
import WhiteLabelPartnership from "../components/Outsourcing/WhiteLabelPartnership";
import DevelopmentProcess from "../components/Outsourcing/DevelopmentProcess";
import OutsourcingPortfolio from "../components/Outsourcing/OutsourcingPortfolio";
import PartnershipEnquiryForm from "../components/Outsourcing/PartnershipEnquiryForm";
import OutsourcingCTA from "../components/Outsourcing/OutsourcingCTA";
import styles from "../components/Outsourcing/Outsourcing.module.css";

const SCHEMA_JSON = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "TechZen IT and HR Services LLC",
  "url": "https://www.techzen-it.com/software-development-outsourcing",
  "logo": "https://www.techzen-it.com/logo.png",
  "description":
    "Premier software development outsourcing and technology delivery partner. Dedicated engineering teams, full-stack web applications, SaaS platforms, and white-label subcontracting.",
  "telephone": "+919303878713",
  "email": "techzen432@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Near Saffron Lawn",
    "addressLocality": "Chhatarpur",
    "addressRegion": "Madhya Pradesh",
    "postalCode": "471001",
    "addressCountry": "IN"
  },
  "areaServed": [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Global"
  ],
  "priceRange": "$$",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Software Outsourcing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Dedicated Development Teams",
          "description":
            "Hire vetted full-stack, frontend, backend, and mobile developers on a flexible monthly engagement."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Web & SaaS Application Development",
          "description":
            "End-to-end agile software delivery with modern MERN stack, microservices, and cloud deployments."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "White-Label Development Partnerships",
          "description":
            "Subcontract software engineering under strict mutual NDA and 100% intellectual property transfer for digital agencies."
        }
      }
    ]
  }
};

export default function SoftwareOutsourcing() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 120);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash, location.pathname]);

  return (
    <div className={styles.pageWrap}>
      <SEO
        title="Software Development Outsourcing Partner | TechZen"
        description="Scale your engineering capacity with TechZen IT and HR Services. Reliable software development outsourcing, dedicated developer teams, and white-label partnerships."
        ogDescription="Hire dedicated development teams and outsource software engineering to TechZen IT and HR Services LLC. Flexible models, NDA protected, high-velocity delivery."
        keywords="software development outsourcing, outsource software development, hire dedicated developers, white-label software development, IT outsourcing India, dedicated engineering team, SaaS development partner, MERN stack outsourcing"
        canonicalPath="/software-development-outsourcing"
        ogType="website"
        schemaJson={SCHEMA_JSON}
      />

      {/* Section 1: Hero */}
      <OutsourcingHero />

      {/* Section 2: Why Partner */}
      <WhyPartnerSection />

      {/* Section 3: Development Capabilities */}
      <DevelopmentCapabilities />

      {/* Section 4: Dedicated Development Teams & Engagement Models */}
      <DedicatedTeamSection />

      {/* Section 5: White-Label Development Partnerships */}
      <WhiteLabelPartnership />

      {/* Section 6: Our Development Process */}
      <DevelopmentProcess />

      {/* Section 7: Relevant Portfolio & Proven Solutions Showcase */}
      <OutsourcingPortfolio />

      {/* Section 8: Partnership Enquiry Form */}
      <PartnershipEnquiryForm />

      {/* Section 9: Global Closing CTA */}
      <OutsourcingCTA />
    </div>
  );
}
