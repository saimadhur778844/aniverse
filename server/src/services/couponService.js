import Coupon from "../models/Coupon.js";

/*
|--------------------------------------------------------------------------
| Create Coupon
|--------------------------------------------------------------------------
*/

export const createCoupon = async (
  payload
) => {
  const exists =
    await Coupon.findOne({
      code: payload.code.toUpperCase(),
    });

  if (exists) {
    throw new Error(
      "Coupon already exists."
    );
  }

  return await Coupon.create({
    ...payload,
    code: payload.code.toUpperCase(),
  });
};

/*
|--------------------------------------------------------------------------
| Get Coupons
|--------------------------------------------------------------------------
*/

export const getCoupons = async ({
  page = 1,
  limit = 10,
  search = "",
}) => {
  const query = {};

  if (search) {
    query.code = {
      $regex: search,
      $options: "i",
    };
  }

  const skip = (page - 1) * limit;

  const [coupons, total] =
    await Promise.all([
      Coupon.find(query)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit),

      Coupon.countDocuments(query),
    ]);

  return {
    coupons,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

/*
|--------------------------------------------------------------------------
| Get Coupon By ID
|--------------------------------------------------------------------------
*/

export const getCouponById = async (
  id
) => {
  const coupon =
    await Coupon.findById(id);

  if (!coupon) {
    throw new Error(
      "Coupon not found."
    );
  }

  return coupon;
};

/*
|--------------------------------------------------------------------------
| Update Coupon
|--------------------------------------------------------------------------
*/

export const updateCoupon = async (
  id,
  payload
) => {
  const coupon =
    await Coupon.findById(id);

  if (!coupon) {
    throw new Error(
      "Coupon not found."
    );
  }

  Object.assign(coupon, payload);

  if (payload.code) {
    coupon.code =
      payload.code.toUpperCase();
  }

  await coupon.save();

  return coupon;
};

/*
|--------------------------------------------------------------------------
| Delete Coupon
|--------------------------------------------------------------------------
*/

export const deleteCoupon = async (
  id
) => {
  const coupon =
    await Coupon.findById(id);

  if (!coupon) {
    throw new Error(
      "Coupon not found."
    );
  }

  await coupon.deleteOne();

  return true;
};

/*
|--------------------------------------------------------------------------
| Toggle Coupon Status
|--------------------------------------------------------------------------
*/

export const toggleCouponStatus =
  async (id) => {
    const coupon =
      await Coupon.findById(id);

    if (!coupon) {
      throw new Error(
        "Coupon not found."
      );
    }

    coupon.active =
      !coupon.active;

    await coupon.save();

    return coupon;
  };

  /*
|--------------------------------------------------------------------------
| Validate Coupon
|--------------------------------------------------------------------------
*/

export const validateCoupon = async ({
  code,
  orderAmount,
}) => {
  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
  });

  if (!coupon) {
    throw new Error("Invalid coupon code.");
  }

  if (!coupon.active) {
    throw new Error("Coupon is inactive.");
  }

  const now = new Date();

  if (coupon.startDate > now) {
    throw new Error(
      "Coupon is not active yet."
    );
  }

  if (coupon.expiryDate < now) {
    throw new Error(
      "Coupon has expired."
    );
  }

  if (
    orderAmount <
    coupon.minimumOrderAmount
  ) {
    throw new Error(
      `Minimum order amount is ₹${coupon.minimumOrderAmount}.`
    );
  }

  if (
    coupon.usageLimit > 0 &&
    coupon.usedCount >= coupon.usageLimit
  ) {
    throw new Error(
      "Coupon usage limit reached."
    );
  }

  let discount = 0;

  if (
    coupon.type === "percentage"
  ) {
    discount =
      (orderAmount * coupon.value) / 100;

    if (
      coupon.maximumDiscount > 0
    ) {
      discount = Math.min(
        discount,
        coupon.maximumDiscount
      );
    }
  } else {
    discount = coupon.value;
  }

  discount = Math.min(
    discount,
    orderAmount
  );

  return {
    coupon,

    discount,

    finalAmount:
      orderAmount - discount,
  };
};