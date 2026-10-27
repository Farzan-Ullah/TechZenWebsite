
import { ArrowRight, Play, BrainCircuit, Sparkles, Bot, Layers } from "lucide-react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaXTwitter,
  FaReact,
  FaNodeJs,
  FaPython,
  FaAws,
  FaDocker,
} from "react-icons/fa6";
import { SiMongodb, SiTypescript } from "react-icons/si";
import { company as fallbackCompany } from "../../data/siteData";
import useCompanyContent from "../../hooks/useCompanyContent";
import styles from "./Hero.module.css";

const nodes = [
  { x: 50, y: 8, delay: "0s" },
  { x: 72, y: 18, delay: "0.5s" },
  { x: 88, y: 38, delay: "1s" },
  { x: 82, y: 65, delay: "1.5s" },
  { x: 62, y: 86, delay: "0.3s" },
  { x: 38, y: 86, delay: "1.2s" },
  { x: 18, y: 65, delay: "0.7s" },
  { x: 12, y: 38, delay: "1.7s" },
  { x: 28, y: 18, delay: "0.9s" },
  { x: 50, y: 28, delay: "1.4s" },
  { x: 67, y: 42, delay: "0.4s" },
  { x: 57, y: 68, delay: "1.8s" },
  { x: 43, y: 68, delay: "0.6s" },
  { x: 33, y: 42, delay: "1.1s" },
];

const connections = [
  [0, 1],
  [0, 8],
  [0, 9],
  [1, 2],
  [1, 9],
  [2, 3],
  [2, 10],
  [3, 4],
  [3, 10],
  [4, 5],
  [4, 11],
  [5, 6],
  [5, 12],
  [6, 7],
  [6, 12],
  [7, 8],
  [7, 13],
  [8, 9],
  [9, 10],
  [9, 13],
  [9, 12],
  [10, 11],
  [10, 12],
  [11, 12],
  [12, 13],
  [13, 9],
];

const floatingTechNodes = [
  {
    name: "React.js",
    icon: FaReact,
    color: "#61dafb",
    glow: "rgba(97, 218, 251, 0.5)",
    className: styles.techNode1,
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178c6",
    glow: "rgba(49, 120, 198, 0.5)",
    className: styles.techNode2,
  },
  {
    name: "Python AI",
    icon: FaPython,
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.5)",
    className: styles.techNode3,
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    color: "#22c55e",
    glow: "rgba(34, 197, 94, 0.5)",
    className: styles.techNode4,
  },
  {
    name: "Docker",
    icon: FaDocker,
    color: "#2496ed",
    glow: "rgba(36, 150, 237, 0.5)",
    className: styles.techNode5,
  },
  {
    name: "AWS Cloud",
    icon: FaAws,
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.5)",
    className: styles.techNode6,
  },
];

