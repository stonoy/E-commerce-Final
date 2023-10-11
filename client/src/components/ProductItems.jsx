import React from "react";
import { Link, redirect, useNavigate, useOutletContext } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { customFetch } from "../utils/all";

const ProductItems = ({ products }) => {
  const navigate = useNavigate();
  const {goToTheProductPage} = useOutletContext()
  //   console.log(products);

  const handelDel = async (productId) => {
    try {
      await customFetch.delete(`/product/${productId}`);
      navigate(".");
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-base-200 text-neutral uppercase tracking-wider ">
            <th>Created</th>
            <th>Image</th>
            <th>Name</th>

            <th>Price</th>
            <th>Inventory</th>
            <th>Company</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {products.map((item) => {
            const { _id, name, image, price, company, createdAt, inventory } =
              item;
            return (
              <tr key={item._id} className={inventory < 5 ? "bg-error" : ""}>
                <td>{createdAt.slice(0, 10)}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16" onClick={() => goToTheProductPage(_id)}>
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{name}</td>
                <td>Rs. {price}/-</td>
                <td>{inventory}</td>
                <td>{company}</td>
                <td className="text-secondary underline">
                  <Link to={`./editproduct/${_id}`}>Link</Link>
                </td>
                <td>
                  <AiFillDelete
                    className="text-lg text-error-content cursor-pointer"
                    onClick={() => handelDel(_id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductItems;
