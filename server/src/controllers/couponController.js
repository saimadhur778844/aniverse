import {
  createCoupon as createCouponService,
  getCoupons as getCouponsService,
  getCouponById as getCouponByIdService,
  updateCoupon as updateCouponService,
  deleteCoupon as deleteCouponService,
  toggleCouponStatus as toggleCouponStatusService,
} from "../services/couponService.js";
import {
  validateCoupon as validateCouponService,
} from "../services/couponService.js";

/*
|--------------------------------------------------------------------------
| Create Coupon
|--------------------------------------------------------------------------
*/

export const createCoupon = async (
  req,
  res,
  next
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is required.",
      });
    }

    const coupon = await createCouponService(req.body);

    res.status(201).json({
      success: true,
      message: "Coupon created successfully.",
      coupon,
    });
  } catch (error) {
    console.error("Create Coupon Error:", error);
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Coupons
|--------------------------------------------------------------------------
*/

export const getCoupons = async (
  req,
  res,
  next
) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
    } = req.query;

    const result = await getCouponsService({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Get Coupons Error:", error);
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Coupon By ID
|--------------------------------------------------------------------------
*/

export const getCouponById = async (
  req,
  res,
  next
) => {
  try {
    const coupon = await getCouponByIdService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      coupon,
    });
  } catch (error) {
    console.error("Get Coupon Error:", error);
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Coupon
|--------------------------------------------------------------------------
*/

export const updateCoupon = async (
  req,
  res,
  next
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body is required.",
      });
    }

    const coupon = await updateCouponService(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Coupon updated successfully.",
      coupon,
    });
  } catch (error) {
    console.error("Update Coupon Error:", error);
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Coupon
|--------------------------------------------------------------------------
*/

export const deleteCoupon = async (
  req,
  res,
  next
) => {
  try {
    await deleteCouponService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Coupon Error:", error);
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Coupon Status
|--------------------------------------------------------------------------
*/

export const toggleCouponStatus = async (
  req,
  res,
  next
) => {
  try {
    const coupon = await toggleCouponStatusService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Coupon status updated successfully.",
      coupon,
    });
  } catch (error) {
    console.error("Toggle Coupon Error:", error);
    next(error);
  }
};
/*
|--------------------------------------------------------------------------
| Validate Coupon
|--------------------------------------------------------------------------
*/

export const validateCoupon =
  async (req, res, next) => {
    try {
      const result =
        await validateCouponService(
          req.body
        );

      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };