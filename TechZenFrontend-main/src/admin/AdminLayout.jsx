import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import AdminHeader from "./layout/AdminHeader";
import AdminSidebar from "./layout/AdminSidebar";
import styles from "./AdminLayout.module.css";

const STORAGE_KEY = "techzen_admin_sidebar_collapsed";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const handleToggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {}
      return next;
    });
  };

  return (
    <div className={`${styles.shell} ${collapsed ? styles.collapsed : ""}`}>
      <AdminHeader
        user={user}
        onLogout={logout}
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
      />
      <AdminSidebar
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}