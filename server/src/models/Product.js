import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    anime: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Figures",
        "Collectibles",
        "Keychains",
        "Posters",
        "Katanas",
        "Diecast",
        "Accessories",
      ],
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 5,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);