import styles from "./Outsourcing.module.css";

const PORTFOLIO_ITEMS = [
  {
    category: "Enterprise SaaS",
    metric: "60% Automation",
    title: "Multi-Tenant Enterprise ERP Suite",
    desc: "Designed and engineered an enterprise cloud ERP system featuring modular inventory management, financial reporting, automated invoicing, and granular RBAC across multi-warehouse locations.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Microservices"]
  },
  {
    category: "B2B Web Platform",
    metric: "99.9% Uptime SLA",
    title: "High-Throughput B2B Quotation Engine",
    desc: "Architected a resilient trade quotation and procurement portal featuring real-time vendor bidding, dynamic PDF invoice generation, and automated multi-currency Stripe/PayPal transactions.",
    tags: ["React 18", "Express 5", "Stripe API", "AWS S3", "Redis"]
  },
  {
    category: "Healthcare Technology",
    metric: "<200ms Response",
    title: "Real-Time Telehealth & Booking System",
    desc: "Developed a HIPAA-conscious patient appointment booking and consultation engine with encrypted medical history storage, calendar synchronization, and automated SMS reminders.",
    tags: ["MERN Stack", "WebRTC", "Tailwind CSS", "JWT Auth"]
  },
  {
    category: "Mobile & Logistics",
    metric: "10k+ Fleet Telemetry",
    title: "Cross-Platform Fleet & Dispatch App",
    desc: "Engineered high-performance cross-platform mobile applications for logistics dispatchers and drivers with live GPS telemetry tracking, offline sync, and route optimization.",
    tags: ["React Native", "Flutter", "WebSockets", "Node.js"]
  },
  {
    category: "White-Label Delivery",
    metric: "4x Faster Launches",
    title: "Modular Headless CMS & UI Design System",
    desc: "Delivered a component-driven frontend architecture and design library under white-label terms for an international digital agency to rapidly build and ship enterprise client portals.",
    tags: ["React", "Design Systems", "GraphQL", "Tailwind"]
  },
  {
    category: "FinTech & Accounting",
    metric: "Zero Ledger Errors",
    title: "Automated Ledger & Tax Reconciliation",
    desc: "Created double-entry accounting software with automated bank reconciliation, compliance reporting, and cryptographic audit logs built for strict regulatory standards.",
    tags: ["Node.js", "MongoDB", "Express", "Data Analytics"]
  }
];

export default function OutsourcingPortfolio() {
  return (
    <section className={styles.portfolioSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Proven Technical Solutions & Delivery Showcase
          </h2>
          <p className={styles.sectionSubtitle}>
            A sample of high-impact web applications, SaaS platforms, and white-label enterprise
            solutions built and maintained by our engineering teams.
          </p>
        </div>

        <div className={styles.portfolioGrid}>
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <div key={idx} className={styles.portfolioCard}>
              <div className={styles.portHeader}>
                <span className={styles.portCategory}>{item.category}</span>
                <span className={styles.portMetricBadge}>{item.metric}</span>
              </div>
              <h3 className={styles.portTitle}>{item.title}</h3>
              <p className={styles.portDesc}>{item.desc}</p>
              <div className={styles.portTags}>
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx} className={styles.portTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
