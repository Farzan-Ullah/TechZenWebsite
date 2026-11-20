import {
  Layers,
  Users2,
  TrendingDown,
  MessagesSquare,
  Expand,
  HeadphonesIcon
} from "lucide-react";
import styles from "./Outsourcing.module.css";

const WHY_CARDS = [
  {
    icon: Layers,
    title: "Flexible Engagement Models",
    description:
      "Project-based development, dedicated engineering teams, and long-term technical collaboration aligned with your budget and milestones."
  },
  {
    icon: Users2,
    title: "Skilled Development Team",
    description:
      "Access developers experienced in modern web technologies, scalable backend architectures, and high-performance cross-platform applications."
  },
  {
    icon: TrendingDown,
    title: "Cost-Effective Development",
    description:
      "Expand your engineering capacity without the high overhead, recruitment delays, and operational friction of maintaining permanent in-house teams."
  },
  {
    icon: MessagesSquare,
    title: "Transparent Communication",
    description:
      "Clear project updates, sprint tracking, comprehensive code documentation, and proactive daily or weekly communication across modern collaboration tools."
  },
  {
    icon: Expand,
    title: "Scalable Delivery",
    description:
      "Easily scale development capacity up or down according to project requirements, tight delivery deadlines, and changing business workloads."
  },
  {
    icon: HeadphonesIcon,
    title: "Long-Term Technical Support",
    description:
      "Ongoing maintenance, security updates, feature enhancements, bug fixing, and continuous technical support long after the initial release."
  }
];

export default function WhyPartnerSection() {
  return (
    <section className={styles.whySection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            A Reliable Development Partner for Your Growing Business
          </h2>
          <p className={styles.sectionSubtitle}>
            Whether you are an IT consultancy, digital agency, startup, or established
            organization, TechZen provides the development expertise and delivery support needed to
            execute technology projects efficiently.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {WHY_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <Icon size={24} />
                </div>
                <h3 className={styles.featureTitle}>{card.title}</h3>
                <p className={styles.featureDesc}>{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
