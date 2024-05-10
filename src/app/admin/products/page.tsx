"use client"
import { getProducts } from "@/utils/functions/getProducts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="flex flex-col items-center w-[300px] bg-slate-200 p-5 gap-4 rounded-md">
      <img src={product?.image} alt="" />
      <h1 className="font-semibold text-md">{product.name}</h1>
      <h1 className="text-sm">Stock : <span className="font-semibold">{product?.stock_count}</span></h1>
      <h1 className="text-sm">Brand : <span className="font-semibold">{product?.brand}</span></h1>
      <h1 className="font-semibold text-sm">
      ₹{product?.price} <s className="text-red-500">₹{product?.mrp}</s>
      </h1>
      <Link
        href={`/products/${product?.category}/${product?._id}`}
        className="px-5 py-1 bg-black text-sm rounded-md text-white "
      >
        View More
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
            (subCategory: any, subIndex: number) => (
              <div key={subIndex} className="flex flex-col items-start gap-3">
                <h1 className="font-semibold text-md">
                  Sub-Category: {subCategory?.name}
                </h1>
                <div className="flex flex-row items-start justify-start flex-wrap gap-5">
                  {category?.products?.map(
                    (productData: any, index: number) => (
                      <>
                      {(productData[0].sub_category === subCategory?.name) && <ProductCard
                        product={productData && (productData[0].sub_category === subCategory?.name) && productData[0]}
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

const ManageProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-start my-5 px-10 gap-5 w-full">
      <h1 className="font-semibold text-4xl">Manage Products</h1>
      <div className="flex flex-row items-center gap-2 flex-wrap w-full">
        <input
          type="text"
          placeholder="Search Category"
          className="border border-slate-200 p-2 rounded-md w-[60%]"
        />
        <Link
          href={"/admin/products/add"}
          className="bg-black px-5 py-2 text-white border border-black hover:bg-white hover:text-black font-semibold text-sm lg:text-lg"
        >
          Add Product
        </Link>
      </div>
      <div className="bg-white flex flex-col w-full items-center rounded-lg gap-5  px-10 py-5">
        {loading ? (
          <div className="flex flex-col items-center">
            <PuffLoader size={30} color="black" />
          </div>
        ) : (
          products?.map((category: any, index: number) => (
            <CategoryCard category={category} key={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProductsPage;
