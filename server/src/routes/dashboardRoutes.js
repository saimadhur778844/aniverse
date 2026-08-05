import express from "express";

import { getDashboardStats } from "../controllers/dashboardController.js";

import protect from "../middleware/protect.js";
import admin from "../middleware/admin.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Dashboard (Admin)
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  admin,
  getDashboardStats
);

export default router;