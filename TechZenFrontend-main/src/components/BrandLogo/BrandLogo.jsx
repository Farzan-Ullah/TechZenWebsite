import { useTheme } from "../../context/ThemeContext";
import styles from "./BrandLogo.module.css";

export default function BrandLogo({ className = "", alt = "TechZen", height, width, style }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <img
      src={isDark ? "/TechZenLogo-white.png" : "/TechZenLogo.png"}
      alt={alt}
      className={`${styles.logoImg} ${className}`}
      height={height}
      width={width}
      style={style}
    />
  );
}
