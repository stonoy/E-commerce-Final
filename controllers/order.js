import Order from "../models/order.js";
import Product from "../models/product.js";
import createCustomApiError from "../errors/customApiError.js";
import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart.js";
import Stripe from "stripe";
import { nanoid } from "nanoid";
import day from "dayjs";
import checkPermission from "../utils/checkParmission.js";
const stripe = new Stripe(
  "sk_test_51NmHhXSDdSE6tXo78kWPg1ef6Z7BXdHJT3qn2UiiBglotfJj1f0o0dyNJdUAkrkfwr2CPcDaictYIGwI5QiQ9Xkq008QD5cxLS"
);

const getAllOrders = async (req, res, next) => {
  console.log(req.query);

  const { status } = req.query;
  let queryObject = {};

  if (status && status !== "all") {
    queryObject.status = status;
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 2;
  const skip = (page - 1) * limit;

  const orders = await Order.find(queryObject).limit(limit).skip(skip);

  const numOfOrders = await Order.countDocuments(queryObject);

  const numOfPages = Math.ceil(numOfOrders / limit);

  res.status(200).json({ orders, numOfPages, page });
};

const createOrder = async (req, res, next) => {
  let cartItems = await Cart.find({ user: req.user.userId }).populate(
    "product"
  );

  const line_items = cartItems.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product.name,
        },
        unit_amount: item.product.price * 100 * (120 / 100),
      },
      quantity: item.amount,
    };
  });

  line_items.push({
    price_data: {
      currency: "inr",
      product_data: {
        name: "Shipping",
      },
      unit_amount: 500 * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    success_url: "https://stonoy-ecommerce.onrender.com/cart?success=true",
    cancel_url: "https://stonoy-ecommerce.onrender.com/cart?success=false",
    line_items: line_items,
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
  });

  let orderItems = [];
  let subTotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product._id });
    if (!dbProduct) {
      return next(
        createCustomApiError(
          `No product with ${item.product._id}`,
          StatusCodes.BAD_REQUEST
        )
      );
    }

    const { name, image, price, _id } = dbProduct;
    const SingleProductSchema = {
      name,
      price,
      amount: item.amount,
      product: _id,
      image,
    };

    orderItems = [...orderItems, SingleProductSchema];
    subTotal += price * item.amount;
  }

  const tax = subTotal * (20 / 100);
  const shippingFee = 500;
  const total = subTotal + tax + shippingFee;

  await Order.create({
    tax,
    shippingFee,
    subTotal,
    total,
    orderItems,
    user: req.user.userId,
    transactionId: session.id,
  });

  res.status(200).json({ url: session.url });
};

const singleOrder = async (req, res, next) => {
  const { id: orderId } = req.params;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    return next(
      createCustomApiError(
        `No cartItem with id:${orderId}`,
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const hasPermission = checkPermission(req.user, order.user);
  if (!hasPermission) {
    return next(
      createCustomApiError("Not authorized", StatusCodes.UNAUTHORIZED)
    );
  }

  res.status(200).json({ order });
};

const updateOrder = async (req, res, next) => {
  const { status, address } = req.body;
  const { id: orderId } = req.params;

  if (!status) {
    return next(
      createCustomApiError("send required details", StatusCodes.BAD_REQUEST)
    );
  }

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    return next(
      createCustomApiError(`Not valid Id: ${orderId}`, StatusCodes.BAD_REQUEST)
    );
  }

  order.status = status;
  order.address = address;

  await order.save();

  res.status(200).json({ msg: "Order Updated!" });
};

const getCurrentUserOrder = async (req, res, next) => {
  const { status } = req.query;
  let queryObject = { user: req.user.userId };

  if (status && status !== "all") {
    queryObject.status = status;
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 1;
  const skip = (page - 1) * limit;

  const orders = await Order.find(queryObject).limit(limit).skip(skip);

  const numOfOrders = await Order.countDocuments(queryObject);

  const numOfPages = Math.ceil(numOfOrders / limit);

  res.status(200).json({ orders, numOfPages, page });
};

const orderStat = async(req,res,next) => {
  let monthlyOrders = await Order.aggregate([
    { $match: { status: {
      $in: ['paid', 'delivered']
  } } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
        income: {$sum: '$subTotal'}
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 5 },
  ]);

  

  monthlyOrders = monthlyOrders.map((data) => {
    const {
      _id: { year, month },
      count,
      income
    } = data;

    const date = day()
      .month(month - 1)
      .year(year)
      .format("MMM YY");
    return { date, count, income };
  });

  // console.log(monthlyOrders)

  res.status(200).json({monthlyOrders})
}



export {
  getAllOrders,
  createOrder,
  singleOrder,
  updateOrder,
  getCurrentUserOrder,
  orderStat
};

// EXTRA CODE OF CREATE ORDER

// const { items: cartItems } = req.body;

// if (!cartItems || cartItems.length < 1) {
//   return next(
//     createCustomApiError("No product send", StatusCodes.BAD_REQUEST)
//   );
// }

// let orderItems = [];
// let subTotal = 0;

// for (const item of cartItems) {
//   const dbProduct = await Product.findOne({ _id: item.product });
//   if (!dbProduct) {
//     return next(
//       createCustomApiError(
//         `No product with ${item.product}`,
//         StatusCodes.BAD_REQUEST
//       )
//     );
//   }

//   const { name, image, price, _id } = dbProduct;
//   const SingleProductSchema = {
//     name,
//     price,
//     amount: item.amount,
//     product: _id,
//   };

//   orderItems = [...orderItems, SingleProductSchema];
//   subTotal += price * item.amount;
// }

// const tax = subTotal * (20 / 100);
// const shippingFee = 80;
// const total = subTotal + tax + shippingFee;

// console.log(orderItems, subTotal, tax, shippingFee, total);

// res.send("createOrder");

// OLD STRIPE CODES

// const customer = await stripe.customers.create({
//   email: token.email,
//   source: token.id
// })

// const payment = await stripe.paymentIntents.create({
//   amount: total*100,
//   currency: 'inr',
//   customer: customer.id,
//   payment_method: token.card.id,
// })
