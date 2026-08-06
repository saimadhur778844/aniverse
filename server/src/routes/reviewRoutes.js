import express from "express";

import {
  createReview,
  deleteReview,
  getAllReviews,
  getProductReviews,
  toggleVisibility,
  updateReview,
} from "../controllers/reviewController.js";

import protect from "../middleware/protect.js";
import authorize from "../middleware/authorize.js";
import { validate } from "../middleware/validate.js";
import { reviewSchema } from "../validators/reviewValidator.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.get(
  "/product/:productId",
  getProductReviews
);

/*
|--------------------------------------------------------------------------
| Customer
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  validate(reviewSchema),
  createReview
);

router.put(
  "/:id",
  protect,
  validate(reviewSchema),
  updateReview
);

router.delete(
  "/:id",
  protect,
  deleteReview
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
  getAllReviews
);

router.patch(
  "/:id/toggle",
  protect,
authorize("admin", "superadmin"),
  toggleVisibility
);

export default router;