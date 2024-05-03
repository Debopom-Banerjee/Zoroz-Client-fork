import Image from 'next/image'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { IoMailSharp } from 'react-icons/io5'
import { RiTwitterXLine } from 'react-icons/ri'

const FeatureChip = ()=>{
    return(
        <div className='flex flex-col items-start gap-2 text-xs w-[200px] border-r border-slate-500 last:border-0 px-3'>
            <Image src={'/assets/home/chair.jpg'} width={80} height={80} alt=''/>
            <h1 className=' font-semibold'>Damier</h1>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta cupiditate voluptas nesciunt?</h1>
        </div>
    )
}

const ListChip = ()=>{
    return(
        <div className='flex flex-col items-start gap-2 justify-center'>
                <h1 className='font-semibold text-md'>
                    Zoroz
                </h1>
                <ul className='flex flex-col text-xs items-start gap-2'> 
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Services</li>
                    <li>Products</li>
                    <li>Contact Us</li>
                </ul>
        </div>
    )
}

const FootChip = ({title,link}:{
    title?:string,
    link?:string
})=>{
    return(
        <div className='border-r text-xs pr-2 border-slate-500 last:border-0'>
            {title}
        </div>
    )
}

const Foot = ()=>{
    return(
        <div className='flex flex-row items-center  py-2 justify-between bg-[#efeff4] w-full px-10'>
            <div className='flex flex-row items-center gap-2'>
                <FootChip title='Terms of Use' />
                <FootChip title='Copyright' />
                <FootChip title='Privacy Policy' />
                <FootChip title='Compliance' />
            </div>
            <h1 className='text-sm'>Zoroz India Private Limited © 2024 Zoroz.com All Rights Reserved</h1>
        </div>
    )
}

const Footer = () => {
  return (
    <div className='hidden md:flex bg-white mt-10 pt-10 flex-col w-full mx-auto justify-center items-center gap-5 '>
        <div className='flex flex-row justify-evenly w-full mx-auto items-center gap-4 pb-10 border-b border-slate-500'>
            <FeatureChip />
            <FeatureChip />
            <FeatureChip />
            <FeatureChip />
        </div>
        <div className='flex flex-row justify-evenly w-full mx-auto items-center gap-4 pb-10 border-b border-slate-500'>
            <ListChip />
            <ListChip />
            <ListChip />
            <ListChip />
            <ListChip />
        </div>
        <div className='flex flex-row items-center justify-between w-[90%]'>
        <div className='flex flex-row items-center gap-2 justify-center'>
                <Image
                src={'/assets/home/app_store-img.png'}
                width={100}
                height={40}
                alt='' 
                />
                 <Image
                src={'/assets/home/play_store-img.png'}
                width={100}
                height={40}
                alt='' 
                />
            </div>

            <div className='flex flex-col items-center'>
                <h1 className='text-blue-500 flex flex-row items-center gap-1'>
                <IoMailSharp />
                    dummymail@xyz.com
                </h1>
                <h1>In case of any concern, mail us</h1>
            </div>

            <div className='flex flex-col items-center gap-3'>
            <h1>Stay Connected</h1>
            <div className='flex flex-row items-center gap-3 justify-center'>
            <FaFacebook color='#1877F2' size={30} />
            <FaLinkedin color='#0077b5' size={30} />
            <RiTwitterXLine color='#000' size={30} />
            <FaYoutube color='	#FF0000' size={30} />
            <FaInstagram color='#FCAF45' size={30} />
            </div>
           
        </div>
        </div>
        <Foot />
    </div>
  )
}

export default Footer