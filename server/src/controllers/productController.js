import Product from "../models/Product.js";

// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({
//       createdAt: -1,
//     });

//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// };
export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      featured,
      sort = "newest",
      page = 1,
      limit = 12,
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { anime: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (featured === "true") {
      filter.featured = true;
    }

    let sortOption = {};

    switch (sort) {
      case "price-asc":
        sortOption.price = 1;
        break;

      case "price-desc":
        sortOption.price = -1;
        break;

      case "rating":
        sortOption.rating = -1;
        break;

      default:
        sortOption.createdAt = -1;
    }

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};