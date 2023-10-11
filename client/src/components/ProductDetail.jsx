import React, { useState } from "react";
import { Form, Link, useLoaderData, useOutletContext, useParams } from "react-router-dom";
import { customFetch, giveNumbersArray, ratingStar } from "../utils/all";
import FormInput from "./FormInput";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { nanoid } from 'nanoid'

const ProductDetail = () => {
  const { product } = useLoaderData();
  const user = useOutletContext()
  const [itemAmount, SetItemAmount] = useState(1)
  const {id: productId} = useParams()
  const dispatch = useDispatch()
  const [itemInCart, setItemInCart] = useState(false)

  // console.log(product)

  // console.log(nanoid());

  const {
    company,
    description,
    freeShipping,
    image,
    name,
    price,
    avgRating,
    numOfReviews,
    inventory
  } = product;

  // console.log(inventory)

  let allowedCartNumber = inventory < 5 ? inventory : 5

  const handelSubmit = async (e) => {
    e.preventDefault()
    setItemInCart(true)

    let productForCart = {...product, amount:itemAmount, localCartId: nanoid()}

    if(!user?.user){
      dispatch(addItem({product: productForCart}))
      return
    }

    let cartDataServer = {amount: itemAmount, product: productId}
    try {
      await customFetch.post('/cart', cartDataServer)
      console.log('Added to cartDB')
    } catch (error) {
      console.log(error?.response?.data?.msg)
    }
    
  }

  

  const addToCartBtn = <form onSubmit={handelSubmit}>
    <div className="form-control w-full max-w-xs">
    <label htmlFor="amount" className="label">
      <span className="label-text">Enter Amount</span>
    </label>
    <select id='amount' name="amount" disabled={inventory < 1} className="select select-bordered select-sm w-full max-w-xs" value={itemAmount} onChange={(e) => SetItemAmount(e.target.value)}>
  {giveNumbersArray(allowedCartNumber).map(item => {
    return (
      <option value={item} key={item}>{item}</option>
    )
  })}
</select>
    </div>
    {
      itemInCart ? 
      <Link to='/cart' type="button" className="btn btn-md my-4" onClick={() => setItemInCart(false)}>Go To Cart</Link>
      :
      <button type="submit" disabled={inventory < 1}  className="btn btn-md my-4">{inventory < 1 ? 'Out Of Stock' : 'Add to Cart'}</button>
    }
  </form>

  return (
    <div className="hero-content items-start flex-col justify-between gap-10  lg:flex-row ">
      <img
        src={image}
        className="max-w-sm rounded-lg shadow-2xl inline-block w-full"
      />
      <div className="py-2">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="flex gap-1 items-center mt-2">
          <h2 className="text-sm">Rating: </h2>
          <div className="rating rating-xs">{ratingStar(5, avgRating)}</div>
          <div className="badge badge-secondary">{numOfReviews}</div>
        </div>
        <p className="py-6">{description}</p>
        <h1 className="text-xl font-bold">Rs. {price}</h1>
        {/* BUTTON NEEDS TO CHANGE BASED ON USER */}
        {addToCartBtn}
        {/* <button className="btn btn-primary btn-sm my-6">Get Started</button> */}
        <h1 className="text-lg ">Sold by: {company}</h1>
      </div>
    </div>
  );
};

export default ProductDetail;
