"use client";
import { useUser } from '@/lib/store/user';
import { getProductsByVendor } from '@/utils/functions/getProductsByVendor';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners';

const ProductCard = ({ product }: { product: any }) => {
    return (
      <div className={`${product?.admin_approval ? "border-green-400" : "border-red-600"} flex flex-col items-center border-2  w-[300px] bg-slate-200 p-5 gap-4 rounded-md`}>
        <img src={product?.image} alt="" />
        <h1 className="font-semibold text-md">{product.name}</h1>
        <h1 className="text-sm">Stock : <span className="font-semibold">{product?.stock_count}</span></h1>
        <h1 className="text-sm">Brand : <span className="font-semibold">{product?.brand}</span></h1>
        <h1 className="font-semibold text-sm">
        ₹{product?.price} <s className="text-red-500">₹{product?.mrp}</s>
        </h1>
        <h1 className={`${product?.admin_approval ? "text-green-500" : "text-red-600"} font-semibold text-base`}>
        {product?.admin_approval ? "Approved" : "Not Approved"}
        </h1>
        <Link
          href={`/products/${product?.category}/${product?._id}`}
          className="px-5 py-1 bg-black text-sm rounded-md text-white "
        >
          View More
        </Link>
        <Link
          href={`/vendor/products/${product?._id}`}
          className="px-5 py-1 bg-black text-sm rounded-md text-white "
        >
          Edit
        </Link>
      </div>
    );
  };
  
  const CategoryCard = ({ category }: { category: any }) => {
    return (
      <div className="flex flex-col items-start gap-5 w-full border border-slate-500 px-10 py-5">
        <h1 className="font-semibold text-lg">Category: {category?.category}</h1>
        <div className="flex flex-col items-start gap-5 w-full">
          {category &&
            category?.sub_categories &&
            category?.sub_categories?.map(
              (subCategory: any, subIndex: number) => category?.products![subIndex]!.length > 0 &&  (
                <div key={subIndex} className="flex flex-col items-start gap-3">
                  <h1 className="font-semibold text-md">
                    Sub-Category: {subCategory?.name}
                  </h1>
                  <div className="flex flex-row items-start justify-start flex-wrap gap-5">
                    {category?.products![subIndex]!.map(
                      (productData: any, index: number) => (
                        <>
                        {(productData.sub_category === subCategory?.name) && <ProductCard
                          product={productData && (productData.sub_category === subCategory?.name) && productData}
                          key={index}
                        />}
                        </>
                        
                      )
                    )}
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    );
  };

const page = () => {
  const [categoryName, setCategoryName] = useState("");
    const user = useUser(state => state.user)
    const [products, setProducts] = useState<any>([])
    const [filteredProducts,setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const productsData = await getProductsByVendor(user?._id!)
            console.log(productsData)
            setProducts(productsData)
            setFilteredProducts(productsData)
            setLoading(false)
        }
        fetchProducts()
    }, [user])
    useEffect(()=>{
      const filteredResults = products.filter((category:any)=>category?.category.toLowerCase().includes(categoryName.toLowerCase()))
      setFilteredProducts(filteredResults)
    },[categoryName,products])
  
  return (
    <div>
         <div className="flex flex-col items-start my-5 lg:px-10 gap-5 w-full">
      <h1 className="font-semibold text-4xl">All Products in Market</h1>
      <div className="flex flex-row items-center gap-2 flex-wrap w-full">
        <input
        value={categoryName}
        onChange={(e:any)=>setCategoryName(e.target.value)}
          type="text"
          placeholder="Search Category"
          className="border border-slate-200 p-2 rounded-md w-[60%]"
        />
        <Link
          href={"/vendor/products/add"}
          className="bg-black px-5 py-2 text-white border border-black hover:bg-white hover:text-black font-semibold text-sm lg:text-lg"
        >
          Add Product
        </Link>
      </div>
      <div className="bg-white flex flex-col w-full items-center rounded-lg gap-5 px-4 lg:px-10 py-5">
        {loading ? (
          <div className="flex flex-col items-center">
            <PuffLoader size={30} color="black" />
          </div>
        ) : (
          filteredProducts?.map((category: any, index: number) => (
            <CategoryCard category={category} key={index} />
          ))
        )}
      </div>
    </div>
    </div>
  )
}

export default page