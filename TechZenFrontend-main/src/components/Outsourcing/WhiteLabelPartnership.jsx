import {
  FileCheck2,
  FolderGit2,
  Code2,
  CheckCheck,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import styles from "./Outsourcing.module.css";

const WORKFLOW_STEPS = [
  {
    step: "01",
    icon: FileCheck2,
    title: "Client Agreement",
    desc: "Your agency secures contracts and defines project scope directly with your client."
  },
  {
    step: "02",
    icon: FolderGit2,
    title: "Requirements Handover",
    desc: "You brief TechZen on architectural specs, designs, and delivery timelines under NDA."
  },
  {
    step: "03",
    icon: Code2,
    title: "White-Label Execution",
    desc: "Our engineers build, test, and document the code strictly behind your agency brand."
  },
  {
    step: "04",
    icon: CheckCheck,
    title: "Review & Quality QA",
    desc: "Your internal tech leads review milestones, pull requests, and staging environments."
  },
  {
    step: "05",
    icon: Rocket,
    title: "Seamless Client Delivery",
    desc: "You deliver production-ready software to your client with 100% agency credit."
  }
];

const BENEFITS = [
  "100% Confidentiality & Mutual NDA signed prior to discussion",
  "Complete Intellectual Property (IP) ownership transferred to you",
  "Zero contact with your clients — your agency owns the relationship",
  "Transparent sprint tracking with access to private Git repositories",
  "Healthy agency margins with predictable, transparent outsourcing rates",
  "Scale your agency's capacity instantly without hiring permanent staff"
];

export default function WhiteLabelPartnership() {
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const formEl = document.getElementById("partnership-enquiry");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.whiteLabelSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrowBadge}>WHITE-LABEL COLLABORATION</div>
          <h2 className={styles.sectionTitle}>
            White-Label Development Partnerships for Digital Agencies & Consultancies
          </h2>
          <p className={styles.sectionSubtitle}>
            Deliver exceptional software to your clients under your own agency brand.
            TechZen operates seamlessly as your dedicated backend technology delivery engine.
          </p>
        </div>

        {/* 5-Step Workflow Box */}
        <div className={styles.workflowBox}>
          <h3 className={styles.workflowHeading}>
            How Our White-Label Partnership Operates
          </h3>
          <div className={styles.workflowTrack}>
            {WORKFLOW_STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className={styles.workflowStep}>
                  <div className={styles.stepIconCircle}>
                    <Icon size={24} />
                  </div>
                  <span className={styles.stepNumber}>Step {item.step}</span>
                  <h4 className={styles.stepTitle}>{item.title}</h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Split: Benefits Checklist & NDA Callout */}
        <div className={styles.whiteLabelSplit}>
          <div className={styles.benefitsList}>
            {BENEFITS.map((benefit, idx) => (
              <div key={idx} className={styles.benefitItem}>
                <CheckCircle2 size={18} className={styles.benefitCheck} />
                <span className={styles.benefitText}>{benefit}</span>
              </div>
            ))}
          </div>

          {/* NDA Disclaimer Card */}
          <div className={styles.ndaCalloutCard}>
            <div className={styles.ndaHeader}>
              <ShieldCheck size={24} />
              <span>Strict Non-Disclosure Guarantee</span>
            </div>
            <p className={styles.ndaText}>
              We execute comprehensive mutual NDAs before reviewing any client briefs,
              proprietary design assets, or technical architectures. We never contact your end-clients,
              publish your projects publicly, or claim ownership over your software.
            </p>
            <a
              href="#partnership-enquiry"
              onClick={handleScrollToForm}
              className={styles.ndaActionBtn}
            >
              <span>Explore Agency Partnership</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
