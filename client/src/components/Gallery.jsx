import React from "react";
import { Link } from "react-router-dom";
import {ratingStar} from '../utils/all'

const Gallery = ({ products, openSidebar }) => {
  return (
    <div className={`${openSidebar && 'hidden'} grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}>
      {products.map((product) => {
        const { image, description, name, price, _id,avgRating,numOfReviews } = product;
        return (
          <div className="card w-full h-fit bg-base-100 shadow-xl" key={_id}>
            <figure>
              <img src={image} alt={name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <h1 className="text-lg">Rs {price}</h1>
              {/* <div className="rating rating-xs">{ratingStar(5, avgRating)}</div> */}
              <div className="flex gap-1 items-center mt-2">
          
          <div className="rating rating-xs">{ratingStar(5, avgRating)}</div>
          <div className="badge badge-secondary">{numOfReviews}</div>
        </div>
              <p>{description}</p>
              <div className="card-actions justify-end">
                <Link to={`./${_id}`} className="btn btn-primary">
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
