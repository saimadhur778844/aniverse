"use client";

import Image from "next/image";
import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { Product } from "@/types/product";

import {
  getPrimaryImage,
  getDiscount,
  getCategoryName,
} from "@/utils/product";

interface ProductTableProps {
  products: Product[];
  loading: boolean;

  selectedProducts: string[];

  onSelectionChange: (
    ids: string[]
  ) => void;

  onEdit: (product: Product) => void;

  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  loading,
  selectedProducts,
  onSelectionChange,
  onEdit,
  onDelete,
}: ProductTableProps) {

  const isSelected = (
    id: string
  ) => selectedProducts.includes(id);

  const toggleSelection = (
    id: string
  ) => {
    if (isSelected(id)) {
      onSelectionChange(
        selectedProducts.filter(
          (item) => item !== id
        )
      );
    } else {
      onSelectionChange([
        ...selectedProducts,
        id,
      ]);
    }
  };

  const toggleAll = () => {
    if (
      selectedProducts.length ===
      products.length
    ) {
      onSelectionChange([]);
    } else {
      onSelectionChange(
        products.map(
          (product) => product._id
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-20">
        <div className="flex items-center justify-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />
          <span className="text-zinc-400">
            Loading products...
          </span>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-20">
        <div className="text-center">
          <div className="text-6xl">
            📦
          </div>

          <h3 className="mt-5 text-2xl font-bold text-white">
            No Products Found
          </h3>

          <p className="mt-3 text-zinc-400">
            Create your first product to start selling.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="border-b border-zinc-800 bg-zinc-950">

            <tr>

              <th className="w-12 px-4 py-4">

                <input
                  type="checkbox"
                  checked={
                    products.length > 0 &&
                    selectedProducts.length ===
                      products.length
                  }
                  onChange={toggleAll}
                  className="h-4 w-4 rounded"
                />

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Image
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Anime
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Stock
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Featured
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-300">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product._id}
                className="border-b border-zinc-800 transition-colors duration-200 hover:bg-zinc-800/40"
              >

                <td className="px-4 py-5">

                  <input
                    type="checkbox"
                    checked={isSelected(product._id)}
                    onChange={() =>
                      toggleSelection(product._id)
                    }
                    className="h-4 w-4 rounded"
                  />

                </td>

                <td className="px-6 py-5">
                  <Image
                    src={getPrimaryImage(product)}
                    alt={product.name}
                    width={72}
                    height={72}
                    className="rounded-xl border border-zinc-700 object-cover transition duration-300 hover:scale-105"
                  />
                </td>

                <td className="px-6 py-5">
                  <div>
                    <h3 className="font-semibold text-white">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      SKU: {product.sku}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 text-zinc-300">
                  {product.anime}
                </td>

                <td className="px-6 py-5 text-zinc-300">
                  {getCategoryName(product)}
                </td>

                <td className="px-6 py-5">
                  <div>
                    <p className="font-semibold text-white">
                      ₹{product.sellingPrice.toLocaleString()}
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-zinc-500 line-through">
                        ₹{product.mrp.toLocaleString()}
                      </span>

                      {getDiscount(product) > 0 && (
                        <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-semibold text-green-400">
                          {getDiscount(product)}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      product.inventory.stock === 0
                        ? "bg-red-500/20 text-red-400"
                        : product.inventory.stock <= product.inventory.minimumStock
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {product.inventory.stock === 0
                      ? "Out of Stock"
                      : product.inventory.stock <= product.inventory.minimumStock
                      ? `Low (${product.inventory.stock})`
                      : `${product.inventory.stock} Available`}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.featured
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-zinc-700 text-zinc-400"
                  }`}>
                    {product.featured ? "⭐ Featured" : "Regular"}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.status === "published"
                      ? "bg-green-500/20 text-green-400"
                      : product.status === "draft"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-zinc-700 text-zinc-400"
                  }`}>
                    {product.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">

                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      className="rounded-lg bg-blue-500/10 p-2 text-blue-400 transition hover:bg-blue-500/20"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(product._id)}
                      className="rounded-lg bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
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

    </div>
  );
}