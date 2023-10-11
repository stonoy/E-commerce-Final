import "express-async-errors";
import express from "express";
import {} from "dotenv/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import productRouter from "./routes/product.js";
import reviewRouter from "./routes/review.js";
import orderRouter from "./routes/order.js";
import cartRouter from "./routes/cart.js";

import cloudinary from "cloudinary";
import Not_Found from "./middlewares/Not_Found.js";
import Error_handler from "./middlewares/Error_handler.js";
import mongoose from "mongoose";
import { authentication, authorization } from "./middlewares/authentication.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// MIDDLEWARES

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "./client/dist"))); // PROVIDING FRONTEND APP

// ROUTES

// app.get("/", (req, res) => {
//   res.send("Welcome");
// });

// API

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authentication, userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/order", authentication, orderRouter);
app.use("/api/v1/cart", authentication, cartRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html")); // SERVER GIVEING FRONTEND APP TO USERS
});

app.use(Not_Found);
app.use(Error_handler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
