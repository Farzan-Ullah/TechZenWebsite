import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Sparkles,
  Search,
  Clock,
  MapPin,
  Calendar,
  Award,
  CheckCircle2,
  ArrowRight,
  Code2,
  BookOpen,
  Users,
  Briefcase,
  HelpCircle,
  Laptop,
  Check,
  FolderGit2,
  MessageCircle,
} from "lucide-react";
import usePublicContent from "../../hooks/usePublicContent";
import useGroupedTrainings from "../../hooks/useGroupedTrainings";
import { Tranings as fallbackTrainings, company } from "../../data/siteData";
import SEO from "../../components/SEO/SEO";
import styles from "./TrainingsPage.module.css";

const academyPerks = [
  {
    icon: Code2,
    title: "100% Production-Grade Projects",
    description: "No toy exercises or synthetic code. Build scalable real-world features on live enterprise architectures.",
  },
  {
    icon: Users,
    title: "Daily 1-on-1 Tech Mentorship",
    description: "Learn directly from active senior software architects, DevOps engineers, and full-stack consultants.",
  },
  {
    icon: Award,
    title: "Industry Recognized Certification",
    description: "Receive verified experience credentials and project portfolios endorsed by TechZen Consulting.",
  },
  {
    icon: Briefcase,
    title: "Placement Assistance & Mocks",
    description: "Dedicated resume reviews, technical mock interviews, DSA coaching, and candidate referrals.",
  },
];

