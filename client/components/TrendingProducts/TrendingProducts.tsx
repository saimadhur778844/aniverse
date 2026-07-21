import ProductCard from "@/components/ProductCard";
import products from "@/data/product";
import styles from "./TrendingProducts.module.css";
import SectionTitle from "@/components/SectionTitle";

export default function TrendingProducts() {
  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <section className={styles.section}>
      <SectionTitle
        title="🔥 Trending Products"
        subtitle="Most loved collectibles from your favorite anime."
        />

      <div className={styles.grid}>
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}