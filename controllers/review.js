import { StatusCodes } from "http-status-codes";
import Review from "../models/review.js";
import checkPermission from "../utils/checkParmission.js";
import createCustomApiError from "../errors/customApiError.js";

const getAllReviews = async (req, res, next) => {
  const reviews = await Review.find({});
  res.status(200).json({ reviews, count: reviews.length });
};

const createReview = async (req, res, next) => {
  req.body.user = req.user.userId;
  const { user, product, comment, title, rating } = req.body;

  const userAlreadyReviewdTheProduct = await Review.findOne({ user, product });
  if (userAlreadyReviewdTheProduct) {
    userAlreadyReviewdTheProduct.comment = comment;
    userAlreadyReviewdTheProduct.title = title;
    userAlreadyReviewdTheProduct.rating = rating;

    await userAlreadyReviewdTheProduct.save();
  } else {
    await Review.create(req.body);
  }

  res.status(StatusCodes.CREATED).json({ msg: "review done" });
};

const getSingleReview = async (req, res, next) => {
  const review = await Review.findOne({ _id: req.params.id });
  res.status(200).json({ review });
};

const updateReview = async (req, res, next) => {
  const review = await Review.findOne({ _id: req.params.id });
  if (!review) {
    return next(
      createCustomApiError(
        `No review with id:${req.params.id}`,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const hasPermission = checkPermission(req.user, review.user);
  // console.log(hasPermission);

  if (!hasPermission) {
    return next(
      createCustomApiError(
        "Not authorized to update the review",
        StatusCodes.FORBIDDEN
      )
    );
  }

  const { comment, title, rating } = req.body;

  if (!comment && !title && !rating) {
    return next(
      createCustomApiError(
        "provide atleast a review property",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  review.comment = comment;
  review.title = title;
  review.rating = rating;

  await review.save();

  res.status(200).json({ review });
};

const deleteReview = async (req, res, next) => {
  const review = await Review.findOne({ _id: req.params.id });
  if (!review) {
    return next(
      createCustomApiError(
        `No review with id:${req.params.id}`,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const hasPermission = checkPermission(req.user, review.user);
  // console.log(hasPermission);

  if (!hasPermission) {
    return next(createCustomApiError(review.product, StatusCodes.FORBIDDEN));
  }
  const deletedReview = await review.deleteOne();

  res
    .status(200)
    .json({ msg: "review deleted", productId: deletedReview.product });
};

const reportReview = async (req, res, next) => {
  const {
    body: { reviewId },
    user: { userId },
  } = req;

  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    return next(
      createCustomApiError(
        `No review with id:${reviewId}`,
        StatusCodes.BAD_REQUEST
      )
    );
  }

  let reportList = [...review.report];
  reportList = reportList.map((item) => item.toString());

  if (!reportList.includes(userId)) {
    reportList.push(userId);
    await Review.findOneAndUpdate(
      { _id: reviewId },
      { report: reportList, reportCount: reportList.length }
    );
  }

  // console.log(userId);
  // console.log(reportList);

  res.status(200).json({ msg: "ok" });
};

const getAllReportedReview = async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 2;
  const skip = (page - 1) * limit;

  const reportedReviews = await Review.find({ reportCount: { $gt: 0 } })
    .sort("-reportCount")
    .populate({ path: "user", select: "name" })
    .limit(limit)
    .skip(skip);

  const numOfReviews = await Review.countDocuments({ reportCount: { $gt: 0 } });

  const numOfPages = Math.ceil(numOfReviews / limit);

  res.status(200).json({ reportedReviews, numOfPages, page });
};

export {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  reportReview,
  getAllReportedReview,
};
