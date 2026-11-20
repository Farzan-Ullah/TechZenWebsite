import styles from "./Outsourcing.module.css";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Scoping",
    desc: "Architecture analysis, tech stack selection, milestone roadmap, and formal mutual NDA execution."
  },
  {
    step: "02",
    title: "Sprint Planning",
    desc: "User story definition, backlog grooming, interactive UI/UX wireframes, and database schema modeling."
  },
  {
    step: "03",
    title: "Agile Development",
    desc: "Iterative two-week sprints, modular clean code conventions, Git branch workflows, and daily status syncs."
  },
  {
    step: "04",
    title: "QA & Security Audits",
    desc: "Automated regression tests, responsive QA, end-to-end API stress tests, and security vulnerability scans."
  },
  {
    step: "05",
    title: "Deployment & Support",
    desc: "Automated CI/CD cloud release, production monitoring, documentation handover, and guaranteed SLA support."
  }
];

export default function DevelopmentProcess() {
  return (
    <section className={styles.processSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Our Structured Development & Delivery Process
          </h2>
          <p className={styles.sectionSubtitle}>
            A disciplined, agile engineering framework designed to deliver predictable milestones,
            high code quality, and total transparency from day one.
          </p>
        </div>

        <div className={styles.timelineGrid}>
          {PROCESS_STEPS.map((item) => (
            <div key={item.step} className={styles.timelineCard}>
              <div className={styles.timelineBadge}>{item.step}</div>
              <h4 className={styles.timelineStepTitle}>{item.title}</h4>
              <p className={styles.timelineStepDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
