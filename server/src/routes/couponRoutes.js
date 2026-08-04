import express from "express";

import {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus,
  validateCoupon,
} from "../controllers/couponController.js";

import protect from "../middleware/protect.js";
import admin from "../middleware/admin.js";

import { validate } from "../middleware/validate.js";
import { couponSchema } from "../validators/couponValidator.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.post(
  "/validate",
  validateCoupon
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  admin,
  getCoupons
);

router.get(
  "/:id",
  protect,
  admin,
  getCouponById
);

router.post(
  "/",
  protect,
  admin,
  validate(couponSchema),
  createCoupon
);

router.put(
  "/:id",
  protect,
  admin,
  validate(couponSchema),
  updateCoupon
);

router.patch(
  "/:id",
  protect,
  admin,
  validate(couponSchema),
  updateCoupon
);

router.patch(
  "/:id/toggle",
  protect,
  admin,
  toggleCouponStatus
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteCoupon
);

export default router;