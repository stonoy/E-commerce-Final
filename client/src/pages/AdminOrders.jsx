import React from "react";
import { customFetch } from "../utils/all";
import { OrderList, Pagination } from "../components";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params);
  try {
    const { data } = await customFetch.get("/order", {
      params,
    });
    // console.log(data)
    return { data, params };
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return null;
  }
};

const AdminOrders = () => {
  const response = useLoaderData();

  const { numOfPages, page } = response?.data;

  return (
    <div className="flex flex-col">
      <OrderList />
      <Pagination numOfPages={numOfPages} page={page} />
    </div>
  );
};

export default AdminOrders;
