"use client";

import Image from "next/image";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import Button from "@/components/shared/Button";

import {
  Column,
} from "@/components/shared/DataTable";

import {
  Product,
} from "@/types/product";

import ProductStatusBadge from "./ProductStatusBadge";

interface Props {
  onView(
    product: Product
  ): void;

  onEdit(
    product: Product
  ): void;

  onDelete(
    product: Product
  ): void;
}

export default function getProductColumns({
  onView,
  onEdit,
  onDelete,
}: Props): Column<Product>[] {
  return [
    {
      id: "image",

      header: "Image",

      cell: (product) => (
        <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-zinc-800">

          <Image
            src={
              product.images?.find(
                (image) =>
                  image.isPrimary
              )?.url ||
              "/placeholder.png"
            }
            alt={product.name}
            fill
            className="object-cover"
          />

        </div>
      ),
    },

    {
      id: "name",

      header: "Product",

      accessor: "name",

      sortable: true,

      cell: (product) => (
        <div>

          <p className="font-medium text-white">
            {product.name}
          </p>

          <p className="text-xs text-zinc-500">
            {product.sku}
          </p>

        </div>
      ),
    },

    {
      id: "category",

      header: "Category",

      accessor: "category",
    },

    {
      id: "anime",

      header: "Anime",

      accessor: "anime",
    },

    {
      id: "price",

      header: "Price",

      sortable: true,

      cell: (product) => (
        <div>

          <p className="font-semibold">
            ₹
            {product.sellingPrice.toLocaleString()}
          </p>

          <p className="text-xs text-zinc-500 line-through">
            ₹
            {product.mrp.toLocaleString()}
          </p>

        </div>
      ),
    },

    {
      id: "stock",

      header: "Stock",

      sortable: true,

      cell: (product) => {
        const stock =
          product.inventory.stock;

        return (
          <span
            className={
              stock <=
              product.inventory
                .minimumStock
                ? "font-semibold text-red-400"
                : "text-green-400"
            }
          >
            {stock}
          </span>
        );
      },
    },

    {
      id: "status",

      header: "Status",

      cell: (product) => (
        <ProductStatusBadge
          status={
            product.status
          }
        />
      ),
    },

    {
      id: "actions",

      header: "",

      align: "right",

      cell: (product) => (
        <div className="flex justify-end gap-2">

          <Button
            size="xs"
            variant="ghost"
            onClick={() =>
              onView(product)
            }
          >
            <Eye size={16} />
          </Button>

          <Button
            size="xs"
            variant="secondary"
            onClick={() =>
              onEdit(product)
            }
          >
            <Pencil size={16} />
          </Button>

          <Button
            size="xs"
            variant="danger"
            onClick={() =>
              onDelete(product)
            }
          >
            <Trash2 size={16} />
          </Button>

        </div>
      ),
    },
  ];
}