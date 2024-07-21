import Link from "next/link"

export const BrandCard = ({brand}:{brand:any})=>{
    return(
        <Link href={`/products/brands/${brand.name}`} className='flex flex-col hover:bg-gray-300 duration-500 transition-all items-center gap-5 justify-center w-[200px] h-[200px] mx-auto bg-white rounded-md '>
                <img src={brand?.image} alt={brand?.name} className='w-20' />
                <h1 className='font-semibold text-black text-lg'>{brand?.name}</h1>
                
        </Link>
    )
}