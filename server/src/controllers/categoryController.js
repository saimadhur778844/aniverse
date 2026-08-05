import mongoose from "mongoose";
import slugify from "slugify";

import Category from "../models/Category.js";

import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get all categories
// @route   GET /api/categories
export const getCategories =
  asyncHandler(async (req, res) => {
    const categories =
      await Category.find().sort({
        name: 1,
      });

    res.status(200).json({
      success: true,
      categories,
    });
  });

// @desc    Create category
// @route   POST /api/categories
export const createCategory =
  asyncHandler(async (req, res) => {

    const existing =
      await Category.findOne({
        name: req.body.name,
      });

    if (existing) {
      res.status(409);

      throw new Error(
        "Category already exists."
      );
    }

    const category =
      await Category.create({
        ...req.body,

        slug: slugify(
          req.body.name,
          {
            lower: true,
            strict: true,
          }
        ),
      });

    res.status(201).json({
      success: true,
      message:
        "Category created successfully.",
      category,
    });
  });
  // @desc    Update category
// @route   PUT /api/categories/:id
export const updateCategory =
  asyncHandler(async (req, res) => {
    if (
      !mongoose.isValidObjectId(
        req.params.id
      )
    ) {
      res.status(400);
      throw new Error(
        "Invalid category id."
      );
    }

    if (
      !req.body ||
      Object.keys(req.body).length === 0
    ) {
      res.status(400);
      throw new Error(
        "Category update data is required."
      );
    }

    if (req.body.name) {
      req.body.slug = slugify(
        req.body.name,
        {
          lower: true,
          strict: true,
        }
      );
    }

    const category =
      await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!category) {
      res.status(404);
      throw new Error(
        "Category not found."
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Category updated successfully.",
      category,
    });
  });

// @desc    Delete category
// @route   DELETE /api/categories/:id
export const deleteCategory =
  asyncHandler(async (req, res) => {
    if (
      !mongoose.isValidObjectId(
        req.params.id
      )
    ) {
      res.status(400);
      throw new Error(
        "Invalid category id."
      );
    }

    const category =
      await Category.findById(
        req.params.id
      );

    if (!category) {
      res.status(404);
      throw new Error(
        "Category not found."
      );
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Category deleted successfully.",
    });
  });