import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc    Create Order
// @route   POST /api/orders
// @access  Public (for now)
const createOrder = async (req, res) => {
  try {
    const {
      user,
      items,
      shippingAddress,
      shippingCharge = 0,
      tax = 0,
      discount = 0,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item.",
      });
    }

    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      });

      subtotal += product.price * item.quantity;
    }

    const total = subtotal + shippingCharge + tax - discount;

    const order = await Order.create({
      user: user || null,
      items: orderItems,
      shippingAddress,
      subtotal,
      shippingCharge,
      tax,
      discount,
      total,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order.",
      error: error.message,
    });
  }
};

// @desc    Get Order By ID
// @route   GET /api/orders/:id
// @access  Public (for now)
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order.",
      error: error.message,
    });
  }
};

export {
  createOrder,
  getOrderById,
};