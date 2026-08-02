import express from "express";

import {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus,
} from "../controllers/couponController.js";
import {
  validateCoupon,
} from "../controllers/couponController.js";
const router = express.Router();

/*
|--------------------------------------------------------------------------
| Coupon Routes
|--------------------------------------------------------------------------
*/

router.post("/", createCoupon);

router.get("/", getCoupons);

router.post(
  "/validate",
  validateCoupon
);

router.get("/:id", getCouponById);

router.put("/:id", updateCoupon);

router.delete("/:id", deleteCoupon);

router.patch(
  "/:id/toggle",
  toggleCouponStatus
);

export default router;