"use client";

import { useRouter } from "next/navigation";

import ProductForm from "@/components/admin/products/ProductForm";

import {
  useCreateProduct,
  useUpdateProduct,
} from "@/hooks/products";

import type {
  Product,
} from "@/types/product";

interface Props {
  product?: Product;
}

export default function ProductPage({
  product,
}: Props) {
  const router =
    useRouter();

  const createMutation =
    useCreateProduct();

  const updateMutation =
    useUpdateProduct();

  const isEditing =
    !!product;

  const handleSubmit =
    async (values: any) => {
      if (isEditing) {
        await updateMutation.mutateAsync({
          id: product._id,
          product: values,
        });
      } else {
        await createMutation.mutateAsync(
          values
        );
      }

      router.push(
        "/admin/products"
      );
    };

  return (
    <ProductForm
      initialValues={
        product
      }
      loading={
        createMutation.isPending ||
        updateMutation.isPending
      }
      onSubmit={
        handleSubmit
      }
    />
  );
}