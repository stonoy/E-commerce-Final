import React from "react";

import { Link, Outlet, redirect, useLoaderData, useOutletContext } from "react-router-dom";
import { customFetch } from "../utils/all";
import Pagination from "../components/Pagination";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/user/getallusers");
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return redirect("/");
  }
};

const Admin = () => {
  const { users, count } = useLoaderData();
  const {goToTheProductPage} = useOutletContext()
  // console.log()
  return (
    <div className="bg-base-100 text-base-content  text-lg font-semibold  min-h-screen pt-2 px-4 md:pt-5">
      <div className="align-element ">
        {/* {MENU START} */}
        <ul className="menu menu-horizontal w-full flex justify-center   bg-base-200 rounded-box">
          <li>
            <Link to=".">Product</Link>
          </li>
          <li>
            <Link to="allorders">Orders</Link>
          </li>
          <li>
            <Link to="report">Report</Link>
          </li>
          <li>
            <Link to="sales">Sales</Link>
          </li>
        </ul>

        {/* {MENU END} */}
        {/* <h2 className="text-2xl  mt-8">Number of Users</h2>
        <div className="my-6 w-full border-b-2 border-primary-content"></div>
        <h2 className="py-4 ">Number of Users: {count}</h2> */}
        <div className="my-6">
          <Outlet context={{goToTheProductPage}}/>
        </div>
      </div>
    </div>
  );
};

export default Admin;
