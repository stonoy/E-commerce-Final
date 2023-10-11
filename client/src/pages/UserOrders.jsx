import React from "react";
import { customFetch } from "../utils/all";
import { redirect, useLoaderData } from "react-router-dom";
import { OrderList, Pagination } from "../components";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get("/order/showmyorders", { params });
    // console.log(data)
    return { data, params };
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return redirect("/");
  }
};

const UserOrders = () => {
  const response = useLoaderData();

  const { numOfPages, page } = response?.data;
  return (
    <div className="align-element flex flex-col">
      <OrderList />
      <Pagination numOfPages={numOfPages} page={page} />
    </div>
  );
};

export default UserOrders;
