"use client";

import Image from "next/image";
import heroData from "@/data/herodata";
import styles from "./Hero.module.css";
import Button from "@/components/Button";

export default function Hero() {
  const hero = heroData[0];

  return (
    <section className={styles.hero}>
      <Image
        src={hero.image}
        alt={hero.anime}
        fill
        priority
        className={styles.background}
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <span className={styles.anime}>{hero.anime}</span>

        <h1>{hero.heading}</h1>

        <p>{hero.description}</p>

        <button>{hero.button}</button>
      </div>
    </section>
  );
}