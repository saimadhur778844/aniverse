import AnimeCard from "@/components/ui/AnimeCard";
import featuredAnime from "@/data/featuredAnime";
import { Anime } from "@/types/anime";

interface AnimeGridProps {
  anime?: Anime[];
}

export default function AnimeGrid({ anime = featuredAnime }: AnimeGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {anime.map((item) => (
        <AnimeCard key={item.id} anime={item} />
      ))}
    </div>
  );
}
