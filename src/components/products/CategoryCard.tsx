import Link from "next/link";

export const CategoryCard = ({category}:{category:any})=>{
    return(
        <Link href={`/products/${category.name}/subCategories`} className='flex flex-col hover:bg-gray-300 duration-500 transition-all items-center gap-5 justify-center w-[200px] h-[200px] mx-auto bg-white rounded-md '>
                <img src={category?.image} alt={category?.name} className='w-20' />
                <h1 className='font-semibold text-black text-lg'>{category?.name}</h1>
        </Link>
    )
};
