import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";
import { HeroSlide as HeroSlideType } from "@/data/heroData";

interface HeroSlideProps {
  slide: HeroSlideType;
}

export default function HeroSlide({ slide }: HeroSlideProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.anime}>{slide.anime}</span>

        <h1 className={styles.title}>{slide.title}</h1>

        <h2 className={styles.subtitle}>{slide.subtitle}</h2>

        <p className={styles.description}>{slide.description}</p>

        <Link href={slide.href} className={styles.button}>
          {slide.buttonText}
        </Link>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src={slide.image}
          alt={slide.anime}
          fill
          priority
          sizes="(max-width:768px)100vw,50vw"
          className={styles.image}
        />
      </div>
    </div>
  );
}