import React from 'react'

const Failure = () => {
  return (
    <div className="bg-red-100 border-l-4 my-10 align-element border-red-500 text-red-700 p-4" role="alert">
  <p className="font-bold">Payment Error</p>
  <p>There was an issue processing your payment. Please try again.</p>
</div>
  )
}

export default Failure