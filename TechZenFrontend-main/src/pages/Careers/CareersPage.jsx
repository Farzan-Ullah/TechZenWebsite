import { useEffect } from "react";
import Careers from "../../components/CareersSection/Careers";

export default function CareersPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Careers isStandalonePage={true} />
    </>
  );
}
