import React from "react";
import { customFetch } from "../utils/all";
import { Pagination, Product } from "../components";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/product", {
      params,
    });
    // console.log(data);
    return { data, params };
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return null;
  }
};

const Products = () => {
  const res = useLoaderData();

  const numOfPages = res?.data?.numOfPages;
  const page = res?.data?.page;

  return (
    <div className="bg-base-100 flex flex-col text-base-content align-element">
      <Product />
      <Pagination numOfPages={numOfPages} page={page} />
    </div>
  );
};

export default Products;
