import express from "express";

import { getDashboardStats } from "../controllers/dashboardController.js";

import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";
const router = express.Router();

/*
|--------------------------------------------------------------------------
| Dashboard (Admin)
|--------------------------------------------------------------------------
*/

router.get(
  "/",
 protect,
authorize("admin", "superadmin"),
  getDashboardStats
);

export default router;