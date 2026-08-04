import express from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import protect from "../middleware/protect.js";
import admin from "../middleware/admin.js";
import { validate } from "../middleware/validate.js";
import { productSchema } from "../validators/productValidator.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", getProducts);

router.get("/:slug", getProduct);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  admin,
  validate(productSchema),
  createProduct
);

router.put(
  "/:id",
  protect,
  admin,
  validate(productSchema),
  updateProduct
);

router.patch(
  "/:id",
  protect,
  admin,
  validate(productSchema),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

export default router;