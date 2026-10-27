import { useEffect, useState } from "react";
import { publicContentApi } from "../Api/CmsApi";
import { company as defaultCompany } from "../data/siteData";

export default function useCompanyContent(explicitFallback) {
  const fallback = explicitFallback || defaultCompany;
  const [company, setCompany] = useState(() => fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFallback, setIsFallback] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    publicContentApi
      .company()
      .then((content) => {
        if (!active) return;
        if (content && typeof content === "object" && Object.keys(content).length > 0) {
          const merged = {
            ...fallback,
            ...content,
            whyChooseUs:
              content.whyChooseUs?.length > 0
                ? content.whyChooseUs
                : fallback.whyChooseUs || [],
            statistics:
              content.statistics?.length > 0
                ? content.statistics
                : fallback.statistics || [],
          };

          // Override any legacy placeholders or old phone numbers from database
          if (!merged.linkedin || !merged.linkedin.includes("techzen-it-and-hr-service-llc")) {
            merged.linkedin = "https://www.linkedin.com/company/techzen-it-and-hr-service-llc/";
          }
          if (!merged.whatsapp || merged.whatsapp.includes("9302039953")) {
            merged.whatsapp = "https://wa.me/919303878713";
          }
          if (!merged.phone || merged.phone.includes("9302039953")) {
            merged.phone = "9303878713";
          }
          if (!merged.facebook || merged.facebook.endsWith("/techzen") || merged.facebook.endsWith("/techzen/")) {
            merged.facebook = "https://www.facebook.com/profile.php?id=61595264584692";
          }
          if (!merged.instagram || merged.instagram.endsWith("/techzen") || merged.instagram.endsWith("/techzen/")) {
            merged.instagram = "https://www.instagram.com/techzenitservices/";
          }

          setCompany(merged);
          setIsFallback(false);
        } else {
          setCompany(fallback);
          setIsFallback(true);
        }
      })
      .catch((requestError) => {
        if (!active) return;
        setError(
          requestError.response?.data?.message ||
            "Company content could not be loaded."
        );
        setCompany(fallback);
        setIsFallback(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { company, loading, error, isFallback };
}
