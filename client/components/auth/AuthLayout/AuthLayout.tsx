"use client";

import { ReactNode } from "react";
import Link from "next/link";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className={styles.page}>
      <div className={styles.background}></div>

      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          ANIVERSE
        </Link>

        <div className={styles.card}>
          <h1>{title}</h1>
          <p>{subtitle}</p>

          <div className={styles.content}>
            {children}
          </div>
        </div>

        <footer className={styles.footer}>
          © 2026 Aniverse Marketplace
        </footer>
      </div>
    </main>
  );
}