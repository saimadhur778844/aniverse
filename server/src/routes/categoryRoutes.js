import express from "express";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";
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
authorize("admin", "superadmin"),
  validate(categorySchema),
  createCategory
);

router.put(
  "/:id",
  protect,
authorize("admin", "superadmin"),
  validate(categorySchema),
  updateCategory
);

router.patch(
  "/:id",
  protect,
authorize("admin", "superadmin"),
  validate(categorySchema),
  updateCategory
);

router.delete(
  "/:id",
  protect,
authorize("admin", "superadmin"),
  deleteCategory
);

export default router;