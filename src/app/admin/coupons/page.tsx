"use client";
import { getCoupons } from '@/utils/functions/getCoupons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoBookmark } from 'react-icons/io5';

const CouponCard = ({coupon}:{coupon:any})=>{
  const convertIntoTime = (dateString:string)=>{
    const date = new Date(dateString);

 
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
  
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
    
 }
  return(
    <div className='flex flex-col items-center rounded-md bg-white w-[300px] px-5 py-5 gap-3'>
      <IoBookmark size={30} color='black' />
        <h1 className='font-semibold text-lg'>{coupon?.name}</h1>
        <h1 className='font-semibold text-sm '>Code : <span className='text-gray-500'>{coupon?.name}</span></h1>
        <h1 className='font-semibold text-sm '>Start Date: <span className='text-gray-500'>{convertIntoTime(coupon?.startDate)}</span></h1>
        <h1 className='font-semibold text-sm '>Expiry Date : <span className='text-gray-500'>{convertIntoTime(coupon?.expiryDate)}</span></h1>
        <p className='text-justify text-sm font-semibold'>Description: <br />
        {coupon.discount_text}
        </p>
        <button className='px-5 py-1 bg-black hover:bg-white text-white hover:text-black border border-black hover:border-black text-sm'>Edit</button>
    </div>
  )
}

const page = () => {
  const [isCouponModalOpen,setIsCouponModalOpen] = useState(false);
  const [coupons,setCoupons] = useState([]);
  useEffect(()=>{
      const fetchCoupons = async()=>{
        const data = await getCoupons();
        console.log(data)
        setCoupons(data)
      }
      fetchCoupons()
  },[])
  return (
    <div className="w-full flex flex-col gap-3 px-5 py-5">
       <h1 className="font-semibold  text-xl ">All Coupons</h1>
      <div className="flex flex-row items-center gap-10">
        <input
          type="text"
          placeholder="Search Coupons"
          className="border border-slate-200 p-2 rounded-md w-[60%]"
        />

        <Link
        href={`/admin/coupons/add`}
          className="bg-black px-5 py-2 text-white border border-black hover:bg-white hover:text-black font-semibold text-sm"
        >
          Add Coupon
        </Link>

      </div>

      <div className='flex flex-row items-center gap-5'>
          {
            coupons?.map((coupon:any,index:number)=>{
              return(
                <CouponCard coupon={coupon} key={index} />
              )
            })
          }
      </div>
      </div>
  )
}

export default page