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
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl bg-white shadow-sm border border-gray-200 p-12 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

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
                {product.name}
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
                ₹{product.price}
              </td>

              <td className="px-6 py-4">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    product.stock === 0
                      ? "bg-red-100 text-red-700"
                      : product.stock <= 5
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {product.stock}
                </span>

              </td>

              <td className="px-6 py-4">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    product.featured
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {product.featured
                    ? "Yes"
                    : "No"}
                </span>

              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-4">

                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(product._id)
                    }
                    className="text-red-600 hover:text-red-800"
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