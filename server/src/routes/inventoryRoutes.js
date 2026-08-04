import express from "express";

import {
  getInventoryList,
  getAnalytics,
  updateStock,
} from "../controllers/inventoryController.js";

import protect from "../middleware/protect.js";
import admin from "../middleware/admin.js";

import { validate } from "../middleware/validate.js";
import { inventoryAdjustmentSchema } from "../validators/inventoryValidator.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  admin,
  getInventoryList
);

router.get(
  "/analytics",
  protect,
  admin,
  getAnalytics
);

router.patch(
  "/:id/adjust",
  protect,
  admin,
  validate(inventoryAdjustmentSchema),
  updateStock
);

export default router;