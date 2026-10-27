import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import styles from "./OurTeamSection.module.css";
import usePublicContent from "../../hooks/usePublicContent";

/**
 * Helper to display bio at approx 150 characters cleanly
 */
const formatBio = (bio, maxLength = 150) => {
  if (!bio) return "";
  const trimmed = bio.trim();
  if (trimmed.length <= maxLength) return trimmed;
  const slice = trimmed.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > maxLength - 30 ? slice.slice(0, lastSpace) : slice) + "…";
};

const OurTeam = () => {
  const { items: teamMembers, loading } = usePublicContent("team");
  const sliderData = [...teamMembers, ...teamMembers];
  const scrollPauseTimer = useRef();
  const [manualScrollPaused, setManualScrollPaused] = useState(false);

  useEffect(() => () => window.clearTimeout(scrollPauseTimer.current), []);

  const handleScroll = () => {
    setManualScrollPaused(true);
    window.clearTimeout(scrollPauseTimer.current);
    scrollPauseTimer.current = window.setTimeout(
      () => setManualScrollPaused(false),
      700
    );
  };

  if (!loading && teamMembers.length === 0) return null;

  return (
    <section className={styles.teamSection} id="team">
      <div className={styles.container}>
        <h2 className={styles.heading}>Meet Our Team</h2>

        <div
          className={`${styles.slider} ${manualScrollPaused ? styles.manualScrolling : ""}`}
          onScroll={handleScroll}
        >
          <div className={styles.track}>
            {sliderData.map((member, index) => {
              const memberPhone = member.phone || "+91 93020 39953";
              const rawTel = memberPhone.replace(/[^0-9+]/g, "");
              const memberLinkedin =
                member.linkedin && member.linkedin.trim() !== ""
                  ? member.linkedin
                  : "https://www.linkedin.com/company/techzen-it-and-hr-service-llc/";

              const bioText =
                member.bio ||
                "Dedicated technology specialist contributing to TechZen's innovative engineering, product delivery, and client growth solutions.";

              return (
                <div
                  key={`${member._id || member.id || member.name}-${index}`}
                  className={styles.card}
                >
                  <div className={styles.avatarWrapper}>
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className={styles.image}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget.nextElementSibling;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={styles.avatarFallback}
                      style={{ display: member.image ? "none" : "flex" }}
                      aria-label={member.name}
                    >
                      {(member.name || "TZ")
                        .split(/\s+/)
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  </div>

                  <h3 className={styles.memberName}>{member.name}</h3>

                  <div className={styles.designationBadge}>
                    {member.designation}
                  </div>

                  <p className={styles.bioText} title={member.bio}>
                    {formatBio(bioText, 150)}
                  </p>

                  <div className={styles.footerRow}>
                    <a
                      href={`tel:${rawTel}`}
                      className={styles.phoneLink}
                      title={`Call ${member.name} (${memberPhone})`}
                    >
                      <Phone size={13} className={styles.phoneIcon} />
                      <span className={styles.phoneText}>{memberPhone}</span>
                    </a>

                    <a
                      href={memberLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkedinBtn}
                      aria-label={`${member.name}'s LinkedIn Profile`}
                      title="View LinkedIn Profile"
                    >
                      <FaLinkedinIn size={14} className={styles.linkedinIcon} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;