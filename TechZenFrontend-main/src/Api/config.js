/**
 * Centralized API configuration for TechZen Platform.
 * Automatically normalizes API endpoints across local development, Vercel, and Render.
 */

const normalizeUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== "string") return "";
  let url = rawUrl.trim().replace(/\/+$/, "");
  // Ensure the /api suffix is present so endpoints like /v1/trainings resolve to /api/v1/trainings
  if (!url.endsWith("/api")) {
    url = `${url}/api`;
  }
  return url;
};

const resolveBaseUrl = () => {
  const envUrl = import.meta.env.VITE_BASE_URL;

  if (envUrl && typeof envUrl === "string" && envUrl.trim()) {
    return normalizeUrl(envUrl);
  }

  // If running in live browser on production (e.g. Vercel, custom domain) without VITE_BASE_URL:
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
  ) {
    console.warn(
      "[TechZen API] VITE_BASE_URL is not set in production build! Using '/api' relative path."
    );
    return "/api";
  }

  return "http://localhost:5000/api";
};

export const API_BASE_URL = resolveBaseUrl();
