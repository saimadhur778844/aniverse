import featuredAnime from "@/data/featuredAnime";
import AnimeCard from "@/components/AnimeCard";
import styles from "./FeaturedCollection.module.css";

export default function FeaturedCollection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Featured Collections</h2>

      <p className={styles.subtitle}>
        Explore merchandise from the world's most loved anime.
      </p>

      <div className={styles.grid}>
        {featuredAnime.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </section>
  );
}