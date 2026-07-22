import ProductCard from "@/components/store/ProductCard/ProductCard";
import products from "@/data/product";
import styles from "./FeaturedProducts.module.css";
import SectionTitle from "@/components/shared/SectionTitle";

export default function FeaturedProducts() {
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
          <ProductCard key={product._id || product.name} product={product} />
        ))}
      </div>
    </section>
  );
}