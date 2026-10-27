import { useEffect, useState, useRef, useMemo } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  BriefcaseBusiness,
  Briefcase,
  MessagesSquare,
  House,
  UsersRound,
  GraduationCap,
  Building2,
  Sun,
  Users,
  FileText,
  Code2,
  BarChart3,
  Phone,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { company, Tranings } from "../../data/siteData";
import styles from "./Navbar.module.css";
import usePublicContent from "../../hooks/usePublicContent";
import useCompanyContent from "../../hooks/useCompanyContent";
import useGroupedTrainings from "../../hooks/useGroupedTrainings";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import BrandLogo from "../BrandLogo/BrandLogo";

export default function Navbar() {
  const { items: projects } = usePublicContent("projects");
  const { items: services } = usePublicContent("services");
  const { items: trainingItems } = usePublicContent("trainings", Tranings);
  const { categories: groupedTrainings } = useGroupedTrainings();
  const { company: companyInfo } = useCompanyContent();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileTrainingsOpen, setMobileTrainingsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    setMobileProjectsOpen(false);
    setMobileServicesOpen(false);
    setMobileTrainingsOpen(false);
  };

  const handleHashClick = (href, e) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (location.pathname === "/" || location.pathname === "") {
        const el = document.getElementById(targetId);
        if (el) {
          e?.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  const homeLinks = [
    ["Home", "/#home"],
    ["About", "/#about"],
    ["Why Us", "/#why-us"],
    ["Process", "/#process"],
    ["FAQ", "/#faq"],
  ];

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropVisible : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <div className={styles.navWrap}>
            {/* BRAND LOGO */}
            <Link
              to="/"
              className={styles.brand}
              onClick={closeMenu}
              aria-label={`${company.name} Home`}
            >
              <BrandLogo className={styles.logo} alt="TechZen" />
            </Link>

            {/* DESKTOP NAV */}
            <nav className={styles.desktopNav} aria-label="Primary navigation">
              {homeLinks.slice(0, 2).map(([label, href]) => (
                <Link
                  key={href}
                  to={href}
                  onClick={(e) => handleHashClick(href, e)}
                >
                  {label}
                </Link>
              ))}

              <NavbarDropdown
                title="Services"
                items={services}
                viewAllLink="/#services"
                handleHashClick={handleHashClick}
              />

              <NavbarDropdown
                title="Products"
                items={projects}
                viewAllLink="/#projects"
                handleHashClick={handleHashClick}
              />

              <TrainingNavbarDropdown
                trainings={trainingItems || Tranings}
                handleHashClick={handleHashClick}
              />

              <Link
                to="/#careers"
                onClick={(e) => handleHashClick("/#careers", e)}
              >
                Careers
              </Link>

              <Link
                to="/#faq"
                onClick={(e) => handleHashClick("/#faq", e)}
              >
                FAQ
              </Link>
            </nav>

            {/* DESKTOP RIGHT ACTIONS (THEME TOGGLE & CTA) */}
            <div className={styles.desktopActions}>
              <ThemeToggle />
              <Link
                className={styles.navCta}
                to="/#contact"
                onClick={(e) => handleHashClick("/#contact", e)}
              >
                Book a Consultation
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* MOBILE RIGHT ACTIONS */}
            <div className={styles.mobileActions}>
              <ThemeToggle className={styles.mobileToggle} />
              <button
                className={`${styles.menuButton} ${open ? styles.menuButtonOpen : ""}`}
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls="mobileNav"
                aria-label={open ? "Close navigation" : "Open navigation"}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <aside
        id="mobileNav"
        className={`${styles.mobileSidebar} ${open ? styles.sidebarOpen : ""}`}
        aria-hidden={!open}
      >
        <div className={styles.sidebarInner}>
          <nav className={styles.mobileNav}>
            {/* HOME */}
            <Link
              to="/#home"
              className={styles.mobileNavLink}
              onClick={(e) => {
                closeMenu();
                handleHashClick("/#home", e);
              }}
            >
              <div className={styles.mobileNavLeft}>
                <House size={18} className={styles.mobileNavIcon} />
                <span>Home</span>
              </div>
              <ChevronRight size={16} className={styles.mobileNavArrow} />
            </Link>

            {/* ABOUT */}
            <Link
              to="/#about"
              className={styles.mobileNavLink}
              onClick={(e) => {
                closeMenu();
                handleHashClick("/#about", e);
              }}
            >
              <div className={styles.mobileNavLeft}>
                <UsersRound size={18} className={styles.mobileNavIcon} />
                <span>About</span>
              </div>
              <ChevronRight size={16} className={styles.mobileNavArrow} />
            </Link>

            {/* SERVICES DROPDOWN */}
            <NavbarDropdownMobileView
              title="Services"
              items={services}
              isOpen={mobileServicesOpen}
              onToggle={() => setMobileServicesOpen(!mobileServicesOpen)}
              icon={BriefcaseBusiness}
              closeMenu={closeMenu}
              handleHashClick={handleHashClick}
            />

            {/* PRODUCTS DROPDOWN */}
            <NavbarDropdownMobileView
              title="Products"
              items={projects}
              isOpen={mobileProjectsOpen}
              onToggle={() => setMobileProjectsOpen(!mobileProjectsOpen)}
              icon={BriefcaseBusiness}
              closeMenu={closeMenu}
              handleHashClick={handleHashClick}
            />

            {/* TRAINING DROPDOWN */}
            <TrainingNavbarDropdownMobileView
              trainings={trainingItems || Tranings}
              isOpen={mobileTrainingsOpen}
              onToggle={() => setMobileTrainingsOpen(!mobileTrainingsOpen)}
              closeMenu={closeMenu}
            />

            {/* CAREERS */}
            <Link
              to="/#careers"
              className={styles.mobileNavLink}
              onClick={(e) => {
                closeMenu();
                handleHashClick("/#careers", e);
              }}
            >
              <div className={styles.mobileNavLeft}>
                <Briefcase size={18} className={styles.mobileNavIcon} />
                <span>Careers</span>
              </div>
              <ChevronRight size={16} className={styles.mobileNavArrow} />
            </Link>

            {/* FAQ */}
            <Link
              to="/#faq"
              className={styles.mobileNavLink}
              onClick={(e) => {
                closeMenu();
                handleHashClick("/#faq", e);
              }}
            >
              <div className={styles.mobileNavLeft}>
                <MessagesSquare size={18} className={styles.mobileNavIcon} />
                <span>FAQ</span>
              </div>
              <ChevronRight size={16} className={styles.mobileNavArrow} />
            </Link>

            {/* CTA */}
            <Link
              className={styles.mobileCta}
              to="/#contact"
              onClick={(e) => {
                closeMenu();
                handleHashClick("/#contact", e);
              }}
            >
              Book a Consultation
              <ArrowRight size={17} />
            </Link>
          </nav>

          <div className={styles.sidebarFooter}>
            <span>© {new Date().getFullYear()}</span>
            <span>{companyInfo.name || company.name}</span>
          </div>
        </div>
      </aside>
    </>
  );
}

