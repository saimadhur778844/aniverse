import Image from "next/image";
import { Anime } from "@/types/anime";
import styles from "./AnimeCard.module.css";
import Button from "@/components/shared/Button";

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
        src={anime.image}
        alt={anime.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3>{anime.name}</h3>

        <p>{anime.description}</p>

        <Button variant="secondary">Explore →</Button>
      </div>
    </article>
  );
}