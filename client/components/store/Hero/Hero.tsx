"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { heroData } from "@/data/heroData";

import HeroSlide from "./HeroSlide";
import HeroControls from "./HeroControls";
import HeroDots from "./HeroDots";

const AUTO_SLIDE_INTERVAL = 5000;

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroData.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroData.length) % heroData.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <HeroSlide slide={heroData[currentSlide]} />

      <HeroControls
        onPrevious={previousSlide}
        onNext={nextSlide}
      />

      <HeroDots
        total={heroData.length}
        current={currentSlide}
        onSelect={setCurrentSlide}
      />
    </section>
  );
}