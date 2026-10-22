import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  Sparkles,
  Code2,
  UsersRound,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Laptop,
  CheckCircle2,
  MailQuestion,
} from "lucide-react";
import { careerTracks, careerPerks } from "../../data/careersData";
import styles from "./Careers.module.css";

const trackIcons = {
  Code2,
  UsersRound,
  GraduationCap,
};

const perkIcons = {
  Code2,
  Rocket,
  GraduationCap,
  Laptop,
  TrendingUp,
  ShieldCheck,
};

export default function Careers({ isStandalonePage = false }) {
  const navigate = useNavigate();

  // Redirect to contact form with pre-filled enquiry topic
  const handleEnquiry = (topic) => {
    const encoded = encodeURIComponent(topic);
    navigate(`/?applyFor=${encoded}#contact`);

    setTimeout(() => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  };

  return (
    <section
      className={`${styles.careersSection} ${
        isStandalonePage ? styles.standalonePadding : ""
      }`}
      id="careers"
      aria-label="TechZen Careers & Internships"
    >
      <div className={styles.ambientGlow} />

      <div className={styles.container}>
        {/* SECTION HEADER */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Sparkles size={14} className={styles.badgeIcon} />
            <span>CAREERS &amp; OPPORTUNITIES AT TECHZEN</span>
          </div>

          <h2 className={styles.title}>
            Grow Your Future in{" "}
            <span className={styles.gradientText}>IT, Non-IT &amp; Internships</span>
          </h2>

          <p className={styles.subtitle}>
            Whether you are an experienced software engineer, a recruitment and operations specialist, 
            or an ambitious student seeking hands-on industry internship experience, TechZen provides 
            the mentorship, high-impact projects, and growth platform you need.
          </p>
        </div>

        {/* 3 EXPANDED PILLARS: IT, NON-IT, INTERNSHIPS */}
        <div className={styles.tracksGrid}>
          {careerTracks.map((track) => {
            const IconComp = trackIcons[track.icon] || Code2;
            const cardVariantClass =
              track.id === "it"
                ? styles.trackCardIT
                : track.id === "non-it"
                ? styles.trackCardNonIT
                : styles.trackCardIntern;

            return (
              <div key={track.id} className={`${styles.trackCard} ${cardVariantClass}`}>
                {/* Top Badge & Icon */}
                <div className={styles.trackTop}>
                  <div className={styles.trackIconWrap}>
                    <IconComp size={26} />
                  </div>
                  <span className={styles.trackBadge}>{track.badge}</span>
                </div>

                {/* Title & Tagline */}
                <h3 className={styles.trackTitle}>{track.title}</h3>
                <p className={styles.trackTagline}>{track.tagline}</p>
                <p className={styles.trackDesc}>{track.description}</p>

                {/* Specializations & Focus Areas */}
                <div className={styles.specSection}>
                  <h4 className={styles.specHeading}>Key Focus Areas &amp; Programs:</h4>
                  <ul className={styles.specList}>
                    {track.specializations.map((item, idx) => (
                      <li key={idx} className={styles.specItem}>
                        <CheckCircle2 size={16} className={styles.specIcon} />
                        <div>
                          <strong>{item.title}:</strong>
                          <span> {item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Candidate Profile / Who should apply */}
                <div className={styles.whoBox}>
                  <span className={styles.whoLabel}>Candidate Profile:</span>
                  <p className={styles.whoText}>{track.whoShouldApply}</p>
                </div>

                {/* Tech Stack / Skill Pills */}
                <div className={styles.skillsSection}>
                  <span className={styles.skillsLabel}>Key Technologies &amp; Domains:</span>
                  <div className={styles.skillsTags}>
                    {track.techStack.map((tech, idx) => (
                      <span key={idx} className={styles.skillTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dedicated Enquiry Button */}
                <div className={styles.trackAction}>
                  <button
                    type="button"
                    className={styles.enquireBtn}
                    onClick={() => handleEnquiry(track.enquiryTopic)}
                  >
                    <span>{track.ctaLabel}</span>
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* WHY WORK AT TECHZEN — CULTURE & PERKS */}
        <div className={styles.perksSection}>
          <div className={styles.perksHeader}>
            <span className={styles.perksEyebrow}>CULTURE &amp; WORK ENVIRONMENT</span>
            <h3 className={styles.perksTitle}>Why Ambitious Talent Chooses TechZen</h3>
            <p className={styles.perksSubtitle}>
              We empower team members and interns with autonomy, structured mentorship, 
              modern tools, and enterprise-grade live project experience.
            </p>
          </div>

          <div className={styles.perksGrid}>
            {careerPerks.map((perk, i) => {
              const IconComp = perkIcons[perk.icon] || Sparkles;
              return (
                <div key={i} className={styles.perkCard}>
                  <div className={styles.perkIconWrap}>
                    <IconComp size={22} />
                  </div>
                  <h4 className={styles.perkCardTitle}>{perk.title}</h4>
                  <p className={styles.perkCardDesc}>{perk.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* PROMINENT BOTTOM ENQUIRY CALLOUT BANNER */}
        <div className={styles.enquiryBanner}>
          <div className={styles.enquiryContent}>
            <div className={styles.enquiryBadge}>
              <MailQuestion size={15} />
              <span>CAREERS &amp; INTERNSHIP ENQUIRY</span>
            </div>
            <h3 className={styles.enquiryTitle}>
              Have Questions About Opportunities or Internships?
            </h3>
            <p className={styles.enquiryDesc}>
              Whether you want to know about our upcoming internship batches, IT engineering roles, 
              recruitment openings, or eligibility criteria—reach out directly to our talent team. 
              We respond promptly to all candidate inquiries.
            </p>
          </div>

          <button
            type="button"
            className={styles.bannerCtaBtn}
            onClick={() => handleEnquiry("General Careers & Internship Enquiry")}
          >
            <span>Enquire / Contact Us</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
