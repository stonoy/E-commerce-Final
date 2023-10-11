import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "pls provide a product name"],
      default: " Unnamed Product",
    },
    price: {
      type: Number,
      required: [true, "pls provide a product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "pls provide a product description"],
      default: " Unnamed Product",
    },
    image: {
      type: String,
    },
    imagePublicId: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "pls provide a product category"],
      default: " general",
    },
    company: {
      type: String,
      required: [true, "pls provide a company name"],
      default: " e-commerce",
    },
    colors: {
      type: [String],

      default: ["@222"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,

      default: 12,
    },
    avgRating: {
      type: Number,

      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

ProductSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await this.model("Review").deleteMany({ product: this._id });
  }
);

export default mongoose.model("Product", ProductSchema);
