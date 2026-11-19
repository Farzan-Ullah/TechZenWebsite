import { createContext, useContext, useState, useEffect } from "react";

const THEME_STORAGE_KEY = "techzen-theme-v2";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // 1. Immediately inherit from HTML data-theme if already initialized by head script
    if (typeof document !== "undefined") {
      const domTheme = document.documentElement.getAttribute("data-theme");
      if (domTheme === "light" || domTheme === "dark") {
        return domTheme;
      }
    }
    // 2. Check localStorage for explicit user choice (v2)
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === "dark") {
        return "dark";
      }
      if (savedTheme === "light") {
        return "light";
      }
    } catch {
      // fallback
    }
    return "light"; // Default to TechZen clean executive light theme
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // fallback
    }

    // Dynamic favicon and theme-color synchronization
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#050811" : "#f8fafc");
    }

    const pngFavicon32 = document.querySelector('link[rel="icon"][sizes="32x32"]');
    if (pngFavicon32) {
      pngFavicon32.href = theme === "dark" ? "/favicon-32x32-dark.png" : "/favicon-32x32-light.png";
    }

    const pngFavicon16 = document.querySelector('link[rel="icon"][sizes="16x16"]');
    if (pngFavicon16) {
      pngFavicon16.href = theme === "dark" ? "/favicon-16x16-dark.png" : "/favicon-16x16-light.png";
    }
  }, [theme]);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    window.setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 350);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
