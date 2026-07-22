"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import {
  getProducts,
  deleteProduct,
} from "@/services/productService";
import { Product } from "@/types/product";
import ProductModal from "@/components/admin/ProductModal/ProductModal";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] =
  useState<Product | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();
      console.log("Products API response:", data);

      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    await deleteProduct(id);

    alert("Product deleted successfully!");

    loadProducts();
  } catch (error) {
    console.error(error);
    alert("Failed to delete product.");
  }
};

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <button
  onClick={() => {
    setSelectedProduct(null);
    setShowModal(true);
  }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow">

          <table className="min-w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left">Image</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Anime</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Stock</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
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

                    <td className="px-6 py-4 font-medium">
                      {product.name}
                    </td>

                    <td className="px-6 py-4">
                      {product.anime}
                    </td>

                    <td className="px-6 py-4">
                      ₹{product.price}
                    </td>

                    <td className="px-6 py-4">
                      {product.stock}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">

                       <button
                        onClick={() => {
                            setSelectedProduct(product);
                            setShowModal(true);
                        }}
                        >
                        <PencilIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                        </button>

                        <button
                        onClick={() => handleDelete(product._id)}
                        >
                        <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>

      </div>

      <ProductModal
        open={showModal}
        product={selectedProduct}
        onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
        }}
        onSuccess={() => {
            loadProducts();
            setShowModal(false);
            setSelectedProduct(null);
        }}
        />
    </>
  );
}