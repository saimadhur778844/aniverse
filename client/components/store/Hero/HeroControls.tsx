import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Hero.module.css";

interface HeroControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

export default function HeroControls({
  onPrevious,
  onNext,
}: HeroControlsProps) {
  return (
    <>
      <button
        className={`${styles.arrow} ${styles.left}`}
        onClick={onPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>

      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={onNext}
        aria-label="Next slide"
      >
        <ChevronRight size={24} strokeWidth={2.5} />
      </button>
    </>
  );
}