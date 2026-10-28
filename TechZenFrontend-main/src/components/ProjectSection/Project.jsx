import { useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import usePublicContent from "../../hooks/usePublicContent";
import SEO from "../SEO/SEO";
import styles from "./Project.module.css";

export default function Project() {
  const { items: projects, loading, error } = usePublicContent("projects");
  const location = useLocation();
  const isProjectsPage = location.pathname === "/projects";

  return (
    <section className={styles.section} id="projects">
      {isProjectsPage && (
        <SEO
          title="Software Projects & Solutions in Chhatarpur | TechZen"
          description="Explore real-world software applications and enterprise digital solutions engineered by TechZen, the leading software and IT company in Chhatarpur, MP."
          ogDescription="Explore real-world software projects delivered by TechZen, the premier IT company in Chhatarpur, Madhya Pradesh."
          keywords="software company in chhatarpur, IT company in chhatarpur, software development chhatarpur, techzen projects, web applications chhatarpur"
          canonicalPath="/projects"
        />
      )}
      <div className={styles.container}>

        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>OUR WORK</p>

            <h2>
              Projects built for
              <em> real-world impact.</em>
            </h2>
          </div>

          <p className={styles.intro}>
            From digital platforms to intelligent business solutions, we
            create products that solve real problems and deliver measurable
            value.
          </p>
        </div>

        {projects.length === 0 && loading && (
          <p role="status">Loading projects...</p>
        )}
        {projects.length === 0 && error && <p role="alert">{error}</p>}
        {projects.length === 0 && !loading && !error && (
          <p>No projects to display right now.</p>
        )}
        <div className={styles.projectsList}>
          {projects.map((project, index) => (
            <article
              id={`projects-${project.slug || project.id || project._id}`}
              className={`${styles.project} ${
                index % 2 !== 0 ? styles.reverse : ""
              }`}
              key={project._id || project.slug}
            >
              {/* Project Visual */}
              <div className={styles.projectVisual}>
                <div className={styles.visualTop}>
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <span>{typeof project.category === "object" ? project.category?.name : project.category}</span>
                </div>

                <div className={styles.projectImage}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <span>{project.title}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Information */}
              <div className={styles.projectContent}>
                <div className={styles.projectMeta}>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{typeof project.category === "object" ? project.category?.name : project.category}</span>
                </div>

                <h3>{project.title}</h3>

                <p>{project.shortDescription || project.description}</p>

                {/* Technologies */}
                {project.technologies?.length > 0 && (
                  <div className={styles.technologies}>
                    {project.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                )}

                {/* Link */}
                {(project.projectUrl || project.link) && (
                  <a
                    href={project.projectUrl || project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    View project
                    <ArrowUpRight size={17} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}


