import express from "express";

import {
  getCustomers,
  getCustomerById,
} from "../controllers/customerController.js";

import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";
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
  getCustomers
);

router.get(
  "/:id",
  protect,
authorize("admin", "superadmin"),
  getCustomerById
);

export default router;