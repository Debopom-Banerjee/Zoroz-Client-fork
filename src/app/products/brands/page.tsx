"use client";
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/home/Footer';
import { getBrands } from '@/utils/functions/getBrands';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners';


const BrandCard = ({brand}:{brand:any})=>{
    return(
        <Link href={`/products/brands/${brand.name}`} className='flex flex-col hover:bg-gray-300 duration-500 transition-all items-center gap-5 justify-center w-[400px] h-[300px] mx-auto bg-white rounded-md '>
                <img src={brand?.image} alt={brand?.name} className='w-36' />
                <h1 className='font-semibold text-black text-lg'>{brand?.name}</h1>
                
        </Link>
    )
}

const page = () => {
    const [brands,setBrands] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        const fetchBrands = async()=>{
            setLoading(true)
            const data = await getBrands();
            console.log(data);
            setBrands(data)
            setLoading(false)
        }
        fetchBrands()
    },[])
  return (
    <>
    <Navbar />

    <div className='flex flex-col items-start gap-5 w-full min-h-[60vh] lg:w-[70%] mx-auto my-10'>
            <h1 className='font-semibold text-2xl'>All Brands</h1>
            <div className='flex flex-row w-full flex-wrap gap-10 items-center'>
            {loading? 
            <div className='flex flex-col min-h-[60vh] w-full mx-auto justify-center items-center'>
                <PuffLoader size={30} color='black' />
            </div>
            :
                brands?.map((brand:any,index:number)=>{
                    return(
                        <BrandCard key={index} brand={brand} />
                    )
                })
            }
    </div>
    </div>
    
    <Footer />
    </>
  )
}

export default page