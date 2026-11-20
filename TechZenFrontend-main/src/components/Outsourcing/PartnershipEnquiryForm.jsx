import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Loader2,
  Send,
  Building
} from "lucide-react";
import api from "../../Api/ApiIntersceptor";
import styles from "./Outsourcing.module.css";

const PARTNERSHIP_TYPES = [
  "Dedicated Development Team",
  "Project-Based Outsourcing",
  "White-Label Development Partnership",
  "Team Augmentation",
  "General Technical Consultation"
];

const AVAILABLE_SERVICES = [
  "Web Application Development",
  "SaaS Platform Development",
  "MERN Stack Development",
  "Mobile App Development",
  "API & System Integration",
  "ERP & Enterprise Software",
  "UI/UX Design & Front-End",
  "Software Maintenance & SLA"
];

const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
  "Flexible / To be discussed"
];

const ENGAGEMENT_OPTIONS = [
  "Dedicated Team",
  "Fixed Price Project",
  "Hourly / T&M",
  "Not Sure Yet"
];

const INITIAL_FORM = {
  name: "",
  email: "",
  company: "",
  website: "",
  country: "",
  phone: "",
  partnershipType: "Dedicated Development Team",
  requiredServices: ["Web Application Development"],
  budget: "$10,000 - $25,000",
  preferredEngagement: "Dedicated Team",
  message: "",
  consent: false
};

