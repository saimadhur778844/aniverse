"use client";

import Section from "@/components/store/Section";
import SectionHeader from "@/components/store/SectionHeader";
import ProductGrid from "@/components/store/ProductGrid";
import ProductToolbar from "@/components/store/ProductToolbar";

import useProducts from "@/hooks/useProducts";

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
          subtitle="Loading products..."
        />
        <p>Loading products...</p>
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
        <p>{error}</p>
      </Section>
    );
  }

  return (
    <Section>
      <SectionHeader
        title="Products"
        subtitle={`${total} product${total !== 1 ? "s" : ""} available`}
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
        <p>No products found.</p>
      )}
    </Section>
  );
}