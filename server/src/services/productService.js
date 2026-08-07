import mongoose from "mongoose";
import slugify from "slugify";

import Product from "../models/Product.js";
import Category from "../models/Category.js";

class ProductService {
  async getProducts(query) {
    const {
      search,
      category,
      featured,
      sort = "newest",
      page = 1,
      limit = 12,
    } = query;

    const filter = {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          anime: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category) {
      if (
        mongoose.Types.ObjectId.isValid(
          category
        )
      ) {
        filter.category = category;
      } else {
        const categoryDoc =
          await Category.findOne({
            slug: category,
          });

        if (!categoryDoc) {
          return {
            products: [],
            total: 0,
            page: Number(page),
            pages: 0,
          };
        }

        filter.category =
          categoryDoc._id;
      }
    }

// Category Filter
if (category) {
  // Existing category logic...
}

// Anime Filter
if (anime) {
  filter.anime = {
    $regex: anime,
    $options: "i",
  };
}

// Status Filter
if (status) {
  filter.status = status;
}

// Featured Filter
if (featured === "true") {
  filter.featured = true;
} else if (featured === "false") {
  filter.featured = false;
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

    const total =
      await Product.countDocuments(
        filter
      );

    const products =
      await Product.find(filter)
        .populate("category")
        .sort(sortOption)
        .skip(
          (Number(page) - 1) *
            Number(limit)
        )
        .limit(Number(limit));

    return {
      products,
      total,
      page: Number(page),
      pages: Math.ceil(
        total / Number(limit)
      ),
    };
  }

  async getProductBySlug(slug) {
    return Product.findOne({
      slug,
    }).populate("category");
  }

  async getProductById(id) {
    return Product.findById(
      id
    ).populate("category");
  }

  async create(data) {
    const category =
      await Category.findById(
        data.category
      );

    if (!category) {
      throw new Error(
        "Category not found."
      );
    }

    return Product.create({
      ...data,
      slug: slugify(data.name, {
        lower: true,
        strict: true,
      }),
    });
  }

  async update(id, data) {
    if (data.category) {
      const category =
        await Category.findById(
          data.category
        );

      if (!category) {
        throw new Error(
          "Category not found."
        );
      }
    }

    if (data.name) {
      data.slug = slugify(
        data.name,
        {
          lower: true,
          strict: true,
        }
      );
    }

    return Product.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async delete(id) {
    const product =
      await Product.findById(id);

    if (!product) {
      throw new Error(
        "Product not found."
      );
    }

    await product.deleteOne();

    return true;
  }
}

export default new ProductService();