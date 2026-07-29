import type { ReactNode } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute/ProtectedRoute";
import Sidebar from "@/components/account/Sidebar/Sidebar";

import styles from "./AccountLayout.module.css";

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({
  children,
}: AccountLayoutProps) {
  return (
    <ProtectedRoute>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}