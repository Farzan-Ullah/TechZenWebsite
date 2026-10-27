import { useEffect } from "react";
import Careers from "../../components/CareersSection/Careers";
import SEO from "../../components/SEO/SEO";

export default function CareersPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <SEO
        title="Careers & Engineering Opportunities | Join TechZen"
        description="Explore career opportunities at TechZen. Join our engineering team building scalable web apps, cloud systems, and AI solutions."
        ogDescription="Join TechZen's engineering team! Explore open developer roles and build modern cloud & web solutions."
        keywords="TechZen careers, tech jobs, software developer openings, frontend jobs, backend developer hiring"
        canonicalPath="/careers"
      />
      <Careers isStandalonePage={true} />
    </>
  );
}
