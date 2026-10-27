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
        description="Discover career opportunities at TechZen. Join our high-performance engineering team building modern web apps, cloud systems, and innovative digital solutions."
        keywords="TechZen careers, tech jobs, software developer openings, frontend jobs, backend developer hiring"
        canonicalPath="/careers"
      />
      <Careers isStandalonePage={true} />
    </>
  );
}
