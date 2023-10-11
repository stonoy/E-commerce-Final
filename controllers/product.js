import Product from "../models/product.js";
import Review from "../models/review.js";
import createCustomApiError from "../errors/customApiError.js";
import { StatusCodes } from "http-status-codes";
import { formatFile } from "../middlewares/multer.js";
import cloudinary from "cloudinary";

const getAllProducts = async (req, res, next) => {
  const { featured, name, order, price, freeShipping, category, company } =
    req.query;

  let queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true";
  }

  if (price) {
    queryObject.price = { $lt: price };
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (freeShipping) {
    queryObject.freeShipping = freeShipping;
  }

  if (category) {
    queryObject.category = { $regex: category, $options: "i" };
  }

  if (company) {
    queryObject.company = { $regex: company, $options: "i" };
  }

  const sortOptions = {
    "a-z": "name",
    "z-a": "-name",
    high: "-price",
    low: "price",
  };

  const sortType = sortOptions[order] || sortOptions["a-z"];

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const skip = (page - 1) * limit;

  const products = await Product.find(queryObject)
    .sort(sortType)
    .limit(limit)
    .skip(skip);

  const numOfProducts = await Product.countDocuments(queryObject);

  const numOfPages = Math.ceil(numOfProducts / limit);

  res.status(200).json({ products, count: numOfProducts, numOfPages, page });
};

const createProduct = async (req, res, next) => {
  let productBody = { ...req.body };

  productBody.featured = req.body.featured === "true";
  productBody.freeShipping = req.body.freeShipping === "true";
  // const { name, price, description, category, company } = req.body;
  // if (!name || !price || !description || !category || !company) {
  //   return next(
  //     createCustomApiError("provide required details", StatusCodes.BAD_REQUEST)
  //   );
  // }
  if (req.file) {
    const file = formatFile(req.file);

    const response = await cloudinary.v2.uploader.upload(file);

    productBody.image = response.secure_url;
    productBody.imagePublicId = response.public_id;
  }

  const product = await Product.create(productBody);
  res.status(StatusCodes.CREATED).json({ msg: "product created!", product });
};

const getSingleProduct = async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    return next(
      createCustomApiError(
        `No product with id:${req.params.id}`,
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const reviewsOfTheProduct = await Review.find({
    product: req.params.id,
  }).populate({ path: "user", select: "name" });

  // TO TAKE THE EXTRA TIME FOR REVIEW PIPELINE TO FINISH OTHERWISE IT WILL GIVE OLD VALUES

  const productAfterReviewPipeline = await Product.findOne({
    _id: req.params.id,
  });

  res.status(200).json({
    product: productAfterReviewPipeline,
    reviews: reviewsOfTheProduct,
    reviewsCount: reviewsOfTheProduct.length,
  });
};

const updateProduct = async (req, res, next) => {
  const { name, price, description, category, company } = req.body;
  if (!name || !price || !description || !category || !company) {
    return next(
      createCustomApiError("provide required details", StatusCodes.BAD_REQUEST)
    );
  }

  let productBody = { ...req.body };

  productBody.featured = req.body.featured === "true";
  productBody.freeShipping = req.body.freeShipping === "true";

  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    productBody,
    { new: true, runValidators: true }
  );

  // const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    return next(
      createCustomApiError(
        `No product with id:${req.params.id}`,
        StatusCodes.BAD_REQUEST
      )
    );
  }

  // if (product.colors.includes("#a1a1a1")) {
  //   product.colors.push("#000");
  //   console.log("ok");
  // }
  // await product.save();

  console.log(product);

  res.status(200).json({ msg: "product updated", product });
};

const deleteProduct = async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    return next(
      createCustomApiError(
        `No product with id:${req.params.id}`,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  await product.deleteOne();
  res.status(200).json({ msg: "product deleted" });
};

export {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
