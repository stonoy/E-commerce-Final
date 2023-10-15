import React from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import FormSelect from "./FormSelect";

const OrderList = () => {
  const res = useLoaderData();
  const list = ["all", "pending", "failed", "paid", "delivered", "canceled"];

  // console.log(res);

  if (!res.data) {
    return (
      <h1 className=" bg-error text-error-content p-6">
        Error, in fetching orders list
      </h1>
    );
  }

  if (res.data.orders.length < 1) {
    return (
      <h1 className=" bg-warning text-warning-content p-6">No items found</h1>
    );
  }

  return (
    <div className=" overflow-x-auto my-2">
      <div className="my-6 flex justify-between items-center ">
        <h1 className="text-2xl text-info-content ">Order Details</h1>
        <Form >
          <select
            name="status"
            id="status"
            defaultValue={res.params.status}
            className="select select-sm border-base-300 mr-4 "
          >
            {list.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <button type="submit" className="btn btn-sm">
            Check
          </button>
        </Form>
      </div>
      <table className="min-w-full">
        <thead className="bg-neutral">
          <tr>
            <th className="px-6 py-3 bg-base-200 text-left text-xs leading-4 font-medium text-base-content uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 bg-base-200 text-left text-xs leading-4 font-medium text-base-content uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 bg-base-200 text-left text-xs leading-4 font-medium text-base-content uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-base-200 text-left text-xs leading-4 font-medium text-base-content uppercase tracking-wider">
              Transaction Id
            </th>
            <th className="px-6 py-3 bg-base-200 text-left text-xs leading-4 font-medium text-base-content uppercase tracking-wider">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="bg-base divide-y divide-gray-200">
          {res.data.orders.map((order, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-base-content">
                  {order.createdAt.slice(0, 10)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-base-content">
                  {order.total}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-base-content">
                  {order.status}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-base-content">
                  {order.transactionId}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-base-content">
                  <Link to={`./${order._id}`}>Link</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
