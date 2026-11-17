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
import { FaAws, FaDatabase } from "react-icons/fa6";
import { Sparkles, BrainCircuit, Bot, Cpu } from "lucide-react";
import styles from "./Technologies.module.css";

const TECHNOLOGIES = [
  {
    name: "React.js",
    category: "Frontend",
    icon: SiReact,
    colorDark: "#61dafb",
    colorLight: "#0284c7",
    bgDark: "rgba(97, 218, 251, 0.14)",
    bgLight: "rgba(2, 132, 199, 0.1)",
    borderDark: "rgba(97, 218, 251, 0.35)",
    borderLight: "rgba(2, 132, 199, 0.25)"
  },
  {
    name: "Node.js",
    category: "Backend",
    icon: SiNodedotjs,
    colorDark: "#22c55e",
    colorLight: "#16a34a",
    bgDark: "rgba(34, 197, 94, 0.14)",
    bgLight: "rgba(22, 163, 74, 0.1)",
    borderDark: "rgba(34, 197, 94, 0.35)",
    borderLight: "rgba(22, 163, 74, 0.25)"
  },
  {
    name: "MongoDB",
    category: "NoSQL DBMS",
    icon: SiMongodb,
    colorDark: "#47a248",
    colorLight: "#15803d",
    bgDark: "rgba(71, 162, 72, 0.14)",
    bgLight: "rgba(21, 128, 61, 0.1)",
    borderDark: "rgba(71, 162, 72, 0.35)",
    borderLight: "rgba(21, 128, 61, 0.25)"
  },
  {
    name: "JavaScript",
    category: "Core Language",
    icon: SiJavascript,
    colorDark: "#f7df1e",
    colorLight: "#b45309",
    bgDark: "rgba(247, 223, 30, 0.15)",
    bgLight: "rgba(245, 158, 11, 0.12)",
    borderDark: "rgba(247, 223, 30, 0.35)",
    borderLight: "rgba(217, 119, 6, 0.3)"
  },
  {
    name: "TypeScript",
    category: "Type Safety",
    icon: SiTypescript,
    colorDark: "#38bdf8",
    colorLight: "#0369a1",
    bgDark: "rgba(56, 189, 248, 0.14)",
    bgLight: "rgba(3, 105, 161, 0.1)",
    borderDark: "rgba(56, 189, 248, 0.35)",
    borderLight: "rgba(3, 105, 161, 0.25)"
  },
  {
    name: "Generative AI",
    category: "Gen AI & LLMs",
    icon: Sparkles,
    colorDark: "#f472b6",
    colorLight: "#db2777",
    bgDark: "rgba(244, 114, 182, 0.14)",
    bgLight: "rgba(219, 39, 119, 0.1)",
    borderDark: "rgba(244, 114, 182, 0.35)",
    borderLight: "rgba(219, 39, 119, 0.25)"
  },
  {
    name: "AI Tools & Agents",
    category: "Automation",
    icon: Bot,
    colorDark: "#a78bfa",
    colorLight: "#7c3aed",
    bgDark: "rgba(167, 139, 250, 0.14)",
    bgLight: "rgba(124, 58, 237, 0.1)",
    borderDark: "rgba(167, 139, 250, 0.35)",
    borderLight: "rgba(124, 58, 237, 0.25)"
  },
  {
    name: "Python",
    category: "AI & Data",
    icon: SiPython,
    colorDark: "#38bdf8",
    colorLight: "#0284c7",
    bgDark: "rgba(56, 189, 248, 0.14)",
    bgLight: "rgba(2, 132, 199, 0.1)",
    borderDark: "rgba(56, 189, 248, 0.35)",
    borderLight: "rgba(2, 132, 199, 0.25)"
  },
  {
    name: "SQL & PostgreSQL",
    category: "Relational DBMS",
    icon: SiPostgresql,
    colorDark: "#60a5fa",
    colorLight: "#1d4ed8",
    bgDark: "rgba(96, 165, 250, 0.14)",
    bgLight: "rgba(29, 78, 216, 0.1)",
    borderDark: "rgba(96, 165, 250, 0.35)",
    borderLight: "rgba(29, 78, 216, 0.25)"
  },
  {
    name: "MySQL",
    category: "SQL Database",
    icon: SiMysql,
    colorDark: "#38bdf8",
    colorLight: "#00758f",
    bgDark: "rgba(56, 189, 248, 0.14)",
    bgLight: "rgba(0, 117, 143, 0.1)",
    borderDark: "rgba(56, 189, 248, 0.35)",
    borderLight: "rgba(0, 117, 143, 0.25)"
  },
  {
    name: "DBMS & Redis",
    category: "In-Memory Cache",
    icon: FaDatabase,
    colorDark: "#f87171",
    colorLight: "#dc2626",
    bgDark: "rgba(248, 113, 113, 0.14)",
    bgLight: "rgba(220, 38, 38, 0.1)",
    borderDark: "rgba(248, 113, 113, 0.35)",
    borderLight: "rgba(220, 38, 38, 0.25)"
  },
  {
    name: "Next.js",
    category: "Full Stack SSR",
    icon: SiNextdotjs,
    colorDark: "#ffffff",
    colorLight: "#0f172a",
    bgDark: "rgba(255, 255, 255, 0.12)",
    bgLight: "rgba(15, 23, 42, 0.08)",
    borderDark: "rgba(255, 255, 255, 0.3)",
    borderLight: "rgba(15, 23, 42, 0.22)"
  },
  {
    name: "Express.js",
    category: "API Framework",
    icon: SiExpress,
    colorDark: "#cbd5e1",
    colorLight: "#0f172a",
    bgDark: "rgba(203, 213, 225, 0.12)",
    bgLight: "rgba(15, 23, 42, 0.08)",
    borderDark: "rgba(203, 213, 225, 0.3)",
    borderLight: "rgba(15, 23, 42, 0.22)"
  },
  {
    name: "Docker",
    category: "DevOps & Cloud",
    icon: SiDocker,
    colorDark: "#38bdf8",
    colorLight: "#0284c7",
    bgDark: "rgba(56, 189, 248, 0.14)",
    bgLight: "rgba(2, 132, 199, 0.1)",
    borderDark: "rgba(56, 189, 248, 0.35)",
    borderLight: "rgba(2, 132, 199, 0.25)"
  },
  {
    name: "AWS Cloud",
    category: "Cloud Infra",
    icon: FaAws,
    colorDark: "#fbbf24",
    colorLight: "#d97706",
    bgDark: "rgba(251, 191, 36, 0.14)",
    bgLight: "rgba(217, 119, 6, 0.1)",
    borderDark: "rgba(251, 191, 36, 0.35)",
    borderLight: "rgba(217, 119, 6, 0.25)"
  },
  {
    name: "Tailwind CSS",
    category: "UI Styling",
    icon: SiTailwindcss,
    colorDark: "#22d3ee",
    colorLight: "#0284c7",
    bgDark: "rgba(34, 211, 238, 0.14)",
    bgLight: "rgba(2, 132, 199, 0.1)",
    borderDark: "rgba(34, 211, 238, 0.35)",
    borderLight: "rgba(2, 132, 199, 0.25)"
  },
  {
    name: "GraphQL",
    category: "API Query",
    icon: SiGraphql,
    colorDark: "#f472b6",
    colorLight: "#c026d3",
    bgDark: "rgba(244, 114, 182, 0.14)",
    bgLight: "rgba(192, 38, 211, 0.1)",
    borderDark: "rgba(244, 114, 182, 0.35)",
    borderLight: "rgba(192, 38, 211, 0.25)"
  },
  {
    name: "Flutter",
    category: "Mobile Apps",
    icon: SiFlutter,
    colorDark: "#38bdf8",
    colorLight: "#0284c7",
    bgDark: "rgba(56, 189, 248, 0.14)",
    bgLight: "rgba(2, 132, 199, 0.1)",
    borderDark: "rgba(56, 189, 248, 0.35)",
    borderLight: "rgba(2, 132, 199, 0.25)"
  },
  {
    name: "Git & GitHub",
    category: "Version Control",
    icon: SiGit,
    colorDark: "#fb7185",
    colorLight: "#e11d48",
    bgDark: "rgba(251, 113, 133, 0.14)",
    bgLight: "rgba(225, 29, 72, 0.1)",
    borderDark: "rgba(251, 113, 133, 0.35)",
    borderLight: "rgba(225, 29, 72, 0.25)"
  },
  {
    name: "AI Agents & RAG",
    category: "Intelligent Systems",
    icon: BrainCircuit,
    colorDark: "#c084fc",
    colorLight: "#7e22ce",
    bgDark: "rgba(192, 132, 252, 0.14)",
    bgLight: "rgba(126, 34, 206, 0.1)",
    borderDark: "rgba(192, 132, 252, 0.35)",
    borderLight: "rgba(126, 34, 206, 0.25)"
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
                style={{
                  "--tech-color-dark": tech.colorDark,
                  "--tech-color-light": tech.colorLight,
                  "--tech-bg-dark": tech.bgDark,
                  "--tech-bg-light": tech.bgLight,
                  "--tech-border-dark": tech.borderDark,
                  "--tech-border-light": tech.borderLight
                }}
              >
                <div className={styles.iconWrapper}>
                  <Icon className={styles.techIcon} />
                </div>

                <div className={styles.techMeta}>
                  <span className={styles.techName}>{tech.name}</span>
                  <span className={styles.techCategory}>
                    <span className={styles.categoryDot} />
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
