import styles from "./WhyUs.module.css";

const pillars = [
  {
    title: "Modern Technology",
    image: "/images/pillars/modern-technology.png",
  },
  {
    title: "Reliable Solutions",
    image: "/images/pillars/reliable-solutions.png",
  },
  {
    title: "Business Focused",
    image: "/images/pillars/business-focused.png",
  },
  {
    title: "End-to-End Support",
    image: "/images/pillars/end-to-end-support.png",
  },
];

export default function WhyUs() {
  return (
    <section className={styles.section} id="why-us">
      <div className={styles.watermark} aria-hidden="true" />
      <div className={styles.container}>

        {/* SECTION HEADING */}
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>WHY TECHZEN</p>

          <h2>
            Advice is easy. <em>Progress is the point.</em>
          </h2>

          <p className={styles.description}>
            We measure our value by what changes after the engagement—not by
            the number of slides we produce.
          </p>
        </div>

        {/* SEPARATED PILLARS (NO HOVER CARD) */}
        <div className={styles.pillarsGrid}>
          {pillars.map((item) => (
            <div className={styles.pillarItem} key={item.title}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.pillarImg}
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}