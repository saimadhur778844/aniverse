interface CollectionBannerProps {
  title?: string;
  description?: string;
}

export default function CollectionBanner({
  title = "Anime Collections",
  description,
}: CollectionBannerProps) {
  return (
    <section>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </section>
  );
}
