"use client";

import { Search, Bell, ChevronDown } from "lucide-react";

import { useAuth } from "@/context/AuthContext/AuthContext";

import styles from "./AdminTopbar.module.css";

export default function AdminTopbar() {
  const { user } = useAuth();

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <div className={styles.searchBox}>
          <Search size={18} />

          <input
            type="text"
            placeholder="Search products, orders..."
          />
        </div>
      </div>

      <div className={styles.right}>
        <button
          className={styles.iconButton}
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className={styles.badge}>3</span>
        </button>

        <div className={styles.profile}>
          <div className={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase() ?? "A"}
          </div>

          <div className={styles.userInfo}>
            <span className={styles.name}>
              {user?.name ?? "Administrator"}
            </span>

            <span className={styles.role}>
              {user?.role ?? "Admin"}
            </span>
          </div>

          <ChevronDown size={18} />
        </div>
      </div>
    </header>
  );
}