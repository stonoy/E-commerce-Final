import express from "express";
const router = express.Router();

import {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";
import {
  authentication,
  authorization,
} from "../middlewares/authentication.js";
import upload from "../middlewares/multer.js";

router
  .route("/")
  .get(getAllProducts)
  .post(
    authentication,
    authorization("admin"),
    upload.single("image"),
    createProduct
  );
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authentication, authorization("admin"), updateProduct)
  .delete(authentication, authorization("admin"), deleteProduct);

export default router;
