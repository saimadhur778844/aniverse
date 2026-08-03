"use client";

import { useEffect, useState } from "react";
import categoryService from "@/services/categoryService";
import { productService } from "@/services/productService";
import { uploadImage } from "@/services/uploadService";
import { Product } from "@/types/product";
import { notify } from "@/utils/toast";

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

  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const isEditMode = !!product;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };

    if (open) {
      fetchCategories();

      if (product) {
        setForm({
          name: product.name,
          anime: product.anime,
          category:
            typeof product.category === "string"
              ? product.category
              : product.category._id,
          description: product.description,
          price: product.price.toString(),
          stock: product.stock.toString(),
          featured: product.featured,
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
    }
  }, [open, product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      let imageUrl = product?.image ?? "";

      if (image) {
        const uploadResponse = await uploadImage(image);
        imageUrl = uploadResponse.imageUrl;
      }

      const payload = {
        name: form.name,
        anime: form.anime,
        category: form.category,
        description: form.description,
        image: imageUrl,
        price: Number(form.price),
        stock: Number(form.stock),
        featured: form.featured,
      };

      if (isEditMode && product) {
        await productService.updateProduct(
          product._id,
          payload
        );

        notify.success("Product updated successfully!");
      } else {
        if (!image) {
          notify.error("Please select an image.");
          return;
        }

        await productService.createProduct(payload);

        notify.success("Product created successfully!");
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
      console.error(error);

      if (error.response) {
        notify.error(error.response.data.message);
      } else {
        notify.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Product" : "Add Product"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="anime"
            placeholder="Anime"
            value={form.anime}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="border rounded-lg p-3 mt-4 w-full"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border rounded-lg p-3 mt-4 w-full"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-3 mt-4">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />

          <label>Featured Product</label>
        </div>

        <div className="mt-4">
          <label className="block mb-2 font-medium">
            {isEditMode
              ? "Replace Product Image (Optional)"
              : "Product Image"}
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            className="w-full"
          />
        </div>

        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="mt-3 h-32 w-32 object-cover rounded-lg border"
          />
        ) : (
          isEditMode &&
          product?.image && (
            <img
              src={product.image}
              alt={product.name}
              className="mt-3 h-32 w-32 object-cover rounded-lg border"
            />
          )
        )}

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => {
              setImage(null);
              onClose();
            }}
            disabled={loading}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={
              loading ||
              !form.name ||
              !form.price ||
              !form.category ||
              (!isEditMode && !image)
            }
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Product"
              : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
}