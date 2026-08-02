import mongoose from "mongoose";

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Coupon from "../models/Coupon.js";

import { validateCoupon } from "./couponService.js";

/*
|--------------------------------------------------------------------------
| Create Order
|--------------------------------------------------------------------------
*/

export const createOrder = async (payload) => {
  const session = await mongoose.startSession();

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

    const products = await Product.find({
      _id: {
        $in: productIds,
      },
    }).session(session);

    const productMap = new Map();

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
      const product = productMap.get(
        item.product
      );

      if (!product) {
        throw new Error(
          `Product not found: ${item.product}`
        );
      }

      if (
        product.stock < item.quantity
      ) {
        throw new Error(
          `${product.name} has only ${product.stock} item(s) left`
        );
      }

      subtotal +=
        product.price *
        item.quantity;

      orderItems.push({
        product: product._id,

        name: product.name,

        image: product.image,

        price: product.price,

        quantity: item.quantity,
      });

      bulkOperations.push({
        updateOne: {
          filter: {
            _id: product._id,
          },

          update: {
            $inc: {
              stock: -item.quantity,
            },
          },
        },
      });
    }

    if (couponCode) {
      const result =
        await validateCoupon({
          code: couponCode,
          orderAmount: subtotal,
        });

      discount = result.discount;

      coupon = {
        code: result.coupon.code,

        type: result.coupon.type,

        value: result.coupon.value,
      };
    }

    if (bulkOperations.length) {
      await Product.bulkWrite(
        bulkOperations,
        {
          session,
        }
      );
    }
    if (bulkOperations.length) {
  await Product.bulkWrite(
    bulkOperations,
    {
      session,
    }
  );
}
    const total =
      subtotal +
      shippingCharge +
      tax -
      discount;

    const [order] =
      await Order.create(
        [
          {
            user: user || null,

            items: orderItems,

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

    /*
    |--------------------------------------------------------------------------
    | Increment Coupon Usage
    |--------------------------------------------------------------------------
    */

    if (couponCode) {
      await Coupon.findOneAndUpdate(
        {
          code:
            couponCode.toUpperCase(),
        },
        {
          $inc: {
            usedCount: 1,
          },
        },
        {
          session,
        }
      );
    }

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

export const getOrderById =
  async (id) => {
    return await Order.findById(id)
      .populate(
        "user",
        "name email"
      )
      .populate(
        "items.product"
      );
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

      Order.countDocuments(query),
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

export const updateOrderStatus = async (
  id,
  status
) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found.");
  }

  order.orderStatus = status;

  await order.save();

  return order;
};

/*
|--------------------------------------------------------------------------
| Update Payment Status
|--------------------------------------------------------------------------
*/

export const updatePaymentStatus = async (
  id,
  status
) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found.");
  }

  order.payment.status = status;

  if (status === "Paid") {
    order.payment.paidAt = new Date();

    /*
    |--------------------------------------------------------------------------
    | NOTE
    |--------------------------------------------------------------------------
    | Coupon usage is already incremented during order creation.
    | If you later move coupon consumption to payment confirmation,
    | this is the place to do it.
    */
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
    .populate("items.product")
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
  const order = await Order.findOne({
    _id: id,
    user: userId,
  });

  if (!order) {
    throw new Error("Order not found.");
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

  order.orderStatus = "Cancelled";

  /*
  |--------------------------------------------------------------------------
  | Optional Future Enhancement
  |--------------------------------------------------------------------------
  | Restore stock here if required.
  |
  | Example:
  |
  | for (const item of order.items) {
  |   await Product.findByIdAndUpdate(
  |     item.product,
  |     {
  |       $inc: {
  |         stock: item.quantity,
  |       },
  |     }
  |   );
  | }
  */

  await order.save();

  return order;
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
    await Order.findById(id);

  if (!oldOrder) {
    throw new Error(
      "Order not found."
    );
  }

  const payload = {
    user: userId,

    items: oldOrder.items.map(
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