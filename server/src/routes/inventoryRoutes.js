import express from "express";

import {
  getInventoryList,
  getAnalytics,
  updateStock,
} from "../controllers/inventoryController.js";

import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";
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
authorize("admin", "superadmin"),
  getInventoryList
);

router.get(
  "/analytics",
  protect,
authorize("admin", "superadmin"),
  getAnalytics
);

router.patch(
  "/:id/adjust",
  protect,
authorize("admin", "superadmin"),
  validate(inventoryAdjustmentSchema),
  updateStock
);

export default router;