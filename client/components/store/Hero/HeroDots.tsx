import styles from "./Hero.module.css";

interface HeroDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export default function HeroDots({
  total,
  current,
  onSelect,
}: HeroDotsProps) {
  return (
    <div className={styles.dots}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          className={`${styles.dot} ${
            current === index ? styles.active : ""
          }`}
          onClick={() => onSelect(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}