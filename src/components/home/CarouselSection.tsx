import { Carousel } from 'flowbite-react'
import Image from 'next/image'
import React from 'react'

const CarouselTabSelector = ()=>{
    return(
        <div className='bg-white w-full cursor-pointer border-r border-slate-400 last:border-0  text-gray-700 flex flex-col items-center py-2 px-5'>
            <h1 className='font-semibold text-xs md:text-sm'>KORES</h1>
            <h1 className='text-[9px]'>UPTO 20% OFF</h1>
        </div>
    )
}

const CarouselSection = () => {
  return (
    <div className="w-full ">
    <Carousel slideInterval={5000} className='h-[200px] lg:h-[300px] z-10 relative'>
      <Image
        width={96}
        height={96}
        src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
        alt="..."
        className='z-10'
      />
      <Image
        width={96}
        height={96}
        src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
        alt="..."
        className='z-10'
      />
      <Image
        width={96}
        height={96}
        src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
        alt="..."
        className='z-10'
      />
      <Image
        width={96}
        height={96}
        src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
        alt="..."
        className='z-10'
      />
      <Image
        width={96}
        height={96}
        src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
        alt="..."
        className='z-10'
      />
    </Carousel>
    <div className='hidden md:flex flex-row items-center justify-between border  rounded-b-xl'>
        <CarouselTabSelector />
        <CarouselTabSelector />
        <CarouselTabSelector />
        <CarouselTabSelector />
        <CarouselTabSelector />
    </div>
  </div>
  )
}

export default CarouselSection