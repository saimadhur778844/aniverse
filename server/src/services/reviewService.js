import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

/*
|--------------------------------------------------------------------------
| Update Product Rating
|--------------------------------------------------------------------------
*/

const updateProductRating = async (
  productId
) => {
  const reviews = await Review.find({
    product: productId,
    visible: true,
  });

  const reviewCount = reviews.length;

  let averageRating = 0;

  if (reviewCount > 0) {
    const total = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    averageRating =
      total / reviewCount;
  }

  await Product.findByIdAndUpdate(
    productId,
    {
      averageRating,
      reviewCount,
    }
  );
};

/*
|--------------------------------------------------------------------------
| Create Review
|--------------------------------------------------------------------------
*/

export const createReview = async ({
  user,
  product,
  order,
  rating,
  title,
  comment,
  images = [],
}) => {
  /*
  |--------------------------------------------------------------------------
  | Verify Purchase
  |--------------------------------------------------------------------------
  */

  const purchased =
    await Order.findOne({
      _id: order,
      user,
      orderStatus: "Delivered",
      "items.product": product,
    });

  if (!purchased) {
    throw new Error(
      "Only customers who purchased this product can review it."
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Prevent Duplicate Review
  |--------------------------------------------------------------------------
  */

  const exists =
    await Review.findOne({
      user,
      product,
      order,
    });

  if (exists) {
    throw new Error(
      "You have already reviewed this product."
    );
  }

  const review =
    await Review.create({
      user,
      product,
      order,
      rating,
      title,
      comment,
      images,
      verifiedPurchase: true,
    });

  await updateProductRating(
    product
  );

  return review;
};

/*
|--------------------------------------------------------------------------
| Get Product Reviews
|--------------------------------------------------------------------------
*/

export const getProductReviews =
  async (productId) => {
    return await Review.find({
      product: productId,
      visible: true,
    })
      .populate(
        "user",
        "name"
      )
      .sort({
        createdAt: -1,
      });
  };

/*
|--------------------------------------------------------------------------
| Get Review By ID
|--------------------------------------------------------------------------
*/

export const getReviewById =
  async (id) => {
    return await Review.findById(id)
      .populate(
        "user",
        "name email"
      )
      .populate(
        "product",
        "name"
      );
  };

/*
|--------------------------------------------------------------------------
| Update Review
|--------------------------------------------------------------------------
*/

export const updateReview = async (
  id,
  user,
  payload
) => {
  const review =
    await Review.findOne({
      _id: id,
      user,
    });

  if (!review) {
    throw new Error(
      "Review not found."
    );
  }

  review.rating =
    payload.rating;

  review.title =
    payload.title;

  review.comment =
    payload.comment;

  review.images =
    payload.images ?? [];

  await review.save();

  await updateProductRating(
    review.product
  );

  return review;
};

/*
|--------------------------------------------------------------------------
| Delete Review
|--------------------------------------------------------------------------
*/

export const deleteReview = async (
  id,
  user
) => {
  const review =
    await Review.findOne({
      _id: id,
      user,
    });

  if (!review) {
    throw new Error(
      "Review not found."
    );
  }

  const product =
    review.product;

  await review.deleteOne();

  await updateProductRating(
    product
  );
};

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

export const getAllReviews =
  async () => {
    return await Review.find()
      .populate(
        "user",
        "name email"
      )
      .populate(
        "product",
        "name"
      )
      .sort({
        createdAt: -1,
      });
};

export const toggleVisibility =
  async (id) => {
    const review =
      await Review.findById(id);

    if (!review) {
      throw new Error(
        "Review not found."
      );
    }

    review.visible =
      !review.visible;

    await review.save();

    await updateProductRating(
      review.product
    );

    return review;
};