import { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa6";
import styles from "./OurTeamSection.module.css";
import usePublicContent from "../../hooks/usePublicContent";

/**
 * Helper to display bio up to 100 characters cleanly with ellipsis
 */
const formatBio = (bio, maxLength = 100) => {
  if (!bio) return "";
  const trimmed = bio.trim();
  if (trimmed.length <= maxLength) return trimmed;
  const slice = trimmed.slice(0, maxLength).trim();
  const lastSpace = slice.lastIndexOf(" ");
  const text = lastSpace > 75 ? slice.slice(0, lastSpace) : slice;
  return text.trim() + "...";
};

/**
 * Automatically applies smart face and subject centering for avatar photos.
 * Detects Cloudinary URLs and injects face-detection parameters so profile photos
 * are always centered inside the circular avatar container.
 */
const getCenteredAvatarUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (trimmed.includes("res.cloudinary.com") && trimmed.includes("/image/upload/")) {
    if (trimmed.includes("/image/upload/c_") || trimmed.includes("/image/upload/g_")) {
      return trimmed;
    }
    return trimmed.replace(
      "/image/upload/",
      "/image/upload/c_fill,g_face,w_500,h_500,q_auto,f_auto/"
    );
  }
  return trimmed;
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
              const rawPhone = (member.phone || "+919303878713").replace(/[^0-9]/g, "");
              const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
                `Hi ${member.name}, I would like to connect with you via TechZen.`
              )}`;

              const memberLinkedin =
                member.linkedin && member.linkedin.trim() !== ""
                  ? member.linkedin
                  : "https://www.linkedin.com/company/techzen-it-and-hr-service-llc/";

              const bioText =
                member.bio ||
                "Dedicated technology specialist contributing to TechZen's innovative engineering, product delivery, and client growth solutions.";

              const avatarUrl = getCenteredAvatarUrl(member.image);

              return (
                <div
                  key={`${member._id || member.id || member.name}-${index}`}
                  className={styles.card}
                >
                  <div className={styles.avatarWrapper}>
                    {member.image ? (
                      <img
                        src={avatarUrl}
                        alt={member.name}
                        className={styles.image}
                        loading="lazy"
                        onError={(e) => {
                          if (member.image && e.currentTarget.src !== member.image) {
                            e.currentTarget.src = member.image;
                            return;
                          }
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
                    {formatBio(bioText, 100)}
                  </p>

                  <div className={styles.footerRow}>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.socialBtn} ${styles.whatsappBtn}`}
                      aria-label={`Chat with ${member.name} on WhatsApp`}
                      title={`Chat with ${member.name} on WhatsApp`}
                    >
                      <FaWhatsapp size={16} className={styles.socialIcon} />
                      <span className={styles.socialLabel}>WhatsApp</span>
                    </a>

                    <a
                      href={memberLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.socialBtn} ${styles.linkedinBtn}`}
                      aria-label={`${member.name}'s LinkedIn Profile`}
                      title={`View ${member.name}'s LinkedIn Profile`}
                    >
                      <FaLinkedinIn size={14} className={styles.socialIcon} />
                      <span className={styles.socialLabel}>LinkedIn</span>
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