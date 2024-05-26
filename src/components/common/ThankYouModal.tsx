"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

export const ThankYouModal = ({
    isOpen,
    onClose,
    onSubmit,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
  
  }) => {
    const router = useRouter();
    setTimeout(()=>{
      router.push('/profile/orders');
    },3000)
    return (
      <>
        {isOpen && (
          <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
            <div
              className={`bg-gray-100 p-4 rounded-lg max-h-[50vh] md:max-h-[60vh] min-h-auto w-[90%] flex flex-col items-start md:w-[50%] lg:w-[35%] `}
            >
              <div className="w-full flex flex-row mb-2 self-end items-center justify-between">                  
                <h2
                  onClick={onClose}
                  className="bg-black md:py-2 md:px-3 flex self-end px-2 py-1 hover:bg-white hover:text-black border-2 border-black  text-white text-sm font-semibold rounded-full cursor-pointer"
                >
                  X
                </h2>
              </div>
              <div className='flex flex-col items-center gap-2 justify-center mx-auto w-full'>
                <Image src={'/assets/home/thankyou.avif'} width={320} height={100} alt='' />
                <h1 className='font-semibold text-2xl'>For Ordering</h1>
              </div>
              
              <button
                className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
                onClick={()=>router.push('/profile/orders')}
              >
                Go To Orders
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
export default ThankYouModal