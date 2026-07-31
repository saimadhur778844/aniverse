import express from "express";

import {
  getInventoryList,
  getAnalytics,
  updateStock,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getInventoryList);

router.get(
  "/analytics",
  getAnalytics
);

router.patch(
  "/:id/adjust",
  updateStock
);

export default router;