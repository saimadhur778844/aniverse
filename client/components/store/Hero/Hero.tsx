"use client";

import {
  useCallback,
  useEffect,
  useState,
  CSSProperties,
} from "react";

import styles from "./Hero.module.css";
import { heroData } from "@/data/heroData";

import HeroSlide from "./HeroSlide";
import HeroControls from "./HeroControls";
import HeroDots from "./HeroDots";

const AUTO_SLIDE_INTERVAL = 5000;

export default function Hero() {
  const [currentSlide, setCurrentSlide] =
    useState(0);

  const [paused, setPaused] =
    useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev + 1) % heroData.length
    );
  }, []);

  const previousSlide = useCallback(() => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + heroData.length) %
        heroData.length
    );
  }, []);

  // Auto slide
  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [paused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [nextSlide, previousSlide]);

  const current =
    heroData[currentSlide];

  return (
    <section
      className={styles.hero}
      role="region"
      aria-label="Featured anime carousel"
      aria-roledescription="carousel"
      aria-live="polite"
      onMouseEnter={() =>
        setPaused(true)
      }
      onMouseLeave={() =>
        setPaused(false)
      }
      style={
        {
          "--accent-color":
            current.accentColor ??
            "#3b82f6",
        } as CSSProperties
      }
    >
      <div
        className={styles.overlay}
      />

      <HeroSlide slide={current} />

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