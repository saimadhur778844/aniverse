"use client";

import { useFormContext } from "react-hook-form";
import {
  Eye,
  Star,
  Flame,
  Sparkles,
} from "lucide-react";

import Card, {
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/shared/Card";

import {
  FormSwitch,
} from "@/components/shared/Form";

import Badge from "@/components/shared/Badge";

export default function ProductStatus() {
  const { watch } =
    useFormContext();

  const published =
    watch("published");

  const featured =
    watch("featured");

  const trending =
    watch("trending");

  const newArrival =
    watch("newArrival");

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Product Status
        </CardTitle>

        <CardDescription>
          Control product visibility and promotions.
        </CardDescription>

      </CardHeader>

      <CardContent>

        <div className="grid gap-4 md:grid-cols-2">

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

            <FormSwitch
              name="published"
              label="Published"
            />

            <p className="mt-2 text-sm text-zinc-500">
              Visible on the storefront.
            </p>

          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

            <FormSwitch
              name="featured"
              label="Featured Product"
            />

            <p className="mt-2 text-sm text-zinc-500">
              Show on homepage sections.
            </p>

          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

            <FormSwitch
              name="trending"
              label="Trending"
            />

            <p className="mt-2 text-sm text-zinc-500">
              Display inside Trending Products.
            </p>

          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

            <FormSwitch
              name="newArrival"
              label="New Arrival"
            />

            <p className="mt-2 text-sm text-zinc-500">
              Show inside New Arrivals.
            </p>

          </div>

        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5">

          <p className="mb-4 font-semibold text-white">
            Storefront Preview
          </p>

          <div className="flex flex-wrap gap-3">

            <Badge
              variant={
                published
                  ? "success"
                  : "danger"
              }
            >
              <Eye
                size={14}
                className="mr-1"
              />

              {published
                ? "Published"
                : "Draft"}
            </Badge>

            {featured && (
              <Badge variant="primary">
                <Star
                  size={14}
                  className="mr-1"
                />

                Featured
              </Badge>
            )}

            {trending && (
              <Badge variant="warning">
                <Flame
                  size={14}
                  className="mr-1"
                />

                Trending
              </Badge>
            )}

            {newArrival && (
              <Badge variant="info">
                <Sparkles
                  size={14}
                  className="mr-1"
                />

                New Arrival
              </Badge>
            )}

          </div>

        </div>

      </CardContent>

    </Card>
  );
}