import Navbar from '@/components/common/Navbar';
import Footer from '@/components/home/Footer';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = (Params:any) => {
    const params = Params.searchParams;
    const price = params.price;
    const method = params.method;
  return (
    <>
    <Navbar />
        <div className='bg-white my-10 flex flex-row items-center justify-between mx-auto rounded-lg lg:w-[60%] w-full p-8'>
                <Image src={'/assets/succes.jpg'} alt='' height={100} width={400} />
                <div className='flex flex-col items-start px-10 gap-2'>
                    <h1 className='text-green-500 font-semibold text-3xl tracking-wide'>Order Placed Successfully !</h1>
                    <h1 className='text-slate-600'>Thank You for ordering from Zoroz ! Please keep checking your orders status for further updates and we will contact you for the delivery ! </h1>
                    <h1>Payment : ₹ {price} {method}</h1>
                    <div className='flex flex-row items-center justify-center gap-10'>
                            <Link href={'/profile/orders'} className='bg-red-600 text-white rounded-lg font-semibold px-6 py-2 hover:bg-white hover:text-red-600 hover:border-red-600 hover:border border'>
                                Go to Orders
                            </Link>
                            <Link href={'/'} className='bg-white text-red-600 rounded-lg font-semibold px-6 py-2 hover:bg-red-600 hover:text-white hover:border-red-600 hover:border border border-red-600'>
                                Go to Home
                            </Link>
                    </div>
                </div>
        </div>
    <Footer />
    </>
  )
}

export default page