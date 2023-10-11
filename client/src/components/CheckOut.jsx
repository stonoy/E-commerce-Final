import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { customFetch } from '../utils/all'

const CheckOut = ({orderTotal}) => {
    const tokenHandler = async(token) => {
        console.log(token)
        try {
            await customFetch.post('/order', {token})
            console.log('Order Successful')
        } catch (error) {
            console.log(error?.response?.data?.msg)
        }
    }
  return (
    <StripeCheckout
    token={tokenHandler}
    amount={orderTotal*100}
    currency='inr'
    shippingAddress
    billingAddress={true}
    stripeKey='pk_test_51NmHhXSDdSE6tXo7iWMpdjJo5DZoBiXUOC8qn4mtvnUhjWpS0IzM9Ich3ynYW25ZZTBBjSIkdElluogd8wEkV1xb00VCsK9evL'
    >
        <button className='btn btn-wide btn-sm my-4 bg-base-300 block' >Order Now</button>
    </StripeCheckout>
  )
}

export default CheckOut