import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import { useOutletContext } from 'react-router-dom'

const CartItemContainer = ({data}) => {
  const dispatch = useDispatch()
    const {user} = useOutletContext()
  //  const cartItemsLocal =  useSelector(store => store.cart)
   

   const {cartItems, numItemsInCart} = data
  //  console.log(cartItems, numItemsInCart)

  

   

  return (
    <div className='  items-start'>
        <h1 className='my-4'>Total {numItemsInCart} items in Cart</h1>
        <div className='flex flex-col gap-2'>
            {cartItems.map((item,i) => <CartItem key={i} item={item} />)}
        </div>
        
    </div>
  )
}

export default CartItemContainer