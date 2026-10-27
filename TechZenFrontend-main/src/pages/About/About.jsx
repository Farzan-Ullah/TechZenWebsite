import {
  Award,
  CheckCircle2,
  Cloud,
  Code2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import useCompanyContent from "../../hooks/useCompanyContent";
import { company as fallbackCompany } from "../../data/siteData";
import SEO from "../../components/SEO/SEO";
import styles from "./About.module.css";

const defaultPillars = [
  {
    id: "software",
    icon: Code2,
    name: "Software Engineering",
    description:
      "Bespoke full-stack web applications, secure REST APIs, and microservices engineered for high performance.",
  },
  {
    id: "cloud",
    icon: Cloud,
    name: "Cloud & DevOps",
    description:
      "Modern cloud architecture on AWS/Azure, automated zero-downtime CI/CD pipelines, and robust infrastructure.",
  },
  {
    id: "ai",
    icon: Sparkles,
    name: "AI & Digital Innovation",
    description:
      "Intelligent process automation, smart analytics, and next-gen technology stacks driving digital growth.",
  },
  {
    id: "training",
    icon: GraduationCap,
    name: "Professional Academy",
    description:
      "Industry-aligned corporate training, intensive internships, and real-world project mentorship for tech talent.",
  },
];

export default function About() {
  const { company: content } = useCompanyContent();
  const companyData = content || fallbackCompany;
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  return (
    <section className={styles.section} id="about">
      {isAboutPage && (
        <SEO
          title="About TechZen | IT Consulting & Digital Innovation Leaders"
          description="Learn about TechZen's mission, engineering leadership, and vision to deliver scalable software solutions, cloud architecture, and corporate training."
          keywords="about TechZen, tech consulting firm, IT software team, Chhatarpur tech company, software engineering leaders"
          canonicalPath="/about"
        />
      )}
      <div className={styles.container}>
        <div className={styles.splitGrid}>
          {/* =========================================================
              LEFT CARD: ENGINEERING SHOWCASE
              ========================================================= */}
          <div className={styles.aboutVisual}>
            <div className={styles.aboutPanel}>
              {/* Header inside Left Card */}
              <div className={styles.panelHeader}>
                <span className={styles.statusLive}>
                  <span className={styles.liveDot} />
                  <span>EST. 2016 • GLOBAL DELIVERY</span>
                </span>
              </div>

              {/* Main Headline & Intro */}
              <h3 className={styles.panelTitle}>
                Engineering Scalable Digital Futures with Precision.
              </h3>
              <p className={styles.panelDesc}>
                {companyData?.about ||
                  companyData?.introduction ||
                  "We combine enterprise architecture, agile execution, and dedicated engineering talent to craft scalable software and cultivate industry-ready developers."}
              </p>

              {/* 4-Stat Metric Grid */}
              <div className={styles.metricsGrid}>
                <div className={styles.metricItem}>
                  <strong>10+</strong>
                  <span>Years Experience</span>
                </div>
                <div className={styles.metricItem}>
                  <strong>250+</strong>
                  <span>Projects Delivered</span>
                </div>
                <div className={styles.metricItem}>
                  <strong>99.8%</strong>
                  <span>Delivery Precision</span>
                </div>
                <div className={styles.metricItem}>
                  <strong>50+</strong>
                  <span>Tech Specialists</span>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className={styles.techChipsRow}>
                <span className={styles.techChip}>React.js</span>
                <span className={styles.techChip}>Node.js</span>
                <span className={styles.techChip}>Python</span>
                <span className={styles.techChip}>Cloud AWS</span>
                <span className={styles.techChip}>MongoDB</span>
                <span className={styles.techChip}>DevOps</span>
              </div>

              {/* Verified Trust Strip */}
              <div className={styles.trustStrip}>
                <ShieldCheck size={16} className={styles.trustIcon} />
                <span>Enterprise SLA • ISO Quality Standards • Global Delivery</span>
              </div>
            </div>

            {/* Experience Floating Badge */}
            <div className={styles.experienceBadge}>
              <div className={styles.expIconWrapper}>
                <Award size={22} />
              </div>
              <div>
                <strong>10+</strong>
                <span>Years of<br />Excellence</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT SIDE: CONTENT & CARDS WITH ICONS & NAMES
              ========================================================= */}
          <div className={styles.aboutCopy}>
            <p className={styles.eyebrow}>ABOUT TECHZEN</p>
            <h2 className={styles.copyTitle}>
              Architecting Digital Innovation. <em>Accelerating Business Value.</em>
            </h2>

            <p className={styles.copyLead}>
              TechZen is a full-cycle technology consulting and digital engineering firm.
              We empower ambitious enterprises and forward-thinking businesses to build, scale,
              and modernize their digital ecosystems with confidence.
            </p>

            {/* Mission & Vision Inline Blocks */}
            <div className={styles.missionVisionWrap}>
              <div className={styles.missionCard}>
                <div className={styles.mvIconHeader}>
                  <CheckCircle2 size={16} className={styles.mvIcon} />
                  <strong>Our Mission</strong>
                </div>
                <p>
                  {companyData?.mission ||
                    "Deliver reliable, scalable, and practical digital solutions that solve real business challenges."}
                </p>
              </div>

              <div className={styles.visionCard}>
                <div className={styles.mvIconHeader}>
                  <Sparkles size={16} className={styles.mvIcon} />
                  <strong>Our Vision</strong>
                </div>
                <p>
                  {companyData?.vision ||
                    "Be the trusted technology partner for global enterprises through relentless innovation and engineering excellence."}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE CAPABILITY CARDS (With Icons and Names) */}
            <div className={styles.capabilitiesGrid}>
              {defaultPillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={pillar.id} className={styles.capabilityCard}>
                    <div className={styles.capabilityIconWrap}>
                      <IconComponent size={20} className={styles.capabilityIcon} />
                    </div>
                    <div className={styles.capabilityContent}>
                      <h4 className={styles.capabilityName}>{pillar.name}</h4>
                      <p className={styles.capabilityDesc}>{pillar.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}