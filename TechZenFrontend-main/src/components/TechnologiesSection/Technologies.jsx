import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiDocker,
  SiNextdotjs,
  SiExpress,
  SiTailwindcss,
  SiGraphql,
  SiGit,
  SiFlutter
} from "react-icons/si";
import { FaAws, FaDatabase, FaRobot } from "react-icons/fa6";
import { Sparkles, BrainCircuit, Bot, Cpu } from "lucide-react";
import styles from "./Technologies.module.css";

const TECHNOLOGIES = [
  {
    name: "React.js",
    category: "Frontend",
    icon: SiReact,
    color: "#61dafb",
    bg: "rgba(97, 218, 251, 0.12)",
    glow: "rgba(97, 218, 251, 0.4)"
  },
  {
    name: "Node.js",
    category: "Backend",
    icon: SiNodedotjs,
    color: "#22c55e",
    bg: "rgba(34, 197, 94, 0.12)",
    glow: "rgba(34, 197, 94, 0.4)"
  },
  {
    name: "MongoDB",
    category: "NoSQL DBMS",
    icon: SiMongodb,
    color: "#47a248",
    bg: "rgba(71, 162, 72, 0.12)",
    glow: "rgba(71, 162, 72, 0.4)"
  },
  {
    name: "JavaScript",
    category: "Core Language",
    icon: SiJavascript,
    color: "#f7df1e",
    bg: "rgba(247, 223, 30, 0.12)",
    glow: "rgba(247, 223, 30, 0.4)"
  },
  {
    name: "TypeScript",
    category: "Type Safety",
    icon: SiTypescript,
    color: "#3178c6",
    bg: "rgba(49, 120, 198, 0.12)",
    glow: "rgba(49, 120, 198, 0.4)"
  },
  {
    name: "Generative AI",
    category: "Gen AI & LLMs",
    icon: Sparkles,
    color: "#ec4899",
    bg: "rgba(236, 72, 153, 0.12)",
    glow: "rgba(236, 72, 153, 0.4)"
  },
  {
    name: "AI Tools & Agents",
    category: "Automation",
    icon: Bot,
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.12)",
    glow: "rgba(139, 92, 246, 0.4)"
  },
  {
    name: "Python",
    category: "AI & Data",
    icon: SiPython,
    color: "#38bdf8",
    bg: "rgba(56, 189, 248, 0.12)",
    glow: "rgba(56, 189, 248, 0.4)"
  },
  {
    name: "SQL & PostgreSQL",
    category: "Relational DBMS",
    icon: SiPostgresql,
    color: "#4169e1",
    bg: "rgba(65, 105, 225, 0.12)",
    glow: "rgba(65, 105, 225, 0.4)"
  },
  {
    name: "MySQL",
    category: "SQL Database",
    icon: SiMysql,
    color: "#00758f",
    bg: "rgba(0, 117, 143, 0.12)",
    glow: "rgba(0, 117, 143, 0.4)"
  },
  {
    name: "DBMS & Redis",
    category: "In-Memory Cache",
    icon: FaDatabase,
    color: "#ef4444",
    bg: "rgba(239, 68, 68, 0.12)",
    glow: "rgba(239, 68, 68, 0.4)"
  },
  {
    name: "Next.js",
    category: "Full Stack SSR",
    icon: SiNextdotjs,
    color: "#ffffff",
    bg: "rgba(255, 255, 255, 0.1)",
    glow: "rgba(255, 255, 255, 0.35)"
  },
  {
    name: "Express.js",
    category: "API Framework",
    icon: SiExpress,
    color: "#94a3b8",
    bg: "rgba(148, 163, 184, 0.12)",
    glow: "rgba(148, 163, 184, 0.4)"
  },
  {
    name: "Docker",
    category: "DevOps & Cloud",
    icon: SiDocker,
    color: "#2496ed",
    bg: "rgba(36, 150, 237, 0.12)",
    glow: "rgba(36, 150, 237, 0.4)"
  },
  {
    name: "AWS Cloud",
    category: "Cloud Infra",
    icon: FaAws,
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.12)",
    glow: "rgba(245, 158, 11, 0.4)"
  },
  {
    name: "Tailwind CSS",
    category: "UI Styling",
    icon: SiTailwindcss,
    color: "#06b6d4",
    bg: "rgba(6, 182, 212, 0.12)",
    glow: "rgba(6, 182, 212, 0.4)"
  },
  {
    name: "GraphQL",
    category: "API Query",
    icon: SiGraphql,
    color: "#e535ab",
    bg: "rgba(229, 53, 171, 0.12)",
    glow: "rgba(229, 53, 171, 0.4)"
  },
  {
    name: "Flutter",
    category: "Mobile Apps",
    icon: SiFlutter,
    color: "#02569b",
    bg: "rgba(2, 86, 155, 0.12)",
    glow: "rgba(2, 86, 155, 0.4)"
  },
  {
    name: "Git & GitHub",
    category: "Version Control",
    icon: SiGit,
    color: "#f05032",
    bg: "rgba(240, 80, 50, 0.12)",
    glow: "rgba(240, 80, 50, 0.4)"
  },
  {
    name: "AI Agents & RAG",
    category: "Intelligent Systems",
    icon: BrainCircuit,
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.12)",
    glow: "rgba(168, 85, 247, 0.4)"
  }
];

export default function Technologies() {
  // Duplicate list once to create an infinite, seamless horizontal marquee loop
  const marqueeItems = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <section className={styles.section} id="technologies">
      {/* Anchor for backward compatibility with why-us links */}
      <span id="why-us" className={styles.anchorOffset} aria-hidden="true" />
      <div className={styles.watermark} aria-hidden="true" />

      <div className={styles.container}>
        {/* SECTION HEADING */}
        <div className={styles.sectionHeading}>
          <div className={styles.eyebrow}>
            <Cpu size={14} className={styles.eyebrowIcon} />
            <span>MODERN TECH ECOSYSTEM</span>
          </div>

          <h2>
            Technologies We <em>Used &amp; Master</em>
          </h2>

          <p className={styles.description}>
            We engineer high-performance web applications, scalable cloud backends, intelligent
            Generative AI agents, and robust database architectures using industry-leading technologies.
          </p>
        </div>
      </div>

      {/* SINGLE-LINE SLOWLY RUNNING MARQUEE */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={`${tech.name}-${index}`}
                className={styles.techPill}
                style={{ "--glow-color": tech.glow }}
              >
                <div
                  className={styles.iconWrapper}
                  style={{
                    backgroundColor: tech.bg,
                    borderColor: tech.glow,
                    boxShadow: `0 0 16px ${tech.bg}`
                  }}
                >
                  <Icon
                    className={styles.techIcon}
                    style={{ color: tech.color }}
                  />
                </div>

                <div className={styles.techMeta}>
                  <span className={styles.techName}>{tech.name}</span>
                  <span className={styles.techCategory}>
                    <span
                      className={styles.categoryDot}
                      style={{ backgroundColor: tech.color }}
                    />
                    {tech.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
