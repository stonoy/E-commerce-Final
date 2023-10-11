import React from 'react'
import { customFetch } from '../utils/all'
import { SingleOrderDetails } from '../components'


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

const SingleOrder = () => {
   return (
    <SingleOrderDetails/>
   )
}

export default SingleOrder




