import React from 'react'
import OrderItems from './OrderItems'
import { Form, useLoaderData } from 'react-router-dom'
import ButtonParams from './ButtonParams'

const SingleOrderDetails = ({admin}) => {
    const order = useLoaderData()
    const statusList = ["pending", "failed", "paid", "delivered", "canceled"]

    if(!order){
        return <h1 className='align-element bg-error text-error-content p-6'>Error, in fetching order details</h1>
    }
    console.log(order)
  return (
    <div className="bg-base p-4 rounded-lg shadow-md align-element">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
      <div className="mb-4">
        <strong className="text-lg font-medium">Order Number:</strong> {order._id}
      </div>
      <div className="mb-4">
        <strong className="text-lg font-medium">Date:</strong> {order.createdAt.slice(0,10)}
      </div>
      <div className="mb-4">
        <strong className="text-lg font-medium">Tax:</strong> {order.tax}
      </div>
      <div className="mb-4">
        <strong className="text-lg font-medium">Shipping:</strong> {order.shippingFee}
      </div>
      <div className="mb-4">
        <strong className="text-lg font-medium">Description:</strong> {order.total}
      </div>
      
      <Form method='post'>
        <div className="mb-4">
        <strong className="text-lg font-medium">Status:</strong> <select name='status' defaultValue={order.status} disabled={!admin} className="select select-ghost w-full max-w-xs">
        {statusList.map(item => {
          return (
            <option value={item} key={item}>{item}</option>
          )
        })}
</select>
      </div>
      <div className="mb-4">
        <strong className="text-lg font-medium flex items-center"><span>Address:</span></strong> <textarea name='address' defaultValue={order.address || ''} disabled={!admin}  className="textarea textarea-ghost textarea-xs resize-none w-full max-w-xs" ></textarea>
      </div>
      {admin && <button type='submit' className='btn btn-sm mb-4'>Submit</button>}
      </Form>
      
      <div className="mb-4">
        <strong className="text-lg font-medium">Product Details</strong>
      </div>
      <div className="mb-4">
        <OrderItems orderItems={order.orderItems}/>
      </div>
    </div>
  )
}

export default SingleOrderDetails