import express from "express";
const router = express.Router();

import {
  getAllOrders,
  createOrder,
  singleOrder,
  updateOrder,
  getCurrentUserOrder,
} from "../controllers/order.js";

import { authorization } from "../middlewares/authentication.js";

router.route("/").get(authorization("admin"), getAllOrders).post(createOrder);

router.route("/showmyorders").get(getCurrentUserOrder);

router.route("/:id").get(singleOrder).patch(authorization("admin"),updateOrder);

export default router;
