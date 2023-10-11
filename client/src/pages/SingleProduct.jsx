import React from "react";
import { customFetch } from "../utils/all";
import { CommentSection, ProductDetail } from "../components";
import { Link, redirect, useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const { id } = params;

  try {
    const { data } = await customFetch.get(`/product/${id}`);
    return data;
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return null;
  }
};

export const action = async ({ request, params }) => {
  const { id } = params;

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.product = id;
  // console.log("submit", data);

  try {
    await customFetch.post("/review", data);

    return redirect(`/products/${id}`);
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return null;
  }
};

const SingleProduct = () => {
  const response = useLoaderData();
  if (!response) {
    return <h2>Error in fetching the product</h2>;
  }

  return (
    <div className="align-element">
      <div className="text-md breadcrumbs pt-6 text-info-content">
        <ul>
          <li>
            <Link to="/" className="text-secondary">Home</Link>
          </li>
          <li>
            <Link to="/products" className="text-secondary">Products</Link>
          </li>
        </ul>
      </div>
      <div className="my-2 w-full border-b-2 border-primary-content"></div>
      <div className="hero   bg-base-100">
        <ProductDetail />
      </div>
      <div className="my-2 w-full border-b-2 border-primary-content"></div>
      <CommentSection />
    </div>
  );
};

export default SingleProduct;
