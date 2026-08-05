"use client";

import Image from "next/image";
import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  loading,
  onEdit,
  onDelete,
}: ProductTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl bg-white shadow-sm border border-gray-200 p-12 text-center">
        <div className="rounded-xl border border-gray-200 bg-white p-12">
          <div className="flex items-center justify-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />
            <span className="text-gray-600">
              Loading products...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl bg-white shadow-sm border border-gray-200 p-12 text-center text-gray-500">
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-16 text-center">

          <div className="text-6xl">
            📦
          </div>

          <h3 className="mt-5 text-xl font-bold">
            No Products Found
          </h3>

          <p className="mt-2 text-gray-500">
            Create your first product to start selling.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">  
    
      <table className="min-w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="px-6 py-4 text-left">
              Image
            </th>

            <th className="px-6 py-4 text-left">
              Product
            </th>

            <th className="px-6 py-4 text-left">
              Anime
            </th>

            <th className="px-6 py-4 text-left">
              Category
            </th>

            <th className="px-6 py-4 text-left">
              Price
            </th>

            <th className="px-6 py-4 text-left">
              Stock
            </th>

            <th className="px-6 py-4 text-left">
              Featured
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product._id}
              className="border-t hover:bg-gray-50"
            >

              <td className="px-6 py-4">

                <Image
                  src={product.image}
                  alt={product.name}
                  width={70}
                  height={70}
                  className="rounded-lg object-cover"
                />

              </td>

              <td className="px-6 py-4 font-semibold">
                <div>

                  <h3 className="font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    #{product._id.slice(-6)}
                  </p>

                </div>
              </td>

              <td className="px-6 py-4">
                {product.anime}
              </td>

              <td className="px-6 py-4">
                {typeof product.category ===
                "string"
                  ? product.category
                  : product.category.name}
              </td>

              <td className="px-6 py-4">
                ₹{product.price.toLocaleString()}
              </td>

              <td className="px-6 py-4">

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      product.stock === 0
                        ? "bg-red-100 text-red-700"
                        : product.stock <= 5
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {product.stock === 0
                      ? "Out of Stock"
                      : product.stock <= 5
                      ? `Low Stock (${product.stock})`
                      : `In Stock (${product.stock})`}
                  </span>

              </td>

              <td className="px-6 py-4">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.featured
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {product.featured
                    ? "⭐ Featured"
                    : "Regular"}
                </span>

              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-2">

                  <button
                    type="button"
                    title="Edit Product"
                    aria-label="Edit Product"
                    onClick={() => onEdit(product)}
                    className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100 hover:text-blue-800"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    title="Delete Product"
                    aria-label="Delete Product"
                    onClick={() => onDelete(product._id)}
                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-100 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}