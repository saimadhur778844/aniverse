import User from "../models/User.js";
import Order from "../models/Order.js";

/*
|--------------------------------------------------------------------------
| Get Customers
|--------------------------------------------------------------------------
*/

export const getCustomers = async ({
  page = 1,
  limit = 10,
  search = "",
}) => {
  const query = {
    role: "user",
  };

  if (search) {
    query.$or = [
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
    ];
  }

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    User.countDocuments(query),
  ]);

  const customers = await Promise.all(
    users.map(async (user) => {
      const orders = await Order.find({
        user: user._id,
      }).sort({
        createdAt: -1,
      });

      const orderCount = orders.length;

      const totalSpent = orders.reduce(
        (sum, order) => sum + order.total,
        0
      );

      const averageOrderValue =
        orderCount > 0
          ? totalSpent / orderCount
          : 0;

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        orders: orderCount,
        spent: totalSpent,
        averageOrderValue,
        lastOrder:
          orders.length > 0
            ? orders[0]
            : null,
      };
    })
  );

  return {
    customers,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

/*
|--------------------------------------------------------------------------
| Get Customer By ID
|--------------------------------------------------------------------------
*/

export const getCustomerById = async (
  id
) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error(
      "Customer not found."
    );
  }

  const orders = await Order.find({
    user: id,
  }).sort({
    createdAt: -1,
  });

  const spent = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const averageOrderValue =
    orders.length > 0
      ? spent / orders.length
      : 0;

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    orders,
    spent,
    averageOrderValue,
  };
};