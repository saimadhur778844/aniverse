import mongoose from "mongoose";

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

import { validateCoupon } from "./couponService.js";

/*
|--------------------------------------------------------------------------
| Create Order
|--------------------------------------------------------------------------
*/

export const createOrder = async (payload) => {
  const session =
    await mongoose.startSession();

  session.startTransaction();

  try {
    const {
      user,
      items,
      shippingAddress,
      couponCode,
      shippingCharge = 0,
      tax = 0,
    } = payload;

    let discount = 0;

    let coupon = null;

    if (!items?.length) {
      throw new Error(
        "Order must contain at least one item."
      );
    }

    const productIds = items.map(
      (item) => item.product
    );

    const products =
      await Product.find({
        _id: {
          $in: productIds,
        },
      }).session(session);

    const productMap =
      new Map();

    products.forEach((product) => {
      productMap.set(
        product._id.toString(),
        product
      );
    });

    const orderItems = [];

    const bulkOperations = [];

    let subtotal = 0;

    for (const item of items) {
      const product =
        productMap.get(
          item.product
        );

      if (!product) {
        throw new Error(
          `Product not found: ${item.product}`
        );
      }

      if (
        product.stock <
        item.quantity
      ) {
        throw new Error(
          `${product.name} has only ${product.stock} item(s) left`
        );
      }

      subtotal +=
        product.price *
        item.quantity;

      orderItems.push({
        product:
          product._id,

        name:
          product.name,

        image:
          product.image,

        price:
          product.price,

        quantity:
          item.quantity,
      });

      bulkOperations.push({
        updateOne: {
          filter: {
            _id: product._id,
          },

          update: {
            $inc: {
              stock:
                -item.quantity,
            },
          },
        },
      });
    }

    if (couponCode) {
      const result =
        await validateCoupon({
          code: couponCode,
          orderAmount:
            subtotal,
        });

      discount =
        result.discount;

      coupon = {
        code:
          result.coupon.code,

        type:
          result.coupon.type,

        value:
          result.coupon.value,
      };
    }

    if (
      bulkOperations.length
    ) {
      await Product.bulkWrite(
        bulkOperations,
        {
          session,
        }
      );
    }

    const total =
      Math.max(
        0,
        subtotal +
          shippingCharge +
          tax -
          discount
      );

    const [order] =
      await Order.create(
        [
          {
            user,

            items:
              orderItems,

            shippingAddress,

            subtotal,

            shippingCharge,

            tax,

            discount,

            coupon,

            total,
          },
        ],
        {
          session,
        }
      );

    await session.commitTransaction();

    return order;
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    session.endSession();
  }
};
/*
|--------------------------------------------------------------------------
| Get Order By ID
|--------------------------------------------------------------------------
*/

export const getOrderById = async (
  id,
  user
) => {
  const order = await Order.findById(id)
    .populate(
      "user",
      "name email role"
    )
    .populate("items.product");

  if (!order) {
    throw new Error(
      "Order not found."
    );
  }

  if (
    user.role !== "admin" &&
    order.user &&
    order.user._id.toString() !==
      user._id.toString()
  ) {
    throw new Error(
      "Unauthorized access."
    );
  }

  return order;
};

/*
|--------------------------------------------------------------------------
| Get Orders
|--------------------------------------------------------------------------
*/

export const getOrders = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
  paymentStatus,
}) => {
  const query = {};

  if (status) {
    query.orderStatus = status;
  }

  if (paymentStatus) {
    query["payment.status"] =
      paymentStatus;
  }

  if (search) {
    const users =
      await User.find({
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            email: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      }).select("_id");

    query.$or = [
      {
        orderNumber: {
          $regex: search,
          $options: "i",
        },
      },
      {
        user: {
          $in: users.map(
            (u) => u._id
          ),
        },
      },
    ];
  }

  const skip =
    (page - 1) * limit;

  const [orders, total] =
    await Promise.all([
      Order.find(query)
        .populate(
          "user",
          "name email"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit),

      Order.countDocuments(
        query
      ),
    ]);

  return {
    orders,
    total,
    page,
    pages: Math.ceil(
      total / limit
    ),
  };
};

