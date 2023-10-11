import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {ratingStar} from '../utils/all'

const Cards = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  if (!data) {
    return <h1>Failed to load featured products</h1>;
  }

  const { products } = data;

  const handelClick = (_id) => {
    navigate(`/products/${_id}`);
  };

  return (
    <div className="flex align-element mt-8 py-4 flex-col gap-4 md:flex-row">
      {products.map((product) => {
        const { image, description, name, price, _id,avgRating, numOfReviews } = product;
        return (
          <div
            className="card w-full bg-base-100 shadow-xl"
            key={_id}
            onClick={() => handelClick(_id)}
          >
            <figure>
              <img src={image} alt={name} />
            </figure>
            <div className="card-body">
            {/* <div className="rating rating-sm">{ratingStar(5, avgRating)}</div> */}
            <div className="flex gap-1 items-center mt-2">
          
          <div className="rating rating-xs">{ratingStar(5, avgRating)}</div>
          <div className="badge badge-secondary">{numOfReviews}</div>
        </div>
              <h1 className="card-title">{price}</h1>
              <h2 className="card-title">
                {name}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
