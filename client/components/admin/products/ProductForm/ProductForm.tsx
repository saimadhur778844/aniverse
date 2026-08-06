"use client";

import {
  FormProvider,
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  ProductFormProps,
} from "./types";

import {
  productSchema,
} from "./schema";

import BasicInfo from "./BasicInfo";
import Pricing from "./Pricing";
import Inventory from "./Inventory";
import ProductStatus from "./ProductStatus";
import ProductSEO from "./ProductSEO";
import ProductImages from "./ProductImages";
import ProductActions from "./ProductActions";

export default function ProductForm({
  initialValues,

  onSubmit,

  loading,
}: ProductFormProps) {
  const methods =
    useForm({
      resolver:
        zodResolver(
          productSchema
        ),

      defaultValues: {
        name: "",

        slug: "",

        shortDescription:
          "",

        description: "",

        category: "",

        anime: "",

        brand: "",

        sku: "",

        mrp: 0,

        sellingPrice: 0,

        costPrice: 0,

        discount: 0,

        tax: 0,

        stock: 0,

        minimumStock: 0,

        trackInventory:
          true,

        continueSelling:
          false,

        featured:
          false,

        published:
          true,

        trending:
          false,

        newArrival:
          false,

        metaTitle: "",

        metaDescription:
          "",

        keywords: "",

        ...initialValues,
      },
    });

  return (
    <FormProvider
      {...methods}
    >
      <form
        onSubmit={methods.handleSubmit(
          onSubmit
        )}
        className="space-y-6"
      >
        <BasicInfo />

        <Pricing />

        <Inventory />

        <ProductImages />

        <ProductStatus />

        <ProductSEO />

<ProductActions
  loading={loading}
  onCancel={() => {
    if (
      confirm(
        "Discard all changes?"
      )
    ) {
      methods.reset();
    }
  }}
  onPreview={() => {
    console.log(
      methods.getValues()
    );
  }}
/>
      </form>
    </FormProvider>
  );
}