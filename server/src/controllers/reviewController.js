import * as reviewService from "../services/reviewService.js";

/*
|--------------------------------------------------------------------------
| Create Review
|--------------------------------------------------------------------------
*/

export const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview({
      user: req.user._id,
      ...req.body,
    });

    return res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Product Reviews
|--------------------------------------------------------------------------
*/

export const getProductReviews = async (
  req,
  res
) => {
  try {
    const reviews =
      await reviewService.getProductReviews(
        req.params.productId
      );

    return res.json({
      success: true,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update Review
|--------------------------------------------------------------------------
*/

export const updateReview = async (
  req,
  res
) => {
  try {
    const review =
      await reviewService.updateReview(
        req.params.id,
        req.user._id,
        req.body
      );

    return res.json({
      success: true,
      review,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Delete Review
|--------------------------------------------------------------------------
*/

export const deleteReview = async (
  req,
  res
) => {
  try {
    await reviewService.deleteReview(
      req.params.id,
      req.user._id
    );

    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Admin Reviews
|--------------------------------------------------------------------------
*/

export const getAllReviews = async (
  req,
  res
) => {
  try {
    const reviews =
      await reviewService.getAllReviews();

    return res.json({
      success: true,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleVisibility = async (
  req,
  res
) => {
  try {
    const review =
      await reviewService.toggleVisibility(
        req.params.id
      );

    return res.json({
      success: true,
      review,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};