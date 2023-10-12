import React from 'react'
import { customFetch } from '../utils/all'
import { redirect, useLoaderData } from 'react-router-dom'
import { BarChartContainer } from '../components'


export const loader = async() => {
    try {
       const {data} = await customFetch.get('/order/orderstat') 
       return data
    } catch (error) {
        console.log(error?.response?.data?.msg);
    return redirect('/')
    }
}

const AdminSales = () => {
    const data = useLoaderData()

    // console.log(data)

  return (
    <div><BarChartContainer data={data.monthlyOrders}/></div>
  )
}

export default AdminSales