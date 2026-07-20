"use client";

import styles from "./Navbar.module.css";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoAccent}>ANI</span>VERSE
      </div>

      <div className={styles.searchBox}>
        <MagnifyingGlassIcon className={styles.icon} />
        <input
          type="text"
          placeholder="Search anime, figures, katanas..."
        />
      </div>

      <div className={styles.menu}>
        <a href="#">Home</a>
        <a href="#">Anime</a>
        <a href="#">Figures</a>
        <a href="#">Collectibles</a>
      </div>

      <div className={styles.actions}>
        <HeartIcon className={styles.actionIcon} />
        <ShoppingCartIcon className={styles.actionIcon} />
        <UserIcon className={styles.actionIcon} />
      </div>
    </nav>
  );
}