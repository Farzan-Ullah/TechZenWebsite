import {
  Code,
  Layout,
  Server,
  Smartphone,
  Sparkles,
  ShieldCheck,
  Cloud,
  CheckCircle2,
  Users,
  Target,
  UserPlus
} from "lucide-react";
import styles from "./Outsourcing.module.css";

const ROLES = [
  {
    icon: Code,
    name: "Full-Stack Engineers",
    sub: "MERN Stack • REST • TypeScript"
  },
  {
    icon: Layout,
    name: "Front-End Specialists",
    sub: "React • Responsive UI • State Mgmt"
  },
  {
    icon: Server,
    name: "Backend Engineers",
    sub: "Node.js • Express • Database Design"
  },
  {
    icon: Smartphone,
    name: "Mobile App Developers",
    sub: "React Native • Flutter • iOS & Android"
  },
  {
    icon: Sparkles,
    name: "UI/UX Product Designers",
    sub: "Figma • Design Systems • Prototypes"
  },
  {
    icon: ShieldCheck,
    name: "QA & Test Engineers",
    sub: "Manual & Automated Quality Assurance"
  },
  {
    icon: Cloud,
    name: "DevOps & Cloud Engineers",
    sub: "CI/CD • Docker • Cloud Deployments"
  }
];

const ENGAGEMENT_MODELS = [
  {
    name: "Dedicated Development Team",
    highlighted: true,
    badge: "Most Popular",
    icon: Users,
    desc: "A fully dedicated engineering team that works exclusively for your organization under your direct management or our managed oversight.",
    features: [
      "100% dedicated developers and QA specialists",
      "Direct communication via Slack, Teams & Zoom",
      "Daily standups, sprint tracking & transparent timesheets",
      "Flexible monthly engagement with easy scalability",
      "Full IP ownership and code transfer"
    ],
    actionText: "Hire Dedicated Team"
  },
  {
    name: "Project-Based Outsourcing",
    highlighted: false,
    badge: null,
    icon: Target,
    desc: "Fixed-price or milestone-based delivery for well-defined software projects from initial concept through deployment.",
    features: [
      "Fixed-scope or milestone-driven development",
      "Clear deliverables, deadlines, and acceptance criteria",
      "Comprehensive end-to-end project management",
      "Guaranteed post-launch warranty and bug fixes",
      "Predictable budget and zero surprise overhead"
    ],
    actionText: "Outsource a Project"
  },
  {
    name: "Team Augmentation",
    highlighted: false,
    badge: null,
    icon: UserPlus,
    desc: "Seamlessly inject vetted developers into your existing team to bridge technical skill gaps or meet critical project milestones.",
    features: [
      "Rapid onboarding within 5 to 7 business days",
      "Developers integrate smoothly into your Git & Jira workflows",
      "Pay strictly for productive hours worked",
      "Immediate ramp-up or ramp-down flexibility",
      "Co-engineering with your in-house leads"
    ],
    actionText: "Augment Your Team"
  }
];

export default function DedicatedTeamSection() {
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const formEl = document.getElementById("partnership-enquiry");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.teamsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Dedicated Development Teams & Technical Talent
          </h2>
          <p className={styles.sectionSubtitle}>
            Extend your in-house capabilities with vetted software engineers, UI/UX designers,
            and QA specialists ready to integrate immediately into your development workflows.
          </p>
        </div>

        {/* Roles Grid */}
        <div className={styles.rolesGrid}>
          {ROLES.map((role, idx) => {
            const Icon = role.icon;
            return (
              <div key={idx} className={styles.roleCard}>
                <div className={styles.roleIcon}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className={styles.roleName}>{role.name}</h4>
                  <p className={styles.roleSub}>{role.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engagement Models Header */}
        <div className={styles.modelsSubHeader}>
          <h3>Flexible Engagement Models</h3>
          <p>Choose the collaboration model that fits your operational rhythm and budgetary goals</p>
        </div>

        {/* 3 Models Grid */}
        <div className={styles.modelsGrid}>
          {ENGAGEMENT_MODELS.map((model, idx) => {
            return (
              <div
                key={idx}
                className={`${styles.modelCard} ${
                  model.highlighted ? styles.modelCardHighlighted : ""
                }`}
              >
                {model.badge && <div className={styles.modelBadge}>{model.badge}</div>}
                <h3 className={styles.modelName}>{model.name}</h3>
                <p className={styles.modelDesc}>{model.desc}</p>
                <ul className={styles.modelFeatures}>
                  {model.features.map((feat, fIdx) => (
                    <li key={fIdx}>
                      <CheckCircle2 size={16} className={styles.modelCheck} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#partnership-enquiry"
                  onClick={handleScrollToForm}
                  className={styles.modelActionBtn}
                >
                  {model.actionText}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
