import mongoose from "mongoose";

import asyncHandler from "../utils/asyncHandler.js";
import successResponse from "../utils/successResponse.js";

import productService from "../services/productService.js";

// ==========================================
// @desc    Get all products
// @route   GET /api/products
// ==========================================

export const getProducts = asyncHandler(
  async (req, res) => {
    const result =
      await productService.getProducts(
        req.query
      );

    successResponse(
      res,
      result,
      "Products fetched successfully."
    );
  }
);

// ==========================================
// @desc    Get product by slug
// @route   GET /api/products/:slug
// ==========================================

export const getProduct =
  asyncHandler(async (req, res) => {
    const product =
      await productService.getProductBySlug(
        req.params.slug
      );

    if (!product) {
      res.status(404);
      throw new Error(
        "Product not found."
      );
    }

    successResponse(
      res,
      { product },
      "Product fetched successfully."
    );
  });

// ==========================================
// @desc    Create product
// @route   POST /api/products
// ==========================================

export const createProduct =
  asyncHandler(async (req, res) => {
    const product =
      await productService.create(
        req.body
      );

    successResponse(
      res,
      { product },
      "Product created successfully.",
      201
    );
  });

// ==========================================
// @desc    Update product
// @route   PATCH /api/products/:id
// ==========================================

export const updateProduct =
  asyncHandler(async (req, res) => {
    if (
      !mongoose.isValidObjectId(
        req.params.id
      )
    ) {
      res.status(400);
      throw new Error(
        "Invalid product id."
      );
    }

    const product =
      await productService.update(
        req.params.id,
        req.body
      );

    if (!product) {
      res.status(404);
      throw new Error(
        "Product not found."
      );
    }

    successResponse(
      res,
      { product },
      "Product updated successfully."
    );
  });

// ==========================================
// @desc    Delete product
// @route   DELETE /api/products/:id
// ==========================================

export const deleteProduct =
  asyncHandler(async (req, res) => {
    if (
      !mongoose.isValidObjectId(
        req.params.id
      )
    ) {
      res.status(400);
      throw new Error(
        "Invalid product id."
      );
    }

    await productService.delete(
      req.params.id
    );

    successResponse(
      res,
      null,
      "Product deleted successfully."
    );
  });