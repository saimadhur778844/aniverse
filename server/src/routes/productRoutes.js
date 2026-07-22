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

const router = express.Router();

router.get("/", getProducts);

router.get("/:slug", getProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);
router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;