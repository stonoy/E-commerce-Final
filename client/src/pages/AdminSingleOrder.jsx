import React from 'react'
import { customFetch } from '../utils/all'
import { SingleOrderDetails } from '../components'
import { redirect } from 'react-router-dom'

export const loader = async({params}) => {
    const {id} = params
    
    try {
        const {data} = await customFetch.get(`/order/${id}`)
        return data.order
    } catch (error) {
        console.log(error?.response?.data?.msg);
    return null;
    }
}

export const action = async({params,request}) => {
    const {id} = params
    const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data, id)

  try {
    await customFetch.patch(`/order/${id}`, data)
    console.log('Order Updated!')
    redirect('./')
  } catch (error) {
    console.log(error?.response?.data?.msg)
    return null
  }

  return null
}

const AdminSingleOrder = () => {
    return (
        <SingleOrderDetails admin={true}/>
       )
}

export default AdminSingleOrder