export default function Hero() {
  const { company: companyInfo } = useCompanyContent();

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61595264584692",
      icon: FaFacebookF,
      hoverColor: "#1877f2",
      brandGlow: "rgba(24, 119, 242, 0.5)",
      label: "Follow TechZen on Facebook",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/techzenitservices/",
      icon: FaInstagram,
      hoverColor: "#e4405f",
      brandGlow: "rgba(228, 64, 95, 0.5)",
      label: "Follow TechZen on Instagram",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/techzen-it-and-hr-service-llc/",
      icon: FaLinkedinIn,
      hoverColor: "#0a66c2",
      brandGlow: "rgba(10, 102, 194, 0.5)",
      label: "Connect with TechZen on LinkedIn",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/919303878713",
      icon: FaWhatsapp,
      hoverColor: "#25d366",
      brandGlow: "rgba(37, 211, 102, 0.5)",
      label: "Chat with TechZen on WhatsApp",
    },
  ];

  return (
    <>
      {/* RIGHT FIXED SOCIAL DOCK */}
      {socialLinks.length > 0 && (
        <aside className={styles.socialDock} aria-label="Social media channels">
          <div className={styles.dockTrack}>
            <span className={styles.dockLabel}>Connect</span>
            <span className={styles.dockDivider} />
            <div className={styles.dockIcons}>
              {socialLinks.map(({ name, href, icon: Icon, hoverColor, brandGlow, label }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.dockItem}
                  aria-label={label}
                  style={{ "--hover-accent": hoverColor, "--brand-glow": brandGlow }}
                >
                  <Icon className={styles.dockIcon} />
                  <span className={styles.dockTooltip}>{name}</span>
                </a>
              ))}
            </div>
            <span className={styles.dockDivider} />
            <span className={styles.dockDot} />
          </div>
        </aside>
      )}

      <section className={styles.hero} id="home">
        <div className={styles.backgroundGlow} />
        <div className={styles.gridBackground} />
        <div className={styles.heroWatermark} aria-hidden="true" />

        <div className={styles.container}>
        <div className={styles.heroContent}>

          {/* LEFT SIDE */}
          <div className={styles.heroText}>
            <h1>
              Architecting the future of{" "}
              <span className={styles.gradientText}>Intelligent Technology.</span>
            </h1>

            <p>
              We combine enterprise engineering, cloud innovation, and strategic talent solutions
              to help ambitious organizations scale faster and lead their industries.
            </p>

            <div className={styles.actions}>
              <a
                href="#contact"
                className={`${styles.button} ${styles.primaryButton}`}
              >
                <span>Start a Project</span>
                <ArrowRight size={17} />
              </a>

              <a
                href="#services"
                className={`${styles.button} ${styles.secondaryButton}`}
              >
                <Play size={15} />
                <span>Explore Solutions</span>
              </a>
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <strong>10+</strong>
                <span>Years Experience</span>
              </div>

              <div className={styles.statItem}>
                <strong>250+</strong>
                <span>Enterprise Clients</span>
              </div>

              <div className={styles.statItem}>
                <strong>99.8%</strong>
                <span>Project Precision</span>
              </div>
            </div>

            {/* Inline Social Bar for Tablet / Mobile when floating dock is hidden */}
            {socialLinks.length > 0 && (
              <div className={styles.heroInlineSocial}>
                <span className={styles.inlineSocialLabel}>Connect with us</span>
                <div className={styles.inlineSocialIcons}>
                  {socialLinks.map(({ name, href, icon: Icon, hoverColor, brandGlow, label }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.inlineSocialItem}
                      aria-label={label}
                      style={{ "--hover-accent": hoverColor, "--brand-glow": brandGlow }}
                    >
                      <Icon className={styles.inlineSocialIcon} />
                      <span className={styles.inlineSocialName}>{name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT SIDE */}
          <div className={styles.visual}>

            <div className={styles.orbGlow} />

            <div className={styles.aiOrb}>

              <div className={styles.orbit} />
              <div className={styles.orbit} />
              <div className={styles.orbit} />

              <div className={styles.network}>

                <svg
                  className={styles.connections}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {connections.map(([from, to], index) => {
                    const start = nodes[from];
                    const end = nodes[to];

                    return (
                      <line
                        key={index}
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                      />
                    );
                  })}
                </svg>

                {nodes.map((node, index) => (
                  <span
                    key={index}
                    className={styles.node}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      animationDelay: node.delay,
                    }}
                  />
                ))}

              </div>

              <div className={styles.core}>
                <div className={styles.coreInner}>
                  <span className={styles.corePulse} />
                  <span className={styles.corePulseRing} />

                  <div className={styles.aiText}>
                    <BrainCircuit className={styles.coreAiIcon} size={24} />
                    <strong>TechZen</strong>
                    <span className={styles.coreTag}>AI CORE</span>
                  </div>
                </div>
              </div>

            </div>

            {/* FLOATING SATELLITE TECH NODES */}
            <div className={styles.floatingTechCluster}>
              {floatingTechNodes.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className={`${styles.floatingTechNode} ${tech.className}`}
                    style={{ "--node-glow": tech.glow }}
                    aria-label={tech.name}
                  >
                    <span
                      className={styles.techNodeGlow}
                      style={{ background: tech.glow }}
                    />
                    <Icon
                      className={styles.techNodeIcon}
                      style={{ color: tech.color }}
                    />
                    <span className={styles.techNodeTooltip}>{tech.name}</span>
                  </div>
                );
              })}
            </div>

            {/* FLOATING COMPANY TECH STACK CARDS */}
            {/* 1. AI & LLM Systems (Top-Left) */}
            <div className={`${styles.floatingCard} ${styles.cardTop}`}>
              <div className={styles.cardHeader}>
                <div className={`${styles.cardIconBox} ${styles.aiIconBox}`}>
                  <BrainCircuit size={19} />
                </div>
                <div className={styles.cardInfo}>
                  <strong>Enterprise AI & LLMs</strong>
                  <span className={styles.cardSub}>Agentic Workflows • Neural Models</span>
                </div>
              </div>

              <div className={styles.techPillRow}>
                <span className={styles.techPill}>
                  <Sparkles size={11} className={styles.sparkleIcon} />
                  GenAI
                </span>
                <span className={styles.techPill}>
                  <FaPython size={11} style={{ color: "#38bdf8" }} />
                  PyTorch
                </span>
                <span className={styles.techPill}>
                  <Bot size={11} className={styles.botIcon} />
                  Agents
                </span>
              </div>
            </div>

            {/* 2. Full-Stack & Cloud Architecture (Bottom-Right) */}
            <div className={`${styles.floatingCard} ${styles.cardBottom}`}>
              <div className={styles.cardHeader}>
                <div className={`${styles.cardIconBox} ${styles.stackIconBox}`}>
                  <Layers size={19} />
                </div>
                <div className={styles.cardInfo}>
                  <strong>Full-Stack & Cloud Core</strong>
                  <span className={styles.cardSub}>Scalable Microservices • Enterprise SLA</span>
                </div>
              </div>

              <div className={styles.techIconsList}>
                <span className={styles.techIconItem} title="React.js">
                  <FaReact style={{ color: "#61dafb" }} />
                </span>
                <span className={styles.techIconItem} title="Node.js">
                  <FaNodeJs style={{ color: "#22c55e" }} />
                </span>
                <span className={styles.techIconItem} title="AWS Cloud">
                  <FaAws style={{ color: "#f59e0b" }} />
                </span>
                <span className={styles.techIconItem} title="Docker">
                  <FaDocker style={{ color: "#38bdf8" }} />
                </span>
                <span className={styles.techIconItem} title="MongoDB">
                  <SiMongodb style={{ color: "#10b981" }} />
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span />
        Scroll to explore
      </div>
    </section>
  </>
);
}
