import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { clearCart } from '../features/cart/cartSlice'
import { customFetch } from '../utils/all'
import CheckOut from './CheckOut'

const OrderDetails = ({data}) => {
  const dispatch = useDispatch()
  const {user} = useOutletContext()
  const navigate = useNavigate()
  // console.log(data)

  const {cartTotal,orderTotal,shipping,tax} = data

  const handelOrder = async() => {
    
      if(!user){
        navigate('/login')
        return
      }
      
    try {
      const {data} = await customFetch.post('/order')
      // console.log(data.session)
      window.location=data.url
    } catch (error) {
      console.log(error?.response?.data?.msg)
    }
    
  }

  const handelClearCart = async() => {
    if(!user){
      dispatch(clearCart())
      return
    }
    try {
      await customFetch.delete('/cart/clearcart')
      navigate(0)
      console.log('cart is now emply')
    } catch (error) {
      console.log(error?.response?.data?.msg)
      
    }
  }
 
  return (
    <div className='w-full p-8 border-2 border-primary-content h-fit md:mt-10'>
      <h1 className='flex gap-4 justify-between items-center'>Cart Total: <span>{cartTotal}</span></h1>
      <h1 className='flex gap-4 justify-between items-center'>Tax: <span>{tax.toFixed(2)}</span></h1>
      <h1 className='flex gap-4 justify-between items-center'>Shipping: <span>{shipping}</span></h1>
      <div className="my-4 w-full border-b-2 border-primary-content"></div>
      <h1 className='flex gap-4 justify-between items-center'>Total: <span>{orderTotal}</span></h1>
      <button className='btn btn-wide btn-sm my-4 bg-base-300 block' onClick={handelOrder}>{user ? 'Order Now' : 'Login'}</button>
      <button className='btn btn-wide btn-sm my-4 bg-base-300 text-error block' onClick={handelClearCart}>Clear Cart</button>
    </div>
  )
}

export default OrderDetails