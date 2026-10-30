import { useState } from "react";
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import api from "../../Api/Axios";
import styles from "./Chatbot.module.css";

const SERVICES_OPTIONS = [
  "Website Development",
  "Web Application Development",
  "Mobile Application Development",
  "Web Designing (UI/UX)",
  "SaaS Development",
  "ERP Software Solutions",
  "MERN Stack Development",
  "IT Training & Industrial Training",
  "Data Analytics Training",
  "HR Services & Career Development",
  "Other / General Enquiry"
];

export default function LeadFormModal({ onClose, onSuccess, initialService = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: initialService || SERVICES_OPTIONS[0],
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const validate = () => {
    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }

    const digits = formData.phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return false;
    }

    if (!formData.message.trim()) {
      setError("Please write a brief description of your requirement.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/v1/chat/lead", {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.replace(/\D/g, ""),
        service: formData.service,
        message: formData.message.trim()
      });

      if (response.data && response.data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          if (onSuccess) {
            onSuccess({
              name: formData.name.trim(),
              service: formData.service,
              phone: formData.phone.replace(/\D/g, "")
            });
          }
        }, 1500);
      } else {
        setError(response.data?.message || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      console.error("[LeadFormModal] submission error:", err);
      const msg = err.response?.data?.message || "Server connection error. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.leadModalOverlay}>
      <div className={styles.leadModalContainer}>
        <div className={styles.leadModalHeader}>
          <div>
            <h3 className={styles.leadModalTitle}>Enquire with TechZen</h3>
            <p className={styles.leadModalSubtitle}>
              Fill in your details and our team will get in touch within 24 hours.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeModalBtn}
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={18} />
          </button>
        </div>

        {isSuccess ? (
          <div className={styles.leadSuccessCard}>
            <CheckCircle2 size={46} className={styles.successIcon} />
            <h4>Enquiry Received!</h4>
            <p>
              Thank you, <strong>{formData.name}</strong>. Your enquiry for{" "}
              <strong>{formData.service}</strong> has been logged in our system. We will contact
              you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.leadForm}>
            {error && (
              <div className={styles.leadErrorBanner}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="lead-name">Full Name *</label>
              <input
                id="lead-name"
                name="name"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                autoFocus
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="lead-email">Email Address *</label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lead-phone">Mobile Number *</label>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit number"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lead-service">Service Interested In *</label>
              <select
                id="lead-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                disabled={loading}
              >
                {SERVICES_OPTIONS.map((srv, idx) => (
                  <option key={idx} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lead-message">Project or Enquiry Details *</label>
              <textarea
                id="lead-message"
                name="message"
                rows={3}
                placeholder="Briefly describe your requirements or queries..."
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
                disabled={loading}
              >
                Back to Chat
              </button>

              <button
                type="submit"
                className={styles.submitLeadBtn}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className={styles.spinner} />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Enquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
