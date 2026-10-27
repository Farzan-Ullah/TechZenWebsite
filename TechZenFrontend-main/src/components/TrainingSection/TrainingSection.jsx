import {
  ArrowRight,
  Award,
  Calendar,
  Clock,
  Code2,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tranings } from "../../data/siteData";
import usePublicContent from "../../hooks/usePublicContent";
import styles from "./TrainingSection.module.css";

export default function TrainingSection() {
  const { items: trainings } = usePublicContent("trainings", Tranings);

  return (
    <section className={styles.section} id="trainings">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>LEARN WITH TECHZEN</p>
            <h2>
              Training built around
              <em> practical skills.</em>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.intro}>
              Explore our seasonal training programs and the skills each one
              covers.
            </p>
            <Link to="/trainings" className={styles.exploreAllBtn}>
              <span>View All Training Programs</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div className={styles.trainingGrid}>
          {trainings.map((training, index) => {
            const Icon = training.icon === "code" ? Code2 : GraduationCap;
            const categoryName =
              (typeof training.category === "object"
                ? training.category?.name
                : training.category) ||
              training.categoryName ||
              "";

            return (
              <article
                className={styles.trainingCard}
                id={`trainings-${training.slug || training.id || training._id}`}
                key={training._id || training.slug || training.id}
                style={{ "--training-accent": training.color || "#2563eb" }}
              >
                <div className={styles.cardTop}>
                  <div className={styles.cardTopLeft}>
                    <span className={styles.programNumber}>
                      PROGRAM {String(index + 1).padStart(2, "0")}
                    </span>
                    {categoryName && (
                      <span className={styles.categoryBadge}>
                        {categoryName}
                      </span>
                    )}
                  </div>
                  <span className={styles.iconBox}>
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                </div>

                {training.image && (
                  <div className={styles.imageWrapper}>
                    <img
                      src={training.image}
                      alt={training.title}
                      className={styles.cardImage}
                      loading="lazy"
                      onError={(e) => {
                        if (!e.currentTarget.dataset.fallbackTried) {
                          e.currentTarget.dataset.fallbackTried = "true";
                          e.currentTarget.src = "/images/trainings/web-development-mern.jpg";
                        } else {
                          e.currentTarget.parentElement.style.display = "none";
                        }
                      }}
                    />
                  </div>
                )}

                <h3>
                  <Link
                    to={`/trainings/${training.slug || training.id || training._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {training.title}
                  </Link>
                </h3>
                <p className={styles.description}>
                  {training.shortDescription || training.description}
                </p>

                {(training.duration ||
                  training.mode ||
                  training.certificate ||
                  training.batchStartDate ||
                  training.fee) && (
                  <div className={styles.metaRow}>
                    {training.duration && (
                      <span className={styles.metaPill}>
                        <Clock size={12} strokeWidth={2} />
                        <span>{training.duration}</span>
                      </span>
                    )}
                    {training.mode && (
                      <span className={styles.metaPill}>
                        <MapPin size={12} strokeWidth={2} />
                        <span>{training.mode}</span>
                      </span>
                    )}
                    {training.certificate && (
                      <span className={styles.metaPill}>
                        <Award size={12} strokeWidth={2} />
                        <span>Certificate</span>
                      </span>
                    )}
                    {training.batchStartDate && (
                      <span className={styles.metaPill}>
                        <Calendar size={12} strokeWidth={2} />
                        <span>{training.batchStartDate}</span>
                      </span>
                    )}
                    {training.fee && (
                      <span className={styles.feePill}>{training.fee}</span>
                    )}
                  </div>
                )}

                {Array.isArray(training.technologies) &&
                  training.technologies.length > 0 && (
                    <div className={styles.techTags}>
                      {training.technologies.slice(0, 6).map((tech) => (
                        <span key={tech} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                      {training.technologies.length > 6 && (
                        <span className={styles.techTag}>
                          +{training.technologies.length - 6} more
                        </span>
                      )}
                    </div>
                  )}

                <Link
                  className={styles.contactLink}
                  to={`/trainings/${training.slug || training.id || training._id}`}
                >
                  View Program Details
                  <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}