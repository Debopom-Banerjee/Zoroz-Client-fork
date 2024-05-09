"use client";
import { useUser } from '@/lib/store/user';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoPersonCircleSharp } from 'react-icons/io5'


const profileSideItems = [
    {
        name: 'Profile',
        icon: <IoPersonCircleSharp size={20} />,
        link: '/profile'
    },
    {
        name: 'Orders',
        icon: <IoPersonCircleSharp size={20} />,
        link: '/profile/orders'
    },
    {
        name: 'My Cart',
        icon: <IoPersonCircleSharp size={20} />,
        link: '/profile/cart'
    }
]
const ProfileSideBar = () => {
    const pathname = usePathname()
    const user = useUser(state=>state.user)

    return (
        <>
        <div className='flex md:hidden flex-row items-center flex-wrap gap-3 w-full'>
        {
                    profileSideItems.map((item, index)=>{
                        return(
                            <Link href={item.link} key={index} className={`${(pathname === item.link) && `bg-red-600  text-white`} flex flex-row py-2 text-red-600 rounded-xl border px-4 border-red-600  justify-center mx-auto  items-center gap-1`}>
                                {item.icon}
                                <h1>{item.name}</h1>
                            </Link>
                        )
                    })
                }
        </div>
        <div className='md:flex hidden flex-col items-center gap-5 w-[200px]'>
            <div className='bg-red-500 text-white flex flex-row p-4 rounded-lg items-center gap-3'>
            <IoPersonCircleSharp size={40} color='white' />
                <div className='flex flex-col items-start '>
                    <h1 className='text-gray-200'>Name</h1>
                    <h1 className='font-semibold'>{user ? user?.name : "User"}</h1>
                </div>
            </div>
            

            <div className='flex flex-col items-start gap-2 bg-white px-5 py-3 lg:w-[200px] rounded-lg '>
                {
                    profileSideItems.map((item, index)=>{
                        return(
                            <Link href={item.link} key={index} className={`${(pathname === item.link) && `text-red-600 `} flex flex-row py-2 border-b last:border-0 border-slate-300 w-full items-center gap-1`}>
                                {item.icon}
                                <h1>{item.name}</h1>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
        </>
  )
}

export default ProfileSideBar