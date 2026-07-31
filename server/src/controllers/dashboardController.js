import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      products,
      categories,
      orders,
      customers,
      featuredProducts,
      lowStockProducts,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
      User.countDocuments({ role: "user" }),
      Product.countDocuments({ featured: true }),
      Product.countDocuments({ stock: { $lte: 5 } }),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        products,
        categories,
        orders,
        customers,
        featuredProducts,
        lowStockProducts,
      },
    });
  } catch (error) {
    next(error);
  }
};