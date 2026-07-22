import mongoose from "mongoose";
import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";
import slugify from "slugify";

// @desc    Get all products
// @route   GET /api/products
export const getProducts = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    featured,
    sort = "newest",
    page = 1,
    limit = 12,
  } = req.query;

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { anime: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    filter.category = category;
  }

  if (featured === "true") {
    filter.featured = true;
  }

  let sortOption = {};

  switch (sort) {
    case "price-asc":
      sortOption.price = 1;
      break;

    case "price-desc":
      sortOption.price = -1;
      break;

    case "rating":
      sortOption.rating = -1;
      break;

    default:
      sortOption.createdAt = -1;
  }

  const total = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .populate("category")
    .sort(sortOption)
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  res.status(200).json({
    success: true,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    products,
  });
});

// @desc    Get single product
// @route   GET /api/products/:slug
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    slug: req.params.slug,
  }).populate("category");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// @desc    Create product
// @route   POST /api/products
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({
    ...req.body,
    slug: slugify(req.body.name, {
      lower: true,
      strict: true,
    }),
  });

  res.status(201).json({
    success: true,
    product,
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
export const updateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid product id");
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("Product update data is required");
  }

    if (req.body.name) {
  req.body.slug = slugify(req.body.name, {
    lower: true,
    strict: true,
  });
  }
  
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});