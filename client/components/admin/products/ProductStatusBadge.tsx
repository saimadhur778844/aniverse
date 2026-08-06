"use client";

import Badge from "@/components/shared/Badge";

import { ProductStatus } from "@/types/product";

interface Props {
  status: ProductStatus;
}

export default function ProductStatusBadge({
  status,
}: Props) {
  switch (status) {
    case "published":
      return (
        <Badge variant="success">
          Published
        </Badge>
      );

    case "draft":
      return (
        <Badge variant="warning">
          Draft
        </Badge>
      );

    case "archived":
      return (
        <Badge variant="secondary">
          Archived
        </Badge>
      );

    default:
      return (
        <Badge variant="secondary">
          Unknown
        </Badge>
      );
  }
}