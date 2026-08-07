"use client";

import { notFound } from "next/navigation";

import ProductPage from "@/components/admin/products/ProductPage";

import {
  useProduct,
} from "@/hooks/products";

interface Props {
  params: {
    id: string;
  };
}

export default function EditProductPage({
  params,
}: Props) {
  const {
    data,
    isLoading,
  } = useProduct(
    params.id
  );

  if (isLoading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  if (!data?.product) {
    notFound();
  }

  return (
    <ProductPage
      product={
        data.product
      }
    />
  );
}