// =========================================================================
// HELPER FOR BANNER TRAINING ICONS
// =========================================================================

function getProgramIcon(iconType) {
  switch (iconType) {
    case "building":
      return Building2;
    case "sun":
      return Sun;
    case "users":
      return Users;
    case "file-text":
      return FileText;
    case "code":
      return Code2;
    case "bar-chart":
      return BarChart3;
    default:
      return GraduationCap;
  }
}

// =========================================================================
// DESKTOP BANNER-ALIGNED TRAINING MEGA DROPDOWN
// =========================================================================

function TrainingNavbarDropdown({ trainings = Tranings, handleHashClick }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const items = useMemo(() => {
    const source = Array.isArray(trainings) && trainings.length > 0 ? trainings : Tranings;
    const map = new Map();
    // Guarantee the 5 core company banner training modules are always present
    (Tranings || []).forEach((t) => map.set(t.slug, t));
    source.forEach((t) => {
      if (t.slug) {
        map.set(t.slug, { ...map.get(t.slug), ...t });
      }
    });
    return Array.from(map.values());
  }, [trainings]);

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdown} ${styles.trainingDropdownContainer}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to="/trainings"
        className={styles.dropdownTrigger}
        onClick={() => setOpen(false)}
        aria-expanded={open}
      >
        <span>Training</span>
        <ChevronDown size={15} />
      </Link>

      <div
        className={`${styles.dropdownMenu} ${styles.trainingMegaMenu} ${
          open ? styles.dropdownMenuVisible : ""
        }`}
      >
        {/* Header strip */}
        <div className={styles.trainingMegaHeader}>
          <div className={styles.trainingHeaderLeft}>
            <div className={styles.trainingHeaderIcon}>
              <GraduationCap size={18} />
            </div>
            <div>
              <div className={styles.trainingHeaderTitle}>
                Career &amp; IT Training Programs
              </div>
              <div className={styles.trainingHeaderSub}>
                Practical Skills · Real-World Projects · Job-Ready Training
              </div>
            </div>
          </div>
          <span className={styles.trainingHeaderBadge}>
            {items.length} Career Programs
          </span>
        </div>

        {/* 2-Column Grid of Banner Modules */}
        <div className={styles.trainingGridMega}>
          {items.map((item) => {
            const IconComponent = getProgramIcon(item.icon);
            const accentColor = item.color || "#0ea5e9";
            return (
              <Link
                key={item._id || item.slug || item.id}
                to={`/trainings/${item.slug || item.id || item._id}`}
                className={styles.trainingCardItem}
                onClick={() => setOpen(false)}
                style={{ "--card-accent": accentColor }}
              >
                <div
                  className={styles.trainingCardIconBox}
                  style={{
                    backgroundColor: `${accentColor}18`,
                    borderColor: `${accentColor}40`,
                    color: accentColor,
                  }}
                >
                  <IconComponent size={20} />
                </div>
                <div className={styles.trainingCardContent}>
                  <div className={styles.trainingCardTitleRow}>
                    <span className={styles.trainingCardTitle}>
                      {item.title}
                    </span>
                    <ArrowRight
                      size={13}
                      className={styles.trainingCardArrow}
                    />
                  </div>
                  <p className={styles.trainingCardTagline}>
                    {item.tagline || item.shortDescription?.slice(0, 50)}
                  </p>
                  <div className={styles.trainingCardPills}>
                    <span className={styles.trainingCardPill}>
                      {item.duration || "Self-Paced"}
                    </span>
                    <span className={styles.trainingCardPill}>
                      {item.mode || "Hybrid"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mega Footer with View All & Admissions Hotline */}
        <div className={styles.trainingMegaFooter}>
          <Link
            to="/trainings"
            className={styles.trainingFooterViewAll}
            onClick={() => setOpen(false)}
          >
            <span>Explore All Training Modules &amp; Curriculums</span>
            <ArrowRight size={14} />
          </Link>
          <a
            href="tel:+919303878713"
            className={styles.trainingFooterPhone}
          >
            <Phone size={13} />
            <span>Admissions: +91 9303878713</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// MOBILE BANNER TRAINING DROPDOWN
// =========================================================================

function TrainingNavbarDropdownMobileView({
  trainings = Tranings,
  isOpen,
  onToggle,
  icon: Icon = GraduationCap,
  closeMenu,
}) {
  const items = useMemo(() => {
    const source = Array.isArray(trainings) && trainings.length > 0 ? trainings : Tranings;
    const map = new Map();
    (Tranings || []).forEach((t) => map.set(t.slug, t));
    source.forEach((t) => {
      if (t.slug) {
        map.set(t.slug, { ...map.get(t.slug), ...t });
      }
    });
    return Array.from(map.values());
  }, [trainings]);

  return (
    <div className={styles.mobileDropdown}>
      <div className={styles.mobileDropdownTriggerRow}>
        <Link
          to="/trainings"
          onClick={closeMenu}
          className={styles.mobileDropdownLink}
        >
          <div className={styles.mobileNavLeft}>
            <Icon size={18} className={styles.mobileNavIcon} />
            <span>Training</span>
          </div>
        </Link>
        <button
          type="button"
          className={styles.mobileDropdownToggleBtn}
          onClick={onToggle}
          aria-label="Toggle training courses list"
        >
          <ChevronDown
            size={16}
            className={isOpen ? styles.chevronOpen : ""}
          />
        </button>
      </div>

      <div
        className={`${styles.mobileDropdownMenu} ${
          isOpen ? styles.mobileDropdownOpen : ""
        }`}
      >
        {items.map((item) => {
          const IconComp = getProgramIcon(item.icon);
          const accentColor = item.color || "#0ea5e9";
          return (
            <Link
              key={item._id || item.slug || item.id}
              to={`/trainings/${item.slug || item.id || item._id}`}
              onClick={closeMenu}
              className={styles.mobileTrainingItem}
              style={{ "--mobile-accent": accentColor }}
            >
              <div
                className={styles.mobileTrainingIconBox}
                style={{
                  backgroundColor: `${accentColor}18`,
                  borderColor: `${accentColor}40`,
                  color: accentColor,
                }}
              >
                <IconComp size={16} />
              </div>
              <div className={styles.mobileTrainingText}>
                <div className={styles.mobileTrainingTitle}>
                  {item.title}
                </div>
                <div className={styles.mobileTrainingSub}>
                  {item.tagline || `${item.duration} · ${item.mode}`}
                </div>
              </div>
              <ArrowRight size={14} className={styles.mobileTrainingArrow} />
            </Link>
          );
        })}

        <Link
          to="/trainings"
          onClick={closeMenu}
          className={styles.mobileViewAllLink}
        >
          <span>View All Training Programs</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

// =========================================================================
// STANDARD DROPDOWNS (SERVICES, PRODUCTS)
// =========================================================================

function NavbarDropdown({ title, items, viewAllLink, handleHashClick }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={viewAllLink}
        className={styles.dropdownTrigger}
        onClick={(e) => {
          setOpen(false);
          handleHashClick(viewAllLink, e);
        }}
      >
        <span>{title}</span>
        <ChevronDown size={15} />
      </Link>

      <div
        className={`${styles.dropdownMenu} ${
          open ? styles.dropdownMenuVisible : ""
        }`}
      >
        {items.map((item, index) => (
          <Link
            key={item._id || item.slug || item.id}
            to={`/#${title.toLowerCase().replace(/\s+/g, "-")}-${
              item.slug || item.id || item._id
            }`}
            onClick={(e) => {
              setOpen(false);
              handleHashClick(
                `/#${title.toLowerCase().replace(/\s+/g, "-")}-${
                  item.slug || item.id || item._id
                }`,
                e
              );
            }}
            className={styles.dropdownItem}
          >
            <span className={styles.dropdownNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item.title}</span>
            <ArrowRight size={15} className={styles.dropdownArrow} />
          </Link>
        ))}

        <Link
          to={viewAllLink}
          className={styles.dropdownFooter}
          onClick={(e) => {
            setOpen(false);
            handleHashClick(viewAllLink, e);
          }}
        >
          View All {title}
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

function NavbarDropdownMobileView({
  title,
  items,
  isOpen,
  onToggle,
  icon: Icon,
  closeMenu,
  handleHashClick,
}) {
  return (
    <div className={styles.mobileDropdown}>
      <button
        type="button"
        className={styles.mobileDropdownTrigger}
        onClick={onToggle}
      >
        <div className={styles.mobileNavLeft}>
          {Icon && <Icon size={18} className={styles.mobileNavIcon} />}
          <span>{title}</span>
        </div>
        <ChevronDown
          size={16}
          className={`${styles.mobileChevron} ${isOpen ? styles.chevronOpen : ""}`}
        />
      </button>

      <div
        className={`${styles.mobileDropdownMenu} ${
          isOpen ? styles.mobileDropdownOpen : ""
        }`}
      >
        {items.map((item) => (
          <Link
            key={item._id || item.slug || item.id}
            to={`/#${title.toLowerCase().replace(/\s+/g, "-")}-${
              item.slug || item.id || item._id
            }`}
            className={styles.mobileDropdownSubLink}
            onClick={(e) => {
              closeMenu();
              handleHashClick(
                `/#${title.toLowerCase().replace(/\s+/g, "-")}-${
                  item.slug || item.id || item._id
                }`,
                e
              );
            }}
          >
            <span>{item.title}</span>
            <ArrowRight size={14} className={styles.mobileSubItemArrow} />
          </Link>
        ))}
      </div>
    </div>
  );
}
