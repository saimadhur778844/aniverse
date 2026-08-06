"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import categoryService from "@/services/categoryService";
import { productService } from "@/services/productService";
import uploadImage from "@/services/uploadService";

import LoadingButton from "@/components/auth/LoadingButton/LoadingButton";

import { Product } from "@/types/product";
import { notify } from "@/utils/toast";
import { getPrimaryImage } from "@/utils/product";
import uploadService from "@/services/uploadService";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
}

interface Category {
  _id: string;
  name: string;
}

export default function ProductModal({
  open,
  onClose,
  onSuccess,
  product,
}: ProductModalProps) {
  const [form, setForm] = useState({
    name: "",
    anime: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    featured: false,
  });

  const [image, setImage] =
    useState<File | null>(null);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(false);

  const isEditMode = !!product;

  const previewImage = useMemo(() => {
    if (image) {
      return URL.createObjectURL(image);
    }

    return product?.images?.find(
      (img) => img.isPrimary
    )?.url ?? product?.images?.[0]?.url ?? "";
  }, [image, product]);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(
          previewImage
        );
      }
    };
  }, [image, previewImage]);

  useEffect(() => {
    const fetchCategories =
      async () => {
        try {
          const data =
            await categoryService.getCategories();

          setCategories(
            Array.isArray(data)
              ? data
              : []
          );
        } catch (error) {
          console.error(error);

          notify.error(
            "Unable to load categories."
          );
        }
      };

    if (!open) return;

    fetchCategories();

    if (product) {
      setForm({
        name: product.name,
        anime: product.anime,
        category:
          product.category,
        description:
          product.description,
        price:
          product.mrp.toString(),
        stock:
          product.inventory?.stock.toString(),
        featured:
          product.featured,
      });
    } else {
      setForm({
        name: "",
        anime: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        featured: false,
      });

      setImage(null);
    }
  }, [open, product]);

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
      type,
    } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? (
              e.target as HTMLInputElement
            ).checked
          : value,
    }));
  };
    const handleSave = async () => {
    if (!form.name.trim()) {
      notify.error("Product name is required.");
      return;
    }

    if (!form.category) {
      notify.error("Please select a category.");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      notify.error("Please enter a valid price.");
      return;
    }

    if (!form.stock || Number(form.stock) < 0) {
      notify.error("Please enter a valid stock quantity.");
      return;
    }

    if (!isEditMode && !image) {
      notify.error("Please select a product image.");
      return;
    }

    const loadingToast = notify.loading(
      isEditMode
        ? "Updating product..."
        : "Creating product..."
    );

    try {
      setLoading(true);

      let imageUrl = getPrimaryImage(product ?? ({} as Product));

      /*
      |--------------------------------------------------------------------------
      | Upload Image
      |--------------------------------------------------------------------------
      */

      if (image) {
        notify.dismiss(loadingToast);

        const uploadToast =
          notify.loading("Uploading image...");

        const uploadResponse =
          await uploadService.uploadImage(image);

        notify.dismiss(uploadToast);

        imageUrl =
          uploadResponse.url;

        notify.success(
          "Image uploaded successfully."
        );

        notify.loading(
          isEditMode
            ? "Updating product..."
            : "Creating product..."
        );
      }

      const payload = {
        name: form.name.trim(),

        anime: form.anime.trim(),

        category: form.category,

        description:
          form.description.trim(),

        image: imageUrl,

        mrp: Number(form.price),

        sellingPrice: Number(form.price),

        stock: Number(form.stock),

        featured: form.featured,
      };

      /*
      |--------------------------------------------------------------------------
      | Update
      |--------------------------------------------------------------------------
      */

      if (isEditMode && product) {
        await productService.updateProduct(
          product._id,
          payload
        );

        notify.dismiss();

        notify.success(
          "Product updated successfully."
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Create
      |--------------------------------------------------------------------------
      */

      else {
        await productService.createProduct(
          payload
        );

        notify.dismiss();

        notify.success(
          "Product created successfully."
        );
      }

      onSuccess();

      setForm({
        name: "",
        anime: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        featured: false,
      });

      setImage(null);

      onClose();
    } catch (error: any) {
      notify.dismiss();

      console.error(error);

      notify.error(
        error?.response?.data?.message ??
          error?.message ??
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">

      <div className="w-full max-w-3xl rounded-3xl border border-zinc-800 bg-[#171726] shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-white">
              {isEditMode
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              {isEditMode
                ? "Update your product information."
                : "Create a new anime collectible."}
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl bg-zinc-800 p-3 text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
          >
            ✕
          </button>

        </div>

        {/* Body */}

        <div className="space-y-6 p-8">

          {/* Basic Details */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                disabled={loading}
                onChange={handleChange}
                placeholder="Monkey D. Luffy Figure"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-pink-500 disabled:opacity-60"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Anime
              </label>

              <input
                type="text"
                name="anime"
                value={form.anime}
                disabled={loading}
                onChange={handleChange}
                placeholder="One Piece"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-pink-500 disabled:opacity-60"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Price (₹)
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                disabled={loading}
                onChange={handleChange}
                placeholder="2999"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-pink-500 disabled:opacity-60"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={form.stock}
                disabled={loading}
                onChange={handleChange}
                placeholder="20"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-pink-500 disabled:opacity-60"
              />

            </div>

          </div>

          {/* Description */}

          <div>

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Description
            </label>
                      <textarea
            name="description"
            rows={5}
            value={form.description}
            disabled={loading}
            onChange={handleChange}
            placeholder="Describe this collectible..."
            className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-pink-500 disabled:opacity-60"
          />

        </div>

        {/* Category */}

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            disabled={loading}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-pink-500 disabled:opacity-60"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (

              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>

            ))}

          </select>

        </div>

        {/* Featured */}

        <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

          <div>

            <h3 className="font-semibold text-white">
              Featured Product
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              Display this product in featured sections.
            </p>

          </div>

          <label className="relative inline-flex cursor-pointer items-center">

            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              disabled={loading}
              onChange={handleChange}
              className="peer sr-only"
            />

            <div className="peer h-7 w-12 rounded-full bg-zinc-700 transition peer-checked:bg-pink-600 peer-disabled:opacity-50" />

            <div className="absolute left-1 h-5 w-5 rounded-full bg-white transition-all peer-checked:translate-x-5" />

          </label>

        </div>

        {/* Image */}

        <div>

          <label className="mb-3 block text-sm font-medium text-zinc-300">

            {isEditMode
              ? "Replace Product Image"
              : "Upload Product Image"}

          </label>

          <div className="rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900 p-6 transition hover:border-pink-500">

            <input
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={(e) =>
                setImage(
                  e.target.files?.[0] ??
                    null
                )
              }
              className="w-full text-sm text-zinc-400 file:mr-4 file:rounded-lg file:border-0 file:bg-pink-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-pink-500"
            />

            <p className="mt-3 text-xs text-zinc-500">
              JPG, PNG or WEBP • Max 5 MB
            </p>

          </div>

        </div>

        {/* Preview */}

        {previewImage && (

          <div>

            <label className="mb-3 block text-sm font-medium text-zinc-300">
              Preview
            </label>

            <div className="relative h-52 w-52 overflow-hidden rounded-2xl border border-zinc-700">

              <Image
                src={previewImage}
                alt="Preview"
                fill
                className="object-cover"
              />

            </div>

          </div>

        )}
                {/* Footer */}

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-zinc-800 pt-8 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() => {
              if (loading) return;

              setImage(null);

              onClose();
            }}
            disabled={loading}
            className="rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <LoadingButton
            type="button"
            loading={loading}
            loadingText={
              isEditMode
                ? "Updating Product..."
                : "Saving Product..."
            }
            onClick={handleSave}
            disabled={
              !form.name.trim() ||
              !form.price ||
              !form.category ||
              (!isEditMode && !image)
            }
            className="rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-pink-500 hover:via-purple-500 hover:to-pink-500 hover:shadow-pink-500/20"
          >
            {isEditMode
              ? "Update Product"
              : "Save Product"}
          </LoadingButton>

        </div>

      </div>

    </div>
    </div>

  );
}