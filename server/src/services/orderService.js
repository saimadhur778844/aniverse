import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const createOrder = async (payload) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const {
      user,
      items,
      shippingAddress,
      shippingCharge = 0,
      tax = 0,
      discount = 0,
    } = payload;

    if (!items?.length) {
      throw new Error("Order must contain at least one item.");
    }

    const productIds = items.map((i) => i.product);

    const products = await Product.find({
      _id: { $in: productIds },
    }).session(session);

    const productMap = new Map();

    products.forEach((product) => {
      productMap.set(product._id.toString(), product);
    });

    const orderItems = [];
    const bulkOperations = [];

    let subtotal = 0;

    for (const item of items) {
      const product = productMap.get(item.product);

      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `${product.name} has only ${product.stock} item(s) left`
        );
      }

      subtotal += product.price * item.quantity;

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

    if (bulkOperations.length) {
      await Product.bulkWrite(bulkOperations, {
        session,
      });
    }

    const total =
      subtotal +
      shippingCharge +
      tax -
      discount;

    const [order] = await Order.create(
      [
        {
          user: user || null,
          items: orderItems,
          shippingAddress,
          subtotal,
          shippingCharge,
          tax,
          discount,
          total,
        },
      ],
      { session }
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

export const getOrderById = async (id) => {
  return await Order.findById(id)
    .populate("user", "name email")
    .populate("items.product");
};

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
    query["payment.status"] = paymentStatus;
  }

  if (search) {
    const users = await User.find({
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
          $in: users.map((u) => u._id),
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    Order.find(query)
      .populate("user", "name email")
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
    pages: Math.ceil(total / limit),
  };
};

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
  }

  await order.save();

  return order;
};

export const getMyOrders = async (userId) => {
  return await Order.find({ user: userId })
    .populate("items.product")
    .sort({ createdAt: -1 });
};

export const cancelOrder = async (id, userId) => {
  const order = await Order.findOne({
    _id: id,
    user: userId,
  });

  if (!order) {
    throw new Error("Order not found.");
  }

  if (
    order.orderStatus === "Delivered" ||
    order.orderStatus === "Cancelled"
  ) {
    throw new Error("Order cannot be cancelled.");
  }

  order.orderStatus = "Cancelled";

  await order.save();

  return order;
};

export const reorder = async (id, userId) => {
  const oldOrder = await Order.findById(id);

  if (!oldOrder) {
    throw new Error("Order not found.");
  }

  const payload = {
    user: userId,
    items: oldOrder.items.map((item) => ({
      product: item.product.toString(),
      quantity: item.quantity,
    })),
    shippingAddress: oldOrder.shippingAddress,
    shippingCharge: oldOrder.shippingCharge,
    tax: oldOrder.tax,
    discount: oldOrder.discount,
  };

  return await createOrder(payload);
};