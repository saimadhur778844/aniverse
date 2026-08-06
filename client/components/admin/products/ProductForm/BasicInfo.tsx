"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Card, {
  
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/shared/Card";

import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "@/components/shared/Form";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function BasicInfo() {
  const {
    watch,
    setValue,
  } = useFormContext();

  const name = watch("name");

  const slug = watch("slug");

  useEffect(() => {
    if (!slug && name) {
      setValue(
        "slug",
        slugify(name),
        {
          shouldValidate: true,
        }
      );
    }
  }, [
    name,
    slug,
    setValue,
  ]);

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Basic Information
        </CardTitle>

        <CardDescription>
          General product details.
        </CardDescription>

      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-2">

        <FormInput
          name="name"
          label="Product Name"
          placeholder="One Piece Luffy Figure"
        />

        <FormInput
          name="slug"
          label="Slug"
          placeholder="one-piece-luffy-figure"
        />

        <FormSelect
          name="category"
          label="Category"
          options={[
            {
              label: "Select Category",
              value: "",
            },
            {
              label: "Figures",
              value: "Figures",
            },
            {
              label: "Manga",
              value: "Manga",
            },
            {
              label: "Posters",
              value: "Posters",
            },
            {
              label: "Keychains",
              value: "Keychains",
            },
          ]}
        />

        <FormInput
          name="anime"
          label="Anime"
          placeholder="One Piece"
        />

        <FormInput
          name="brand"
          label="Brand"
          placeholder="Banpresto"
        />

        <FormInput
          name="sku"
          label="SKU"
          placeholder="ANI-OP-001"
        />

        <div className="md:col-span-2">

          <FormTextarea
            name="shortDescription"
            label="Short Description"
            placeholder="Short description..."
          />

        </div>

        <div className="md:col-span-2">

          <FormTextarea
            name="description"
            label="Full Description"
            placeholder="Complete product description..."
          />

        </div>

      </CardContent>

    </Card>
  );
}