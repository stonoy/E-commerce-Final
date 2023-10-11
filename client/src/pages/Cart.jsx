import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { CartItemContainer, Failure, OrderDetails, Success } from "../components";
import { useLoaderData, useLocation, useOutletContext } from "react-router-dom";
import { customFetch, modifyServerData } from "../utils/all";

export const loader = async() => {

  try {
    const {data} = await customFetch.get('/cart')
    
    return data
  } catch (error) {
    console.log(error?.response?.data?.msg)
    return null
  }
}

const Cart = () => {
  const localCartData = useSelector((store) => store.cart);
  const serverCartDataRaw = useLoaderData()
  const {user} = useOutletContext()
  const {search} = useLocation()

  // console.log(user)
  
  const searchParams = new URLSearchParams(search)
  // console.log(searchParams.get('success'))
  const hasPaymentDone = searchParams.get('success') === 'true'

  useEffect(() => {
    const clearCart = async() => {
      try {
        await customFetch.delete('/cart/clearcart')
        // navigate(0)
        console.log('cart is now emply')
      } catch (error) {
        console.log(error?.response?.data?.msg)
        
      }
    }
    if(hasPaymentDone){
      console.log(hasPaymentDone)
      clearCart()
    }
  },[])

  const serverCartDataFinal = modifyServerData(serverCartDataRaw)
  
    
  const data = user ? serverCartDataFinal : localCartData

  // console.log(serverCartDataFinal)

  if(!data || data.numItemsInCart < 1 || hasPaymentDone){
    return <div className="align-element">
      {hasPaymentDone && <Success/>}

      <h1 className="m-6">No Items in Cart</h1>
    </div>
   }
   

  return <>
    {searchParams.get('success') === 'false' && <Failure/>}
    <div className="align-element grid gap-2  md:grid-cols-[1fr_auto]">
    <CartItemContainer data={data}/>
    <OrderDetails data={data}/>
  </div>
  </>
};

export default Cart;
