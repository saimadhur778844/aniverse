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
import authorize from "../middleware/authorize.js";
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
authorize("admin", "superadmin"),
  getCoupons
);

router.get(
  "/:id",
  protect,
authorize("admin", "superadmin"),
  getCouponById
);

router.post(
  "/",
  protect,
authorize("admin", "superadmin"),
  validate(couponSchema),
  createCoupon
);

router.put(
  "/:id",
  protect,
authorize("admin", "superadmin"),
  validate(couponSchema),
  updateCoupon
);

router.patch(
  "/:id",
  protect,
authorize("admin", "superadmin"),
  validate(couponSchema),
  updateCoupon
);

router.patch(
  "/:id/toggle",
  protect,
authorize("admin", "superadmin"),
  toggleCouponStatus
);

router.delete(
  "/:id",
  protect,
authorize("admin", "superadmin"),
  deleteCoupon
);

export default router;