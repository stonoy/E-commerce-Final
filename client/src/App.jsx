import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayOut,
  ErrorPage,
  Landing,
  Products,
  Cart,
  About,
  Login,
  Register,
  Admin,
  SingleProduct,
  UserOrders,
  SingleOrder,
  AdminProduct,
  AdminOrders,
  AdminSingleOrder,
  AdminEditProduct,
  AdminReport,
} from "./pages";
import { ErrorElement } from "./components";

import { action as adminProductAction } from "./pages/AdminProduct";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as singleProductAction } from "./pages/SingleProduct";
import { action as deleteReview } from "./pages/DeleteReview";
import { action as adminSingleOrderUpdate } from "./pages/AdminSingleOrder";
import { action as adminProductUpdate } from "./pages/AdminEditProduct";

import { loader as homeLoader } from "./pages/HomeLayOut";
import { loader as adminLoader } from "./pages/Admin";
import { loader as landingLoader } from "./pages/Landing";
import { loader as productLoader } from "./pages/Products";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as cartLoader } from "./pages/Cart";
import { loader as orderLoader } from "./pages/UserOrders";
import { loader as singleOrderLoader } from "./pages/SingleOrder";
import { loader as adminOrders } from "./pages/AdminOrders";
import { loader as adminSingleOrder } from "./pages/AdminSingleOrder";
import { loader as adminAllProduct } from "./pages/AdminProduct";
import { loader as adminSingleProduct } from "./pages/AdminEditProduct";
import { loader as adminReports } from "./pages/AdminReport";

const getTheme = () => {
  const theme = localStorage.getItem('theme') || 'winter'
  document.documentElement.setAttribute('data-theme', theme)
  return theme
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayOut getTheme={getTheme}/>,
    errorElement: <ErrorPage />,
    loader: homeLoader,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader,
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productLoader,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader,
        action: singleProductAction,
      },
      {
        path: "deleteReview/:id",

        action: deleteReview,
      },
      {
        path: "about",
        element: <About />,
        errorElement: <ErrorElement />,
      },
      {
        path: "cart",
        element: <Cart />,
        errorElement: <ErrorElement />,
        loader: cartLoader,
      },
      {
        path: "orders",
        element: <UserOrders />,
        errorElement: <ErrorElement />,
        loader: orderLoader,
      },
      {
        path: "orders/:id",
        element: <SingleOrder />,
        errorElement: <ErrorElement />,
        loader: singleOrderLoader,
      },
      {
        path: "admin",
        element: <Admin />,
        errorElement: <ErrorElement />,
        loader: adminLoader,
        children: [
          {
            index: true,
            element: <AdminProduct />,
            loader: adminAllProduct,
            action: adminProductAction,
          },
          {
            path: "allorders",
            element: <AdminOrders />,
            loader: adminOrders,
          },
          {
            path: "report",
            element: <AdminReport />,
            loader: adminReports,
          },
          {
            path: "allorders/:id",
            element: <AdminSingleOrder />,
            loader: adminSingleOrder,
            action: adminSingleOrderUpdate,
          },
          {
            path: "editproduct/:id",
            element: <AdminEditProduct />,
            loader: adminSingleProduct,
            action: adminProductUpdate,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login getTheme={getTheme}/>,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register getTheme={getTheme}/>,
    errorElement: <ErrorPage />,
    action: registerAction,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
