import {
  Globe,
  CloudCog,
  Code2,
  Smartphone,
  Cpu,
  Building2,
  Palette,
  Wrench,
  ArrowRight
} from "lucide-react";
import styles from "./Outsourcing.module.css";

const CAPABILITIES = [
  {
    number: "01",
    icon: Globe,
    title: "Custom Web Application Development",
    items: [
      "Full-stack web applications tailored to your business logic",
      "Interactive customer & partner portals",
      "Business process automation workflows",
      "Executive admin dashboards and content management"
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "REST APIs"]
  },
  {
    number: "02",
    icon: CloudCog,
    title: "SaaS Platform Engineering",
    items: [
      "Multi-tenant data architecture and partitioning",
      "Subscription management and payment gateways",
      "Granular role-based access control (RBAC)",
      "High-availability cloud backend infrastructure"
    ],
    tags: ["SaaS", "Microservices", "Stripe", "OAuth/JWT", "Cloud DB"]
  },
  {
    number: "03",
    icon: Code2,
    title: "MERN Stack Development",
    items: [
      "Optimized MongoDB data modeling & aggregation",
      "Express.js & Node.js scalable microservices",
      "Interactive, component-driven React user interfaces",
      "End-to-end type safety, linting, and testing"
    ],
    tags: ["React 18", "Express 5", "Node.js", "Mongoose", "REST"]
  },
  {
    number: "04",
    icon: Smartphone,
    title: "Mobile Application Development",
    items: [
      "Cross-platform applications for iOS and Android",
      "React Native & Flutter native-grade performance",
      "Real-time sync, offline data, and device integrations",
      "FCM push notifications and background tasks"
    ],
    tags: ["React Native", "Flutter", "iOS & Android", "Firebase"]
  },
  {
    number: "05",
    icon: Cpu,
    title: "API Development & System Integration",
    items: [
      "RESTful and GraphQL API design & documentation",
      "Payment gateway, Stripe, PayPal, Razorpay integrations",
      "CRM, ERP, and marketing automation connectors",
      "Real-time event webhooks and messaging queues"
    ],
    tags: ["OpenAPI", "Webhooks", "Stripe", "Postman", "GraphQL"]
  },
  {
    number: "06",
    icon: Building2,
    title: "ERP & Enterprise Software Solutions",
    items: [
      "Bespoke enterprise resource planning (ERP) suites",
      "Inventory, procurement, and warehouse tracking",
      "Automated approval workflows and audit trails",
      "Enterprise security compliance and role management"
    ],
    tags: ["Enterprise", "RBAC", "Audit Logs", "Analytics", "Postgres"]
  },
  {
    number: "07",
    icon: Palette,
    title: "UI/UX Design & Front-End Engineering",
    items: [
      "Pixel-perfect translation of Figma/Adobe XD designs",
      "Scalable design systems and component libraries",
      "Subtle micro-interactions and responsive layouts",
      "Core Web Vitals and WCAG accessibility standards"
    ],
    tags: ["Figma", "Design Systems", "Tailwind", "Responsive", "UI/UX"]
  },
  {
    number: "08",
    icon: Wrench,
    title: "Software Maintenance & SLA Support",
    items: [
      "Legacy system modernization and code refactoring",
      "Continuous bug resolution and performance optimization",
      "Security patches, vulnerability audits, and updates",
      "Long-term guaranteed SLA maintenance agreements"
    ],
    tags: ["Maintenance", "CI/CD", "Security Audits", "Monitoring"]
  }
];

export default function DevelopmentCapabilities() {
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const formEl = document.getElementById("partnership-enquiry");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="capabilities" className={styles.capabilitiesSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrowBadge}>ENGINEERING CAPABILITIES</div>
          <h2 className={styles.sectionTitle}>
            Comprehensive Software Development Outsourcing Services
          </h2>
          <p className={styles.sectionSubtitle}>
            From single web applications to complex enterprise platforms, TechZen provides
            end-to-end technical capabilities to accelerate your software roadmap.
          </p>
        </div>

        <div className={styles.capabilitiesGrid}>
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.number} className={styles.capabilityCard}>
                <div className={styles.capIconHeader}>
                  <div className={styles.capIcon}>
                    <Icon size={22} />
                  </div>
                  <span className={styles.capNumber}>{cap.number}</span>
                </div>
                <h3 className={styles.capTitle}>{cap.title}</h3>
                <ul className={styles.capList}>
                  {cap.items.map((item, idx) => (
                    <li key={idx}>
                      <span className={styles.capListBullet} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.capTags}>
                  {cap.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={styles.capTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className={styles.capabilitiesCtaBanner}>
          <div className={styles.ctaBannerLeft}>
            <h4 className={styles.ctaBannerTitle}>
              Have a specific project or specialized tech stack requirement?
            </h4>
            <p className={styles.ctaBannerText}>
              We build custom development teams aligned with your exact architectural specifications
              and business timeline.
            </p>
          </div>
          <a
            href="#partnership-enquiry"
            onClick={handleScrollToForm}
            className={styles.primaryCta}
          >
            <span>Discuss Your Project</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
