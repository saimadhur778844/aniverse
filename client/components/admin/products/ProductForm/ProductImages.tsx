"use client";

import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import {
  Upload,
  Trash2,
  Star,
  Loader2,
} from "lucide-react";

import Card, {
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/shared/Card";

import Button from "@/components/shared/Button";

import uploadService from "@/services/uploadService";

interface ProductImage {
  url: string;
  isPrimary: boolean;
}

export default function ProductImages() {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const {
    watch,
    setValue,
  } = useFormContext();

  const images =
    watch("images") || [];

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const uploadImages = async (
    files: FileList | null
  ) => {
    if (!files?.length) return;

    setUploading(true);

    try {
      const uploaded: ProductImage[] =
        [];

      for (const file of Array.from(
        files
      )) {
        const result =
          await uploadService.uploadImage(
            file
          );

        uploaded.push({
          url: result.url,
          isPrimary:
            images.length === 0 &&
            uploaded.length === 0,
        });
      }

      setValue(
        "images",
        [...images, ...uploaded],
        {
          shouldValidate: true,
        }
      );
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (
    index: number
  ) => {
    const updated =
      images.filter(
        (
          _: unknown,
          i: number
        ) => i !== index
      );

    if (
      updated.length &&
      !updated.some(
        (
          img: ProductImage
        ) => img.isPrimary
      )
    ) {
      updated[0].isPrimary =
        true;
    }

    setValue(
      "images",
      updated
    );
  };

  const setPrimaryImage = (
    index: number
  ) => {
    setValue(
      "images",
      images.map(
        (
          img: ProductImage,
          i: number
        ) => ({
          ...img,
          isPrimary:
            i === index,
        })
      )
    );
  };

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Product Images
        </CardTitle>

        <CardDescription>
          Upload product images.
        </CardDescription>

      </CardHeader>

      <CardContent>

        <input
          ref={fileInputRef}
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={(e) =>
            uploadImages(
              e.target.files
            )
          }
        />

        <div
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-700 p-10 transition hover:border-pink-500"
        >

          {uploading ? (
            <Loader2 className="mb-4 h-10 w-10 animate-spin text-pink-500" />
          ) : (
            <Upload className="mb-4 h-10 w-10 text-pink-500" />
          )}

          <p className="font-medium text-white">
            Click to upload images
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            PNG, JPG, WEBP
          </p>

        </div>

        {images.length > 0 && (

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {images.map(
              (
                image: ProductImage,
                index: number
              ) => (

                <div
                  key={image.url}
                  className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
                >

                  <div className="relative aspect-square">

                    <Image
                      src={image.url}
                      alt=""
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div className="flex items-center justify-between p-3">

                    <Button
                      size="xs"
                      variant={
                        image.isPrimary
                          ? "success"
                          : "secondary"
                      }
                      leftIcon={
                        <Star size={14} />
                      }
                      onClick={() =>
                        setPrimaryImage(
                          index
                        )
                      }
                    >
                      {image.isPrimary
                        ? "Primary"
                        : "Make Primary"}
                    </Button>

                    <Button
                      size="xs"
                      variant="danger"
                      leftIcon={
                        <Trash2 size={14} />
                      }
                      onClick={() =>
                        removeImage(
                          index
                        )
                      }
                    >
                      <Trash2 size={14} />
                    </Button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </CardContent>

    </Card>
  );
}