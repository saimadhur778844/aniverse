import * as reviewService from "../services/reviewService.js";

/*
|--------------------------------------------------------------------------
| Create Review
|--------------------------------------------------------------------------
*/

export const createReview = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const review =
      await reviewService.createReview({
        user: req.user._id,
        ...req.body,
      });

    res.status(201).json({
      success: true,
      message:
        "Review created successfully.",
      review,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Product Reviews
|--------------------------------------------------------------------------
*/

export const getProductReviews =
  async (req, res, next) => {
    try {
      const reviews =
        await reviewService.getProductReviews(
          req.params.productId
        );

      res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Update Review
|--------------------------------------------------------------------------
*/

export const updateReview = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const review =
      await reviewService.updateReview(
        req.params.id,
        req.user._id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Review updated successfully.",
      review,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Review
|--------------------------------------------------------------------------
*/

export const deleteReview = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    await reviewService.deleteReview(
      req.params.id,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message:
        "Review deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Admin Reviews
|--------------------------------------------------------------------------
*/

export const getAllReviews =
  async (req, res, next) => {
    try {
      const reviews =
        await reviewService.getAllReviews();

      res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Toggle Visibility
|--------------------------------------------------------------------------
*/

export const toggleVisibility =
  async (req, res, next) => {
    try {
      const review =
        await reviewService.toggleVisibility(
          req.params.id
        );

      res.status(200).json({
        success: true,
        message:
          "Review visibility updated successfully.",
        review,
      });
    } catch (error) {
      next(error);
    }
  };