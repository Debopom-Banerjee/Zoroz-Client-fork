"use client";

import ThankYouModal from '@/components/common/ThankYouModal';
import { useUser } from '@/lib/store/user';
import { getOrdersByUser } from '@/utils/functions/getOrdersByUser';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners';


const OrderCard = ({orderData}:{orderData:any})=>{
    console.log(orderData)
    return(
        <div className='flex flex-row flex-wrap justify-between items-center  gap-3 w-full bg-white px-10 py-5 rounded-lg border border-slate-300'>
            <div className='flex flex-row items-center gap-5 justify-center'>
            <div className='w-20 h-20 bg-gray-200 rounded-lg'>
                <img src={orderData?.product?.image} alt={orderData?.product?.name} width={100} height={100} />
            </div>
           <div className='flex flex-col items-start gap-1 '>
                <h1 className='font-semibold text-sm'>{orderData?.product?.name}</h1>
                <h1 className='font-semibold text-sm'>Price: {orderData?.product?.price}</h1>
                <h1 className='font-semibold text-sm'>Quantity: {orderData?.quantity}</h1>
           </div>
            </div>
           
           <div className='flex flex-col items-center gap-2'>
                <h1 className='font-semibold'>Status : {orderData?.status}</h1> 
                <button className='font-semibold text-white bg-red-600 px-5 py-1 rounded-lg border border-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'>Cancel</button>
           </div>
        </div>
    )
}
const page = () => {
    const [showThankYou,setShowThankYou] = useState(false);
    const [loading, setLoading] = useState(true)
    const user = useUser((state)=>state.user)
    const [ordersData, setOrdersData] = useState([])

    useEffect(()=>{
        const fetchOrders = async()=>{
            const data = await getOrdersByUser(user?._id!)
            if(data){
                setOrdersData(data.orders)
            }
            console.log(data)
            setLoading(false)
        }
        fetchOrders()
    },[user])
  return (
    <div className='bg-white px-8 py-5 mx-auto w-[100%] md:w-[70%] flex flex-col items-start gap-10 rounded-lg min-h-[60vh]'>
        <h1 className='font-semibold text-xl'>My Orders</h1>
        <div className='flex flex-col items-start  gap-5 w-full'>
           {loading ?  
           <div className='flex flex-col w-full items-center gap-2 justify-center min-h-[60vh]'>
                <PuffLoader color='red' loading={loading} size={30} />
           </div>
           : (ordersData?.length > 0 ?
            ordersData?.map((order, index)=>{
                return(
                    <OrderCard orderData={order} key={index} />
                )
            })
            :
            <div className='flex flex-col items-center justify-center mx-auto my-auto  w-full mt-20 font-semibold text-lg text-red-600'>No Orders</div>)
           }
        </div>
        {showThankYou && (
        <ThankYouModal
          isOpen={showThankYou}
          onClose={() => setShowThankYou(false)}
          onSubmit={() => {}}
        />
      )}
    </div>
  )
}

export default page