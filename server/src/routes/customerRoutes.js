import express from "express";

import {
  getCustomers,
  getCustomerById,
} from "../controllers/customerController.js";

import protect from "../middleware/protect.js";
import admin from "../middleware/admin.js";

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
  getCustomers
);

router.get(
  "/:id",
  protect,
  admin,
  getCustomerById
);

export default router;