import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const getDashboardStats = async () => {
  const [
    products,
    categories,
    customers,
    featuredProducts,
    lowStockProducts,
    orders,
    revenueResult,
    recentOrders,
    lowStockItems,
    orderStatus,
    monthlySales,
  ] = await Promise.all([
    Product.countDocuments(),

    Category.countDocuments(),

    User.countDocuments({ role: "user" }),

    Product.countDocuments({ featured: true }),

    Product.countDocuments({
      stock: { $lte: 5 },
    }),

    Order.countDocuments(),

    Order.aggregate([
      {
        $match: {
          "payment.status": "Paid",
        },
      },
      {
        $group: {
          _id: null,
          revenue: {
            $sum: "$total",
          },
        },
      },
    ]),

    Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email")
      .select(
        "total orderStatus payment createdAt user shippingAddress"
      ),

    Product.find({
      stock: { $lte: 5 },
    })
      .sort({ stock: 1 })
      .limit(5)
      .select("name stock images"),

    Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: {
            $sum: 1,
          },
        },
      },
    ]),

    Order.aggregate([
      {
        $match: {
          "payment.status": "Paid",
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          revenue: {
            $sum: "$total",
          },
          orders: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]),
  ]);

  const topProducts = await Order.aggregate([
    {
      $match: {
        orderStatus: "Delivered",
        "payment.status": "Paid",
      },
    },
    {
      $unwind: "$items",
    },
    {
      $group: {
        _id: "$items.product",
        sold: {
          $sum: "$items.quantity",
        },
      },
    },
    {
      $sort: {
        sold: -1,
      },
    },
    {
      $limit: 5,
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $project: {
        _id: "$product._id",
        name: "$product.name",
        stock: "$product.stock",
        images: "$product.images",
        sold: 1,
      },
    },
  ]);

  return {
    products,
    categories,
    customers,
    orders,
    featuredProducts,
    lowStockProducts,

    revenue:
      revenueResult.length > 0
        ? revenueResult[0].revenue
        : 0,

    recentOrders,

    lowStockItems,

    topProducts,

    orderStatus,

    monthlySales,
  };
};