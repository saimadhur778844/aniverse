import express from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";
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
authorize("admin", "superadmin"),
  validate(productSchema),
  createProduct
);

router.put(
  "/:id",
 protect,
authorize("admin", "superadmin"),
  validate(productSchema),
  updateProduct
);

router.patch(
  "/:id",
  protect,
authorize("admin", "superadmin"),
  validate(productSchema),
  updateProduct
);

router.delete(
  "/:id",
  protect,
authorize("admin", "superadmin"),
  deleteProduct
);

export default router;