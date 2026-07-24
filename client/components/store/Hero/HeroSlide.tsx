import Image from "next/image";
import Link from "next/link";

import { HeroSlide as HeroSlideType } from "@/data/heroData";

import styles from "./Hero.module.css";

interface HeroSlideProps {
  slide: HeroSlideType;
}

export default function HeroSlide({
  slide,
}: HeroSlideProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {slide.badge && (
          <span className={styles.badge}>
            {slide.badge}
          </span>
        )}

        <span
          className={styles.anime}
          aria-label={`Featured anime: ${slide.anime}`}
        >
          {slide.anime}
        </span>

        <h1 className={styles.title}>
          {slide.title}
        </h1>

        <h2 className={styles.subtitle}>
          {slide.subtitle}
        </h2>

        <p className={styles.description}>
          {slide.description}
        </p>

        <div className={styles.actions}>
          <Link
            href={slide.href}
            className={styles.button}
            aria-label={`${slide.buttonText} - ${slide.anime}`}
          >
            {slide.buttonText}
          </Link>
        </div>
      </div>

      <div
        className={styles.imageWrapper}
        aria-hidden="true"
      >
        <Image
          src={slide.image}
          alt={`${slide.title} collectible`}
          fill
          priority
          quality={95}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.image}
        />
      </div>
    </div>
  );
}