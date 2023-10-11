import React from "react";
import { useOutletContext } from "react-router-dom";

const OrderItems = ({ orderItems }) => {
  const {goToTheProductPage} = useOutletContext()
  // console.log(orderItems)
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {orderItems.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16" onClick={() => goToTheProductPage(item.product)}>
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <th>{item.price}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderItems;
