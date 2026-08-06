"use client";

import { useFormContext } from "react-hook-form";

import Card, {
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/shared/Card";

import {
  FormInput,
  FormTextarea,
} from "@/components/shared/Form";

export default function ProductSEO() {
  const { watch } = useFormContext();

  const metaTitle =
    watch("metaTitle") || "";

  const metaDescription =
    watch("metaDescription") || "";

  const productName =
    watch("name") || "Product Name";

  const slug =
    watch("slug") || "product-slug";

  const titleLength =
    metaTitle.length;

  const descriptionLength =
    metaDescription.length;

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          SEO
        </CardTitle>

        <CardDescription>
          Improve how this product appears in search engines.
        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-6">

        <FormInput
          name="metaTitle"
          label="Meta Title"
          placeholder="SEO title"
        />

        <div className="flex justify-end">

          <span
            className={`text-xs ${
              titleLength > 60
                ? "text-red-500"
                : "text-zinc-500"
            }`}
          >
            {titleLength}/60
          </span>

        </div>

        <FormTextarea
          name="metaDescription"
          label="Meta Description"
          placeholder="SEO description"
        />

        <div className="flex justify-end">

          <span
            className={`text-xs ${
              descriptionLength >
              160
                ? "text-red-500"
                : "text-zinc-500"
            }`}
          >
            {descriptionLength}/160
          </span>

        </div>

        <FormInput
          name="keywords"
          label="Keywords"
          placeholder="anime, one piece, figure"
        />

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">

          <p className="mb-4 font-semibold text-white">
            Google Preview
          </p>

          <div className="space-y-2">

            <h3 className="text-lg font-medium text-blue-400">

              {metaTitle ||
                productName}

            </h3>

            <p className="text-sm text-green-500">

              https://aniverseofficial.in/products/{slug}

            </p>

            <p className="text-sm text-zinc-400">

              {metaDescription ||
                "Your product description will appear here in Google search results."}

            </p>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}