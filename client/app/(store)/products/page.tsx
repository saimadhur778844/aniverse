"use client";

import Section from "@/components/store/Section";
import SectionHeader from "@/components/store/SectionHeader";
import ProductGrid from "@/components/store/ProductGrid";
import ProductGridSkeleton from "@/components/store/ProductGridSkeleton";
import ProductToolbar from "@/components/store/ProductToolbar";
import Button from "@/components/shared/Button";

import useProducts from "@/lib/hooks/useProducts";

import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  const {
    products,
    categories,
    total,
    loading,
    error,

    search,
    setSearch,

    selectedCategory,
    setSelectedCategory,

    sort,
    setSort,
  } = useProducts();

  if (loading) {
    return (
      <Section>
        <SectionHeader
          title="Products"
          subtitle="Browse our complete collection."
        />

        <ProductGridSkeleton count={8} />
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <SectionHeader
          title="Products"
          subtitle="Browse our complete collection."
        />

        <div className={styles.errorState}>
          <h2>Something went wrong</h2>

          <p>{error}</p>

          <Button
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <SectionHeader
        title="Products"
        subtitle={`${total.toLocaleString()} product${
          total !== 1 ? "s" : ""
        } available`}
      />

      <ProductToolbar
        total={total}
        search={search}
        onSearch={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sort={sort}
        onSortChange={setSort}
      />

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            📦
          </div>

          <h2>No products found</h2>

          <p>
            We couldn't find any products matching
            your current search or filters.
          </p>

          <Button
            onClick={() => {
              setSearch("");
              setSelectedCategory("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </Section>
  );
}