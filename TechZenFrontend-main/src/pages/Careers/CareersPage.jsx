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
        title="Careers & Software Jobs in Chhatarpur | TechZen"
        description="Explore software engineering jobs and internships at TechZen, the leading IT company in Chhatarpur, MP. Work on live enterprise web and cloud systems."
        ogDescription="Explore developer jobs and software internships at TechZen in Chhatarpur, Madhya Pradesh."
        keywords="software jobs in chhatarpur, IT company in chhatarpur, software internship chhatarpur, developer hiring chhatarpur, techzen careers"
        canonicalPath="/careers"
      />
      <Careers isStandalonePage={true} />
    </>
  );
}
