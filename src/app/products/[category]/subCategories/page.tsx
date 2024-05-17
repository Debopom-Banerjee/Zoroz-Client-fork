"use client";
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/home/Footer';
import { getSubCategoriesByCategory } from '@/utils/functions/getSubCategoriesByCategory';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners';


const SubCategoryCard = ({subCategory}:{subCategory:any})=>{
    return(
        <Link href={`/products/categories/${subCategory.name}`} className='flex flex-col hover:bg-gray-300 duration-500 transition-all items-center gap-5 justify-center w-[200px] h-[200px] mx-auto bg-white rounded-md '>
                <img src={subCategory?.image} alt={subCategory?.name} className='w-20' />
                <h1 className='font-semibold text-black text-lg'>{subCategory?.name}</h1>
                
        </Link>
    )
}

const page = () => {
    const {category}:any = useParams()
    const [subCategories, setSubCategories] = useState<any>([]);
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        const fetchSubCategories = async()=>{
            setLoading(true)
            const response = await getSubCategoriesByCategory(category.toString());
            setSubCategories(response);
            setLoading(false)
        }
        fetchSubCategories();
    }, [category])
  return (
    <>
    <Navbar />
    <div className='flex flex-col items-start gap-5 w-full min-h-[60vh] lg:w-[70%] mx-auto my-10'>
            <h1 className='font-semibold text-2xl'>All Sub-Categories</h1>
            <div className='flex flex-row w-full flex-wrap gap-10 items-center'>
            {loading? 
            <div className='flex flex-col min-h-[60vh] w-full mx-auto justify-center items-center'>
                <PuffLoader size={30} color='black' />
            </div>
            :
            subCategories?.map((subCategory:any,index:number)=>{
                    return(
                        <SubCategoryCard key={index} subCategory={subCategory} />
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