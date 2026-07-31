"use client";

import { ReactNode } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import AdminBreadcrumb from "./AdminBreadcrumb";

import styles from "./AdminLayout.module.css";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({
  children,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <AdminSidebar />

      <div className={styles.main}>
        <AdminTopbar />

        <main className={styles.content}>
          <AdminBreadcrumb />

          {children}
        </main>
      </div>
    </div>
  );
}