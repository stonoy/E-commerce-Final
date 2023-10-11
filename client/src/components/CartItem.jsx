import React, { useState } from 'react'
import {AiOutlinePlus, AiOutlineMinus,AiOutlineDelete} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {  editItem, removeItem } from '../features/cart/cartSlice'
import { customFetch } from '../utils/all'

const CartItem = ({item}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user,goToTheProductPage} = useOutletContext()
    // console.log(item)
    // console.log(goToTheProductPage)
    const {name,price,image,amount,_id} = item
    // const [controlledAmount, setControlledAmount] = useState(amount || 0)
    const cartId = user ? item.serverCartId : item.localCartId
    
    // console.log(cartId)

    const editCartAmountOnServer = async (amount) =>{
        try {
            await customFetch.patch(`/cart/${cartId}`, {amount})
            console.log('cart item edited')
        } catch (error) {
            console.log(error?.response?.data?.msg)
        }
    }

    const handelEdit = async (job) => {
       if(job === 'plus'){
        const newAmount = amount + 1
    //    setControlledAmount(newAmount)
       if(!user){
        dispatch(editItem({localCartId: cartId, newAmount,job}))
        return
       }
       console.log(cartId, newAmount)
       await editCartAmountOnServer(newAmount)
       navigate(0)
       }

       if(job === 'minus'){
        const newAmount = amount - 1
    //    setControlledAmount(newAmount)
       if(!user){
        dispatch(editItem({localCartId: cartId, newAmount, job}))
        return
       }
       console.log(cartId, newAmount)
       await editCartAmountOnServer(newAmount)
       navigate(0)
       }
    }

   


    const handelDel = async() => {
        if(!user){
            dispatch(removeItem({localCartId: cartId}))
            return 
        }
        try {
            await customFetch.delete(`/cart/${cartId}`)
            console.log('item deleted')
            navigate(0)
        } catch (error) {
            console.log(error?.response?.data?.msg)
        }
    }
    
  

  return (
    <div className='flex items-center w-full p-4'>
        <button className="btn btn-circle btn-outline btn-sm mr-4 text-error" onClick={handelDel}>
                <AiOutlineDelete/>
            </button>
        <img src={image} alt={name} className='h-24 w-24 object-cover' onClick={() => goToTheProductPage(_id)}/>
        <div className='ml-4'>
            <h1>{name}</h1>
            <h3>{price}</h3>
            <h2>{amount}</h2>
        </div>
        <div className='ml-auto flex flex-col items-center justify-between'>
            <button className="btn btn-circle btn-outline btn-sm" onClick={() => handelEdit('plus')}>
                <AiOutlinePlus/>
            </button>
            <p>{amount}</p>
            <button className="btn btn-circle btn-outline btn-sm" onClick={() => handelEdit('minus')}>
                <AiOutlineMinus/>
            </button>
        </div>
    </div>
  )
}

export default CartItem