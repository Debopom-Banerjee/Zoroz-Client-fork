import Image from 'next/image'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { RiTwitterXLine } from 'react-icons/ri'

const ShortCutRouteChip = ({
    title,
    link
}:{
    title?:string,
    link?:string
})=>{
    return(
        <div className='border-r px-2 text-xs last:border-0 border-black'>
            <h1>{title}</h1>
        </div>
    )
}

const Socials = () => {
  return (
    <div className='flex md:hidden flex-col items-center gap-5 justify-center'>
        <h1 className='font-semibold text-md'>More About Zoroz</h1>
        <div className='flex flex-col items-center gap-3'>
            <h1>Download The App</h1>
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
        <div className='flex flex-row flex-wrap gap-2 justify-center items-center w-[90%]'>
            <ShortCutRouteChip title='About Us' link='' />
            <ShortCutRouteChip title='Careers' link='' />
            <ShortCutRouteChip title='Contact us' link='' />
            <ShortCutRouteChip title='Press' link='' />
            <ShortCutRouteChip title='Testimonials' link='' />
            <ShortCutRouteChip title='Blog' link='' />
            <ShortCutRouteChip title='Buyer Guide' link='' />
            <ShortCutRouteChip title='Industry Store' link='' />
            <ShortCutRouteChip title='Supplier Central' link='' />
            <ShortCutRouteChip title='Popular Searches' link='' />
            <ShortCutRouteChip title='CreditX' link='' />
            <ShortCutRouteChip title='DigiMRO' link='' />
            <ShortCutRouteChip title='Zoglix' link='' />
           

        </div>

        <div className='flex flex-row flex-wrap gap-2 justify-center items-center w-[90%]'>
        <ShortCutRouteChip title='TERMS OF USE' link='' />
        <ShortCutRouteChip title='COPYRIGHT' link='' />
        <ShortCutRouteChip title='PRIVACY POLICY' link='' />
        <ShortCutRouteChip title='COMPLIANCE' link='' />
        </div>

        <div className='flex flex-col items-center gap-1 text-[10px]'>
            <h1>Zoroz India Private Limited</h1>
            <h1>@2024 Zoroz.com | All Rights Reserved</h1>
        </div>
    </div>
  )
}

export default Socials