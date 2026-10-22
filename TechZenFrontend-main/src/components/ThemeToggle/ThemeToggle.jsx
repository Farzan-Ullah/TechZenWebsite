import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle({ className = "", showLabel = false }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`${styles.toggleBtn} ${isDark ? styles.dark : styles.light} ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className={styles.iconTrack}>
        <div className={`${styles.iconWrap} ${styles.sunIcon}`}>
          <Sun size={17} strokeWidth={2.2} />
        </div>
        <div className={`${styles.iconWrap} ${styles.moonIcon}`}>
          <Moon size={17} strokeWidth={2.2} />
        </div>
      </div>
      {showLabel && (
        <span className={styles.label}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}
