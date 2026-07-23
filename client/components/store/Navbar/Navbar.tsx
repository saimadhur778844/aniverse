"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";

import { navigation } from "@/data/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoAccent}>ANI</span>VERSE
        </Link>

        {/* Navigation */}
        <nav className={styles.menu}>
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={clsx(styles.link, {
                [styles.active]: pathname === item.href,
              })}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className={styles.actions}>
          <button className={styles.iconButton}>
            <Heart size={22} />
          </button>

          <button className={styles.iconButton}>
            <ShoppingCart size={22} />
            <span className={styles.badge}>0</span>
          </button>

          {/* Expandable Search */}
          <div
            className={`${styles.searchWrapper} ${
              searchOpen ? styles.searchOpen : ""
            }`}
          >
            {searchOpen ? (
              <>
                <Search size={18} className={styles.searchIcon} />

                <input
                  type="text"
                  placeholder="Search anime, figures, katanas..."
                  className={styles.searchInput}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = e.currentTarget.value.trim();

                      if (value) {
                        window.location.href = `/products?search=${encodeURIComponent(value)}`;
                      }
                    }
                  }}
                />

                <button
                  className={styles.closeSearch}
                  onClick={() => setSearchOpen(false)}
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <button
                className={styles.iconButton}
                onClick={() => setSearchOpen(true)}
              >
                <Search size={22} />
              </button>
            )}
          </div>

          <button className={styles.loginButton}>
            <User size={18} />
            Login
          </button>

          <button
            className={styles.mobileButton}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className={styles.mobileMenu}>
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={clsx(styles.mobileLink, {
                [styles.active]: pathname === item.href,
              })}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}