import { ArrowRight, Shield, Clock } from "lucide-react";
import styles from "./Outsourcing.module.css";

export default function OutsourcingCTA() {
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const formEl = document.getElementById("partnership-enquiry");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToCapabilities = (e) => {
    e.preventDefault();
    const capEl = document.getElementById("capabilities");
    if (capEl) {
      capEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.globalCtaSection}>
      <div className={styles.container}>
        <div className={styles.globalCtaCard}>
          <h2 className={styles.ctaMainHeading}>
            Ready to Scale Your Software Development Capabilities?
          </h2>

          <p className={styles.ctaMainDesc}>
            Partner with TechZen IT and HR Services LLC to build scalable web applications,
            deploy dedicated engineering pods, and accelerate project delivery with predictable quality.
          </p>

          <div className={styles.ctaActions}>
            <a
              href="#partnership-enquiry"
              onClick={handleScrollToForm}
              className={styles.primaryCta}
            >
              <span>Start Partnership Discussion</span>
              <ArrowRight size={16} />
            </a>

            <a
              href="#capabilities"
              onClick={handleScrollToCapabilities}
              className={styles.secondaryCta}
            >
              <span>Explore Capabilities</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
