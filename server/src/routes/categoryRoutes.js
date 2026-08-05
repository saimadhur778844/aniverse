import express from "express";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import protect from "../middleware/protect.js";
import admin from "../middleware/admin.js";

import { validate } from "../middleware/validate.js";
import { categorySchema } from "../validators/categoryValidator.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", getCategories);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  admin,
  validate(categorySchema),
  createCategory
);

router.put(
  "/:id",
  protect,
  admin,
  validate(categorySchema),
  updateCategory
);

router.patch(
  "/:id",
  protect,
  admin,
  validate(categorySchema),
  updateCategory
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteCategory
);

export default router;