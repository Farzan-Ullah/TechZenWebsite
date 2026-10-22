import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  Info,
} from "lucide-react";
import { useAuth } from "./AuthProvider";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import BrandLogo from "../components/BrandLogo/BrandLogo";
import styles from "./AdminLogin.module.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, accessToken, login: authenticate } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  // If already authenticated as admin, redirect directly to /admin
  const roles = [...(Array.isArray(user?.roles) ? user.roles : []), user?.role];
  if (accessToken && roles.includes("admin")) {
    const destination = location.state?.from?.pathname || "/admin";
    return <Navigate to={destination} replace />;
  }

  const validate = () => {
    const errs = {};
    if (!identifier.trim()) {
      errs.identifier = "Email or phone number is required";
    }
    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const loggedInUser = await authenticate({
        identifier: identifier.trim(),
        password,
      });

      const userRoles = [
        ...(Array.isArray(loggedInUser?.roles) ? loggedInUser.roles : []),
        loggedInUser?.role,
      ];

      if (!userRoles.includes("admin")) {
        setError("Access restricted: This account lacks administrative privileges.");
        return;
      }

      const destination = location.state?.from?.pathname || "/admin";
      navigate(destination, { replace: true });
    } catch (err) {
      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Invalid username or password. Please try again.";
      setError(backendMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAutofillAdmin = () => {
    setIdentifier("admin@techzen.io");
    setPassword("Admin@123456");
    setFieldErrors({});
    setError("");
  };

  return (
    <div className={styles.loginPage}>
      {/* Dynamic Background Effects */}
      <div className={styles.ambientSphereOne} />
      <div className={styles.ambientSphereTwo} />
      <div className={styles.gridOverlay} />

      {/* Top Header Bar */}
      <header className={styles.topBar}>
        <Link to="/" className={styles.backLink} title="Return to website">
          <ArrowLeft size={16} />
          <span>Return to Website</span>
        </Link>

        <div className={styles.topRightActions}>
          <div className={styles.sslBadge}>
            <span className={styles.sslDot} />
            <span>256-Bit SSL Secured</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Central Card Shell */}
      <main className={styles.centerWrap}>
        <div className={styles.card}>
          {/* Card Top Branding */}
          <div className={styles.cardBrand}>
            <Link to="/" className={styles.logoLink} title="TechZen Enterprise">
              <BrandLogo
                alt="TechZen Enterprise"
                className={styles.brandLogo}
              />
            </Link>

            <div className={styles.portalBadge}>
              <ShieldCheck size={13} className={styles.portalBadgeIcon} />
              <span>Admin Management Console</span>
            </div>

            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>
              Sign in with administrative credentials to access the console.
            </p>
          </div>

          {/* Error Alert Banner */}
          {error && (
            <div className={styles.alertBanner} role="alert">
              <AlertCircle size={18} className={styles.alertIcon} />
              <div className={styles.alertText}>{error}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {/* Identifier (Email/Username) */}
            <div className={styles.fieldGroup}>
              <label htmlFor="admin-identifier" className={styles.label}>
                Email or Username
              </label>
              <div
                className={`${styles.inputWrap} ${
                  fieldErrors.identifier ? styles.inputError : ""
                }`}
              >
                <Mail size={16} className={styles.fieldIcon} />
                <input
                  id="admin-identifier"
                  type="text"
                  name="identifier"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (fieldErrors.identifier) {
                      setFieldErrors((prev) => ({ ...prev, identifier: null }));
                    }
                  }}
                  placeholder="admin@techzen.io"
                  autoComplete="username"
                  disabled={submitting}
                  className={styles.input}
                  required
                />
              </div>
              {fieldErrors.identifier && (
                <span className={styles.errorText}>
                  {fieldErrors.identifier}
                </span>
              )}
            </div>

            {/* Password */}
            <div className={styles.fieldGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="admin-password" className={styles.label}>
                  Password
                </label>
                <button
                  type="button"
                  className={styles.forgotBtn}
                  onClick={() => setShowForgotNotice((prev) => !prev)}
                >
                  Forgot password?
                </button>
              </div>
              <div
                className={`${styles.inputWrap} ${
                  fieldErrors.password ? styles.inputError : ""
                }`}
              >
                <Lock size={16} className={styles.fieldIcon} />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) {
                      setFieldErrors((prev) => ({ ...prev, password: null }));
                    }
                  }}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  disabled={submitting}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {fieldErrors.password && (
                <span className={styles.errorText}>
                  {fieldErrors.password}
                </span>
              )}
            </div>

            {/* Forgot Password Inline Notice */}
            {showForgotNotice && (
              <div className={styles.infoBanner}>
                <Info size={16} />
                <span>
                  To reset administrator credentials, please contact the IT Security Operations team.
                </span>
              </div>
            )}

            {/* Remember Me */}
            <div className={styles.optionsRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={submitting}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>Keep me signed in</span>
              </label>

              {/* Demo autofill button for instant testing */}
              <button
                type="button"
                onClick={handleAutofillAdmin}
                className={styles.demoFillBtn}
                title="Fill default admin credentials"
              >
                <Sparkles size={13} />
                <span>Autofill Demo</span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className={styles.submitButton}
            >
              {submitting ? (
                <>
                  <span className={styles.spinner} />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Console</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Card Footer Security Tag */}
          <div className={styles.cardFooter}>
            <p>
              Access restricted strictly to authorized TechZen personnel. All access attempts are cryptographically verified and audited.
            </p>
          </div>
        </div>

        {/* Global Copyright Bottom */}
        <footer className={styles.bottomCopyright}>
          <span>© {new Date().getFullYear()} TechZen IT and HR Services LLC. All rights reserved.</span>
        </footer>
      </main>
    </div>
  );
}