export default function TrainingsPage() {
  const navigate = useNavigate();
  const { items: allTrainings, loading: trainingsLoading } = usePublicContent(
    "trainings",
    fallbackTrainings
  );
  const { categories: groupedCategories } = useGroupedTrainings();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Compute category options from grouped data + flat list
  const categoryTabs = useMemo(() => {
    const list = [{ id: "all", label: "All Programs" }];
    const seenNames = new Set();

    (groupedCategories || []).forEach((cat) => {
      const name = cat.name?.trim();
      if (name && !seenNames.has(name.toLowerCase()) && (cat.trainings?.length || 0) > 0) {
        seenNames.add(name.toLowerCase());
        list.push({ id: name, label: name });
      }
    });

    // Also collect any categories from flat trainings
    (allTrainings || []).forEach((t) => {
      const catName =
        (typeof t.category === "object" ? t.category?.name : t.category) ||
        t.categoryName ||
        "";
      const trimmed = catName.trim();
      if (trimmed && !seenNames.has(trimmed.toLowerCase())) {
        seenNames.add(trimmed.toLowerCase());
        list.push({ id: trimmed, label: trimmed });
      }
    });

    return list;
  }, [groupedCategories, allTrainings]);

  // Filtered trainings
  const filteredTrainings = useMemo(() => {
    return (allTrainings || []).filter((training) => {
      const catName =
        (typeof training.category === "object" ? training.category?.name : training.category) ||
        training.categoryName ||
        "";

      const matchesCat =
        selectedCategory === "all" ||
        catName.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        training.title?.toLowerCase().includes(query) ||
        training.shortDescription?.toLowerCase().includes(query) ||
        training.description?.toLowerCase().includes(query) ||
        catName.toLowerCase().includes(query) ||
        (Array.isArray(training.technologies) &&
          training.technologies.some((tech) => tech.toLowerCase().includes(query)));

      return matchesCat && matchesSearch;
    });
  }, [allTrainings, selectedCategory, searchQuery]);

  const handleEnquiry = (programTitle) => {
    const encoded = encodeURIComponent(`Training Program: ${programTitle}`);
    navigate(`/?applyFor=${encoded}#contact`);
    setTimeout(() => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  };

  const whatsappCounselingUrl = `https://wa.me/919303878713?text=${encodeURIComponent(
    "Hi TechZen, I would like to schedule a free training & career counseling session."
  )}`;

  return (
    <div className={styles.trainingsPage}>
      <SEO
        title="Industrial & Web Development Training in Chhatarpur | TechZen"
        description="Join top-rated Industrial Training, Software Development Training, and Web Development (MERN Stack) in Chhatarpur at TechZen Academy. Live projects & certification."
        ogDescription="Top-rated Industrial Training and Web Development Training in Chhatarpur at TechZen Academy with live projects and 1-on-1 mentorship."
        keywords="industrial training in chhatarpur, software development training in chhatarpur, web development training in chhatarpur, IT company in chhatarpur, software company in chhatarpur, mern stack training chhatarpur, summer training in chhatarpur, coding academy chhatarpur"
        canonicalPath="/trainings"
      />
      <div className={styles.ambientGlow} />

      <div className={styles.container}>
        {/* =========================================================
            HERO / PAGE HEADER
            ========================================================= */}
        <header className={styles.heroSection}>
          <div className={styles.badge}>
            <GraduationCap size={15} className={styles.badgeIcon} />
            <span>TECHZEN ACADEMY • CHHATARPUR, MP</span>
          </div>

          <h1 className={styles.title}>
            Industry-Grade <span className={styles.gradientText}>Software &amp; Industrial Training</span> in Chhatarpur
          </h1>

          <p className={styles.subtitle}>
            Bridge the gap between theoretical textbooks and production software engineering. 
            Hands-on Industrial Training, Web Development (MERN Stack), and Software Development Training with 1-on-1 mentorship from senior software consultants at TechZen Chhatarpur.
          </p>

          <div className={styles.statsStrip}>
            <div className={styles.statItem}>
              <strong>100%</strong>
              <span>Practical Live Coding</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <strong>1-on-1</strong>
              <span>Tech Lead Mentorship</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <strong>Verified</strong>
              <span>Industry Credentials</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <strong>Flexible</strong>
              <span>Hybrid / Online Modes</span>
            </div>
          </div>
        </header>

        {/* =========================================================
            CONTROLS: CATEGORY TABS & SEARCH
            ========================================================= */}
        <div className={styles.controlsWrap}>
          {/* Category Tabs */}
          <div className={styles.tabsList} role="tablist">
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              const count =
                tab.id === "all"
                  ? (allTrainings || []).length
                  : (allTrainings || []).filter((t) => {
                      const cName =
                        (typeof t.category === "object" ? t.category?.name : t.category) ||
                        t.categoryName ||
                        "";
                      return cName.toLowerCase() === tab.id.toLowerCase();
                    }).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
                  onClick={() => setSelectedCategory(tab.id)}
                >
                  <span>{tab.label}</span>
                  <span className={styles.tabCount}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by module, technology (e.g. React, Node, Python, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search training courses"
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearSearchBtn}
                onClick={() => setSearchQuery("")}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className={styles.resultsCounter}>
          <span>
            Showing <strong>{filteredTrainings.length}</strong> {filteredTrainings.length === 1 ? "training program" : "training programs"}
          </span>
          {(selectedCategory !== "all" || searchQuery) && (
            <button
              type="button"
              className={styles.resetFiltersBtn}
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* =========================================================
            TRAINING COURSES GRID
            ========================================================= */}
        {filteredTrainings.length === 0 ? (
          <div className={styles.noCoursesFound}>
            <GraduationCap size={44} className={styles.noCoursesIcon} />
            <h3>No training programs match your criteria</h3>
            <p>Try searching for a different technology or select a different category.</p>
            <button
              type="button"
              className={styles.resetSearchCta}
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              Show All Courses
            </button>
          </div>
        ) : (
          <div className={styles.coursesGrid}>
            {filteredTrainings.map((training, index) => {
              const programSlug = training.slug || training.id || training._id;
              const categoryName =
                (typeof training.category === "object"
                  ? training.category?.name
                  : training.category) ||
                training.categoryName ||
                "Professional Training";

              const bullets =
                Array.isArray(training.features) && training.features.length > 0
                  ? training.features.slice(0, 3)
                  : Array.isArray(training.whatStudentsWillLearn) &&
                    training.whatStudentsWillLearn.length > 0
                  ? training.whatStudentsWillLearn.slice(0, 3)
                  : [];

              const technologies = Array.isArray(training.technologies)
                ? training.technologies.slice(0, 6)
                : [];

              const noFeeSlugs = ["industrial-training", "summer-training", "internship-programs"];
              const isNoFee = noFeeSlugs.includes(programSlug);
              const showFee = !isNoFee && Boolean(training.pricing?.discountedFee || training.pricing?.totalFee || training.fee);

              const totalFee = showFee ? (training.pricing?.totalFee || training.fee || "") : "";
              const discountedFee = showFee ? (training.pricing?.discountedFee || "") : "";

              let discountPercent = null;
              if (showFee && totalFee && discountedFee) {
                const numTotal = parseInt(totalFee.replace(/[^\d]/g, ""), 10);
                const numDisc = parseInt(discountedFee.replace(/[^\d]/g, ""), 10);
                if (!isNaN(numTotal) && !isNaN(numDisc) && numTotal > numDisc) {
                  discountPercent = Math.round(((numTotal - numDisc) / numTotal) * 100);
                }
              }

              // Extract first capstone project name if available
              const firstProject =
                Array.isArray(training.projects) && training.projects.length > 0
                  ? typeof training.projects[0] === "string"
                    ? training.projects[0]
                    : training.projects[0].title
                  : null;

              return (
                <article key={programSlug} className={styles.courseCard}>
                  {/* Visual Banner Container */}
                  <div className={styles.bannerWrapper}>
                    <img
                      src={training.image || "/images/trainings/industrial-training.jpg"}
                      alt={training.title}
                      className={styles.bannerImage}
                      loading="lazy"
                      onError={(e) => {
                        if (!e.currentTarget.dataset.fallbackTried) {
                          e.currentTarget.dataset.fallbackTried = "true";
                          e.currentTarget.src = "/images/trainings/web-development-mern.jpg";
                        }
                      }}
                    />
                    <div className={styles.bannerOverlay} />
                    
                    {/* Top Tag Badges over Image */}
                    <div className={styles.bannerTopTags}>
                      <span className={styles.categoryBadge}>{categoryName}</span>
                      <span className={styles.programIndex}>#{String(index + 1).padStart(2, "0")}</span>
                    </div>

                    {/* Bottom Info over Image */}
                    <div className={styles.bannerBottomTags}>
                      {training.duration && (
                        <span className={styles.bannerDurationBadge}>
                          <Clock size={12} />
                          <span>{training.duration}</span>
                        </span>
                      )}
                      {training.mode && (
                        <span className={styles.bannerModeBadge}>
                          <MapPin size={12} />
                          <span>{training.mode}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className={styles.cardContent}>
                    {/* Title */}
                    <h2 className={styles.courseTitle}>
                      <Link to={`/trainings/${programSlug}`}>{training.title}</Link>
                    </h2>

                    {/* Tagline */}
                    {training.tagline && (
                      <div className={styles.courseTagline}>
                        <Sparkles size={12} className={styles.taglineIcon} />
                        <span>{training.tagline}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className={styles.courseDesc}>
                      {training.shortDescription || training.description}
                    </p>

                    {/* Metadata Pills */}
                    <div className={styles.metaRow}>
                      {training.schedule && (
                        <span className={styles.metaPill}>
                          <Calendar size={13} />
                          <span>{training.schedule.split("(")[0].trim()}</span>
                        </span>
                      )}
                      {training.certificate && (
                        <span className={styles.metaPill}>
                          <Award size={13} />
                          <span>Verified Certificate</span>
                        </span>
                      )}
                    </div>

                    {/* Key Highlights / Bullets */}
                    {bullets.length > 0 && (
                      <ul className={styles.highlightsList}>
                        {bullets.map((b, i) => (
                          <li key={i}>
                            <CheckCircle2 size={14} className={styles.checkIcon} />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Featured Capstone Teaser */}
                    {firstProject && (
                      <div className={styles.capstoneTeaser}>
                        <FolderGit2 size={14} className={styles.capstoneIcon} />
                        <span className={styles.capstoneText}>
                          <strong>Capstone:</strong> {firstProject}
                        </span>
                      </div>
                    )}

                    {/* Technology Tags */}
                    {technologies.length > 0 && (
                      <div className={styles.techTagsRow}>
                        {technologies.map((tech, idx) => (
                          <span key={idx} className={styles.techPill}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className={`${styles.cardFooter} ${!showFee ? styles.cardFooterNoFee : ""}`}>
                    {showFee && (
                      <div className={styles.priceContainer}>
                        <span className={styles.priceLabel}>Admission Fee:</span>
                        <div className={styles.priceRow}>
                          <strong className={styles.priceValue}>
                            {discountedFee || totalFee}
                          </strong>
                          {discountedFee && (
                            <span className={styles.originalPrice}>{totalFee}</span>
                          )}
                          {discountPercent && (
                            <span className={styles.discountBadge}>-{discountPercent}%</span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className={`${styles.cardActionGroup} ${!showFee ? styles.cardActionGroupFull : ""}`}>
                      <button
                        type="button"
                        className={styles.enquireBtn}
                        onClick={() => handleEnquiry(training.title)}
                        title={`Enquire for ${training.title}`}
                      >
                        Enquire
                      </button>

                      <Link
                        to={`/trainings/${programSlug}`}
                        className={styles.detailsBtn}
                        title={`View ${training.title} syllabus`}
                      >
                        <span>Curriculum</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* =========================================================
            WHY CHOOSE TECHZEN ACADEMY (VALUE PROPS)
            ========================================================= */}
        <section className={styles.perksSection}>
          <div className={styles.perksHeader}>
            <span className={styles.perksEyebrow}>WHY LEARN WITH TECHZEN</span>
            <h2 className={styles.perksTitle}>The TechZen Academy Advantage</h2>
            <p className={styles.perksSubtitle}>
              Built by experienced engineers to transform ambitious students and graduates 
              into job-ready technical talent.
            </p>
          </div>

          <div className={styles.perksGrid}>
            {academyPerks.map((perk, i) => {
              const IconComp = perk.icon;
              return (
                <div key={i} className={styles.perkCard}>
                  <div className={styles.perkIconWrap}>
                    <IconComp size={24} />
                  </div>
                  <h3 className={styles.perkTitle}>{perk.title}</h3>
                  <p className={styles.perkDesc}>{perk.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            CAREER COUNSELING / ENROLLMENT BANNER
            ========================================================= */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBadge}>
              <Sparkles size={14} />
              <span>FREE CAREER COUNSELING</span>
            </div>
            <h2 className={styles.ctaTitle}>
              Need Guidance on Choosing the Right Training Track?
            </h2>
            <p className={styles.ctaDesc}>
              Connect directly with our senior instructors and counselors to evaluate your 
              background, discuss syllabus details, and pick the optimal program.
            </p>
          </div>

          <div className={styles.ctaButtonGroup}>
            <button
              type="button"
              className={styles.bannerActionBtn}
              onClick={() => handleEnquiry("General Academic & Training Counseling")}
            >
              <span>Book Free Counseling</span>
              <ArrowRight size={17} />
            </button>
            <a
              href={whatsappCounselingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bannerWhatsappBtn}
            >
              <MessageCircle size={17} />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
