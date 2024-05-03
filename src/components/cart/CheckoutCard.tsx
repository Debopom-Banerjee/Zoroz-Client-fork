import React from 'react'

const CheckoutCard = ({
    totalAmount,
    totalGST,
    total
}:{
    totalAmount: number,
    totalGST: number,
    total: number
}) => {
  return (
    <div className="bg-white rounded-xl p-4 flex flex-col items-center gap-8">
    <h1 className="text-xl font-semibold">Cart Summary</h1>
    <div className="flex flex-row w-full justify-between items-center gap-10">
      <h1 className="text-md font-semibold">Total Amount</h1>
      <h1 className="text-md font-semibold">{totalAmount}</h1>
    </div>
    <div className="flex flex-row w-full justify-between items-center gap-10">
      <h1 className="text-md font-semibold">Total GST</h1>
      <h1 className="text-md font-semibold">{totalGST}</h1>
    </div>
    <div className="flex flex-row w-full justify-between items-center gap-10">
      <h1 className="text-md font-semibold">Total Payment</h1>
      <h1 className="text-md font-semibold">{total}</h1>
    </div>
  </div>
  )
}

export default CheckoutCard