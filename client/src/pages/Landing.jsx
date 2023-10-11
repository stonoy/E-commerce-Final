import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils/all";
import { Cards } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/product?featured=true");

    return data;
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return null;
  }
};

const Landing = () => {
  return (
    <div className="bg-base-100">
      <div className="hero min-h-screen  ">
        <div className="align-element">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="/hero2.webp"
              className="hidden md:inline-block max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold">E-Commerce</h1>
              <p className="py-6 my-6 leading-loose text-lg">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">
                <Link to="/products">Shop Now</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Cards />
    </div>
  );
};

export default Landing;
