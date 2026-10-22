import { useEffect, useRef } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import './Api/ApiIntersceptor'


import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Layout from "./Layout/Layout";
import Project from "./components/ProjectSection/Project";
import TrainingDetail from "./pages/TrainingDetail/TrainingDetail";
import RequireAdmin from "./Auth/RequireAdmin";
import AdminLayout from "./admin/AdminLayout";
import AdminOverview from "./admin/modules/AdminOverview";
import InquiryManager from "./admin/modules/InquiryManager";
import CmsContentManager from "./admin/modules/CmsContentManager";
import TrainingManager from "./admin/modules/TrainingManager";
import CompanyEditor from "./admin/modules/CompanyEditor";
import FutureSettings from "./admin/modules/FutureSettings";
import { contentModules } from "./admin/modules/contentConfig";
import AdminLogin from "./Auth/AdminLogin";
import { setNavigate } from './Api/navigation';

import CareersPage from "./pages/Careers/CareersPage";
import TrainingsPage from "./pages/Trainings/TrainingsPage";

export default function App() {
   const navigate = useNavigate();
   const didCheckReload = useRef(false);
 
   useEffect(() => {
    setNavigate(navigate);

    // Run reload check strictly once on initial page mount (never during link clicks)
    if (didCheckReload.current) return;
    didCheckReload.current = true;

    try {
      const navEntries = window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("navigation");
      const isReload = (navEntries && navEntries[0] && navEntries[0].type === "reload") ||
                       (window.performance && window.performance.navigation && window.performance.navigation.type === 1);
      const path = window.location.pathname;
      const isAdmin = path.startsWith("/admin") || path === "/login" || path === "/signup";

      if (isReload && !isAdmin) {
        if (path !== "/" || window.location.search || window.location.hash) {
          navigate("/", { replace: true });
        }
        if ("scrollRestoration" in window.history) {
          window.history.scrollRestoration = "manual";
        }
        window.scrollTo(0, 0);
      }
    } catch {
      // ignore
    }
  }, [navigate]);

  return (
    <>
      <Routes>

        <Route element ={<Layout/>}>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/about" element={<About/>} ></Route>
          <Route path="/contact" element={<Contact/>} ></Route>
          <Route path="/projects" element={<Project/>} ></Route>
          <Route path="/careers" element={<CareersPage/>} ></Route>
          <Route path="/trainings" element={<TrainingsPage/>} ></Route>
          <Route path="/trainings/:slug" element={<TrainingDetail/>} ></Route>
        </Route>

        <Route path="/admin/*" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route index element={<AdminOverview />} />
          <Route path="inquiries" element={<InquiryManager />} />
          <Route path="projects" element={<CmsContentManager config={contentModules.projects} />} />
          <Route path="team" element={<CmsContentManager config={contentModules.team} />} />
          <Route path="services" element={<CmsContentManager config={contentModules.services} />} />
          <Route path="trainings" element={<TrainingManager />} />
          <Route path="faqs" element={<CmsContentManager config={contentModules.faqs} />} />
          <Route path="company" element={<CompanyEditor />} />
          <Route path="settings" element={<FutureSettings />} />
        </Route>

        {/* Dedicated Classy Admin Login */}
        <Route path='/login' element={<AdminLogin />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        {/* Signup option completely removed — redirects to login */}
        <Route path='/signup' element={<Navigate to="/login" replace />} />

      </Routes>
  
    </>
  );
}







