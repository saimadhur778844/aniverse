import mongoose from "mongoose";

const stockHistorySchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "PURCHASE",
        "ORDER",
        "RETURN",
        "MANUAL",
        "RESTOCK",
      ],
      required: true,
    },

    reason: {
      type: String,
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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

    // =====================
    // Inventory
    // =====================

    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    barcode: {
      type: String,
      default: "",
    },

    supplier: {
      type: String,
      default: "",
    },

    warehouse: {
      type: String,
      default: "Main Warehouse",
    },

    purchasePrice: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    reservedStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    incomingStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    minimumStock: {
      type: Number,
      default: 5,
    },

    stockHistory: {
      type: [stockHistorySchema],
      default: [],
    },

    // =====================
    // Store
    // =====================

    rating: {
      type: Number,
      default: 5,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    averageRating: {
  type: Number,
  default: 0,
},

reviewCount: {
  type: Number,
  default: 0,
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

/*
|--------------------------------------------------------------------------
| Virtuals
|--------------------------------------------------------------------------
*/

productSchema.virtual("profit").get(function () {
  return this.price - this.purchasePrice;
});

productSchema.virtual("availableStock").get(function () {
  return this.stock - this.reservedStock;
});

productSchema.set("toJSON", {
  virtuals: true,
});

productSchema.set("toObject", {
  virtuals: true,
});

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

// productSchema.index({ sku: 1 });

productSchema.index({ anime: 1 });

productSchema.index({ category: 1 });

productSchema.index({ featured: 1 });

productSchema.index({ stock: 1 });


export default mongoose.model("Product", productSchema);