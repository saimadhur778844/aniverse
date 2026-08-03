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

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Customer
|--------------------------------------------------------------------------
*/

router.get(
  "/product/:productId",
  getProductReviews
);

router.post(
  "/",
  protect,
  createReview
);

router.put(
  "/:id",
  protect,
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
  getAllReviews
);

router.patch(
  "/:id/toggle",
  protect,
  toggleVisibility
);

export default router;