export default function PartnershipEnquiryForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const toggleService = (service) => {
    setFormData((prev) => {
      const exists = prev.requiredServices.includes(service);
      const updated = exists
        ? prev.requiredServices.filter((s) => s !== service)
        : [...prev.requiredServices, service];
      return { ...prev, requiredServices: updated };
    });
    if (errors.requiredServices) {
      setErrors((prev) => ({ ...prev, requiredServices: "" }));
    }
  };

  const selectEngagement = (option) => {
    setFormData((prev) => ({ ...prev, preferredEngagement: option }));
  };

  const validate = () => {
    const errs = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Full name is required (min 2 characters).";
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid business email address.";
    }

    if (!formData.company.trim() || formData.company.trim().length < 2) {
      errs.company = "Company / agency name is required.";
    }

    if (!formData.country.trim() || formData.country.trim().length < 2) {
      errs.country = "Country is required.";
    }

    if (
      !formData.phone.trim() ||
      !/^[0-9+()\-\s]{7,30}$/.test(formData.phone.trim())
    ) {
      errs.phone = "Please enter a valid phone or WhatsApp number with country code.";
    }

    if (!formData.requiredServices || formData.requiredServices.length === 0) {
      errs.requiredServices = "Please select at least one required service.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 20) {
      errs.message = "Please describe your project or team requirement (min 20 characters).";
    }

    if (!formData.consent) {
      errs.consent = "Please agree to the confidentiality statement to proceed.";
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        website: formData.website.trim(),
        country: formData.country.trim(),
        phone: formData.phone.trim(),
        partnershipType: formData.partnershipType,
        requiredServices: formData.requiredServices,
        budget: formData.budget,
        preferredEngagement: formData.preferredEngagement,
        message: formData.message.trim(),
        consent: formData.consent,
        service: `Outsourcing: ${formData.partnershipType}`,
        source: "software-development-outsourcing"
      };

      await api.post("/v1/inquiry/outsourcing", payload);
      setSubmitted(true);
      setFormData(INITIAL_FORM);
      setErrors({});
    } catch (err) {
      console.error("Outsourcing inquiry failed:", err);
      const msg =
        err.response?.data?.message ||
        "An unexpected error occurred while submitting your enquiry. Please try again or email us directly at techzen432@gmail.com.";
      setServerError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="partnership-enquiry" className={styles.enquirySection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Discuss Your Software Development Outsourcing Requirement
          </h2>
          <p className={styles.sectionSubtitle}>
            Share your project specifications, dedicated team needs, or white-label partnership
            goals. Our technology team will review your brief under NDA and respond within 24 hours.
          </p>
        </div>

        <div className={styles.enquiryGrid}>
          {/* Left Column: Direct Contact & Trust Signals */}
          <div className={styles.enquiryInfoCol}>
            <div>
              <h3 className={styles.infoHeadTitle}>Partner with TechZen</h3>
              <p className={styles.infoHeadDesc}>
                Whether you need a dedicated development pod or a full turnkey solution, we are
                ready to accelerate your delivery.
              </p>
            </div>

            <div className={styles.infoCardsList}>
              <div className={styles.contactDetailItem}>
                <div className={styles.contactDetailIcon}>
                  <Mail size={18} />
                </div>
                <div className={styles.contactDetailContent}>
                  <span className={styles.contactDetailLabel}>Direct Email</span>
                  <a
                    href="mailto:techzen432@gmail.com"
                    className={styles.contactDetailValue}
                  >
                    techzen432@gmail.com
                  </a>
                </div>
              </div>

              <div className={styles.contactDetailItem}>
                <div className={styles.contactDetailIcon}>
                  <Phone size={18} />
                </div>
                <div className={styles.contactDetailContent}>
                  <span className={styles.contactDetailLabel}>Phone / WhatsApp</span>
                  <a href="tel:+919303878713" className={styles.contactDetailValue}>
                    +91 9303878713
                  </a>
                </div>
              </div>

              <div className={styles.contactDetailItem}>
                <div className={styles.contactDetailIcon}>
                  <MapPin size={18} />
                </div>
                <div className={styles.contactDetailContent}>
                  <span className={styles.contactDetailLabel}>Office Location</span>
                  <span className={styles.contactDetailValue}>
                    Near Saffron Lawn, Chhatarpur, Madhya Pradesh, India
                  </span>
                </div>
              </div>

              <div className={styles.contactDetailItem}>
                <div className={styles.contactDetailIcon}>
                  <Clock size={18} />
                </div>
                <div className={styles.contactDetailContent}>
                  <span className={styles.contactDetailLabel}>Response SLA</span>
                  <span className={styles.contactDetailValue}>
                    Guaranteed within 24 business hours
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.ndaPill}>
              <ShieldCheck size={20} />
              <span>Mutual Non-Disclosure Agreement (NDA) executed on request</span>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className={styles.formCard}>
            {submitted ? (
              <div className={styles.formSuccessCard}>
                <CheckCircle size={64} className={styles.successCheckIcon} />
                <h3 className={styles.successHeading}>
                  Partnership Enquiry Received!
                </h3>
                <p className={styles.successMessage}>
                  Thank you for reaching out to TechZen IT and HR Services LLC. Our senior
                  technical director has received your enquiry and will contact you within 24 hours
                  to schedule a discovery discussion.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className={styles.resetBtn}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.enquiryForm} noValidate>
                {serverError && (
                  <div className={styles.formErrorBanner}>
                    <AlertCircle size={18} />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Row 1: Name & Business Email */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Full Name <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={handleChange}
                      className={`${styles.formInput} ${
                        errors.name ? styles.formInputError : ""
                      }`}
                    />
                    {errors.name && (
                      <span className={styles.fieldErrorText}>{errors.name}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Business Email <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${styles.formInput} ${
                        errors.email ? styles.formInputError : ""
                      }`}
                    />
                    {errors.email && (
                      <span className={styles.fieldErrorText}>{errors.email}</span>
                    )}
                  </div>
                </div>

                {/* Row 2: Company Name & Website */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Company / Agency Name <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="e.g. Apex Digital Ltd"
                      value={formData.company}
                      onChange={handleChange}
                      className={`${styles.formInput} ${
                        errors.company ? styles.formInputError : ""
                      }`}
                    />
                    {errors.company && (
                      <span className={styles.fieldErrorText}>{errors.company}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Company Website</label>
                    <input
                      type="text"
                      name="website"
                      placeholder="https://yourcompany.com"
                      value={formData.website}
                      onChange={handleChange}
                      className={styles.formInput}
                    />
                  </div>
                </div>

                {/* Row 3: Country & Phone/WhatsApp */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Country <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      placeholder="e.g. United States / India / UK"
                      value={formData.country}
                      onChange={handleChange}
                      className={`${styles.formInput} ${
                        errors.country ? styles.formInputError : ""
                      }`}
                    />
                    {errors.country && (
                      <span className={styles.fieldErrorText}>{errors.country}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Phone / WhatsApp (with country code){" "}
                      <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${styles.formInput} ${
                        errors.phone ? styles.formInputError : ""
                      }`}
                    />
                    {errors.phone && (
                      <span className={styles.fieldErrorText}>{errors.phone}</span>
                    )}
                  </div>
                </div>

                {/* Row 4: Partnership Type & Estimated Budget */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Partnership Type <span className={styles.requiredStar}>*</span>
                    </label>
                    <select
                      name="partnershipType"
                      value={formData.partnershipType}
                      onChange={handleChange}
                      className={styles.formSelect}
                    >
                      {PARTNERSHIP_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Estimated Budget</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={styles.formSelect}
                    >
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Services Required (Chips) */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Services Required (Select one or more){" "}
                    <span className={styles.requiredStar}>*</span>
                  </label>
                  <div className={styles.chipsWrap}>
                    {AVAILABLE_SERVICES.map((srv) => {
                      const selected = formData.requiredServices.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => toggleService(srv)}
                          className={`${styles.serviceChip} ${
                            selected ? styles.serviceChipSelected : ""
                          }`}
                        >
                          {selected ? "✓ " : "+ "}
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                  {errors.requiredServices && (
                    <span className={styles.fieldErrorText}>
                      {errors.requiredServices}
                    </span>
                  )}
                </div>

                {/* Preferred Engagement Model */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Preferred Engagement Model</label>
                  <div className={styles.engagementRadioRow}>
                    {ENGAGEMENT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => selectEngagement(opt)}
                        className={`${styles.engagementPill} ${
                          formData.preferredEngagement === opt
                            ? styles.engagementPillActive
                            : ""
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Description */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Project Overview / Requirements{" "}
                    <span className={styles.requiredStar}>*</span>
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Briefly describe your application concept, required tech stack, estimated timelines, or team size requirement..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${styles.formTextarea} ${
                      errors.message ? styles.formInputError : ""
                    }`}
                  />
                  {errors.message && (
                    <span className={styles.fieldErrorText}>{errors.message}</span>
                  )}
                </div>

                {/* Confidentiality Consent */}
                <div className={styles.consentRow}>
                  <input
                    type="checkbox"
                    id="outsourcing-consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className={styles.consentCheckbox}
                  />
                  <label htmlFor="outsourcing-consent" className={styles.consentText}>
                    I agree to TechZen contacting me regarding this project enquiry and confirm
                    that our discussions are confidential and eligible for a formal NDA.
                  </label>
                </div>
                {errors.consent && (
                  <span className={styles.fieldErrorText}>{errors.consent}</span>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className={styles.submitBtn}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className={styles.submitSpinner} />
                      <span>Transmitting Project Brief...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Partnership Enquiry</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
