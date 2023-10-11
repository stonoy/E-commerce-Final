import mongoose from "mongoose";

const ReviewSchema = await mongoose.Schema(
  {
    rating: { type: Number },
    title: { type: String },
    comment: { type: String },
    report: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
    reportCount: { type: Number, default: 0 },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.statics.reviewStats = async function (productId) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: null,
        avgRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);
  console.log(result);
  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        numOfReviews: result[0]?.numOfReviews || 0,
        avgRating: Math.ceil(result[0]?.avgRating) || 0,
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", async function () {
  console.log("post save");
  this.constructor.reviewStats(this.product);
});

ReviewSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    console.log("post deleteOne");
    this.constructor.reviewStats(this.product);
  }
);

export default mongoose.model("Review", ReviewSchema);
