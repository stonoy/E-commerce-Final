import express from "express";
const router = express.Router();

import {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  reportReview,
  getAllReportedReview,
} from "../controllers/review.js";
import {
  authentication,
  authorization,
} from "../middlewares/authentication.js";

router.route("/").get(getAllReviews).post(authentication, createReview);
router.route("/reportreview").patch(authentication, reportReview);
router
  .route("/getallreportedreview")
  .get(authentication, authorization("admin"), getAllReportedReview);

router
  .route("/:id")
  .get(getSingleReview)
  .patch(authentication, updateReview)
  .delete(authentication, deleteReview);

export default router;
