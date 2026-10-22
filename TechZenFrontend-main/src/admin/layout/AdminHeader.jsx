import { Link } from "react-router-dom";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import styles from "./AdminHeader.module.css";

export default function AdminHeader({ user, onLogout, collapsed, onToggleCollapse }) {
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Admin";
  const initials = name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        {onToggleCollapse && (
          <button
            type="button"
            className={styles.headerToggle}
            onClick={onToggleCollapse}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
          </button>
        )}
        <Link className={styles.brand} to="/admin" aria-label="TechZen dashboard">
          <span>TECHZEN</span><small>STUDIO</small>
        </Link>
      </div>

      <div className={styles.account}>
        <span className={styles.avatar} aria-hidden="true">{initials}</span>
        <span className={styles.identity}><strong>{name}</strong><small>Administrator</small></span>
        <button type="button" className={styles.logout} onClick={onLogout} title="Log out" aria-label="Log out">
          <LogOut size={17} /><span>Log out</span>
        </button>
      </div>
    </header>
  );
}