/*
|--------------------------------------------------------------------------
| Update Order Status
|--------------------------------------------------------------------------
*/

export const updateOrderStatus =
  async (id, status) => {
    const order =
      await Order.findById(id);

    if (!order) {
      throw new Error(
        "Order not found."
      );
    }

    const transitions = {
      Pending: [
        "Confirmed",
        "Cancelled",
      ],

      Confirmed: [
        "Packed",
        "Cancelled",
      ],

      Packed: [
        "Shipped",
      ],

      Shipped: [
        "Delivered",
      ],

      Delivered: [],

      Cancelled: [],
    };

    const allowed =
      transitions[
        order.orderStatus
      ] ?? [];

    if (
      !allowed.includes(status)
    ) {
      throw new Error(
        `Cannot change status from ${order.orderStatus} to ${status}.`
      );
    }

    if (
      status ===
        "Shipped" &&
      order.payment.status !==
        "Paid"
    ) {
      throw new Error(
        "Cannot ship an unpaid order."
      );
    }

    order.orderStatus =
      status;

    await order.save();

    return order;
  };

/*
|--------------------------------------------------------------------------
| Update Payment Status
|--------------------------------------------------------------------------
*/

export const updatePaymentStatus =
  async (id, status) => {
    const order =
      await Order.findById(id);

    if (!order) {
      throw new Error(
        "Order not found."
      );
    }

    order.payment.status =
      status;

    if (
      status === "Paid"
    ) {
      order.payment.paidAt =
        new Date();
    }

    await order.save();

    return order;
  };
  /*
|--------------------------------------------------------------------------
| Get My Orders
|--------------------------------------------------------------------------
*/

export const getMyOrders = async (
  userId
) => {
  return await Order.find({
    user: userId,
  })
    .populate(
      "items.product"
    )
    .sort({
      createdAt: -1,
    });
};

/*
|--------------------------------------------------------------------------
| Cancel Order
|--------------------------------------------------------------------------
*/

export const cancelOrder = async (
  id,
  userId
) => {
  const session =
    await mongoose.startSession();

  session.startTransaction();

  try {
    const order =
      await Order.findOne({
        _id: id,
        user: userId,
      }).session(session);

    if (!order) {
      throw new Error(
        "Order not found."
      );
    }

    if (
      order.orderStatus ===
        "Delivered" ||
      order.orderStatus ===
        "Cancelled"
    ) {
      throw new Error(
        "Order cannot be cancelled."
      );
    }

    order.orderStatus =
      "Cancelled";

    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock:
              item.quantity,
          },
        },
        {
          session,
        }
      );
    }

    await order.save({
      session,
    });

    await session.commitTransaction();

    return order;
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    session.endSession();
  }
};

/*
|--------------------------------------------------------------------------
| Reorder
|--------------------------------------------------------------------------
*/

export const reorder = async (
  id,
  userId
) => {
  const oldOrder =
    await Order.findOne({
      _id: id,
      user: userId,
    });

  if (!oldOrder) {
    throw new Error(
      "Order not found."
    );
  }

  const payload = {
    user: userId,

    items:
      oldOrder.items.map(
        (item) => ({
          product:
            item.product.toString(),
          quantity:
            item.quantity,
        })
      ),

    shippingAddress:
      oldOrder.shippingAddress,

    shippingCharge:
      oldOrder.shippingCharge,

    tax: oldOrder.tax,

    /*
    |--------------------------------------------------------------------------
    | Do NOT reuse coupons automatically
    |--------------------------------------------------------------------------
    */

    couponCode: undefined,
  };

  return await createOrder(
    payload
  );
};
/*
|--------------------------------------------------------------------------
| Get Reviewable Order
|--------------------------------------------------------------------------
*/

export const getReviewableOrder = async (
  userId,
  productId
) => {
  const order = await Order.findOne({
    user: userId,

    orderStatus: "Delivered",

    "items.product": productId,
  })
    .sort({
      createdAt: -1,
    })
    .select("_id");

  return order;
};