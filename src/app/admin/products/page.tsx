"use client";
import { getProducts } from "@/utils/functions/getProducts";
import { getProductsForAdminAll } from "@/utils/functions/getProductsForAdminAll";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="flex flex-col items-center w-[250px] bg-slate-200 p-5 gap-4 rounded-md">
      <img src={product?.image} alt="" />
      <h1 className="font-semibold text-md">{product.name}</h1>
      <h1 className="text-sm">
        Stock : <span className="font-semibold">{product?.stock_count}</span>
      </h1>
      <h1 className="text-sm">
        Brand : <span className="font-semibold">{product?.brand}</span>
      </h1>
      <h1 className="font-semibold text-sm">
        ₹{product?.mrp} <s className="text-red-500">₹{product?.price}</s>
      </h1>
      <Link
        href={`/products/${product?.category}/${product?._id}`}
        className="px-5 py-1 bg-black text-sm rounded-md text-white "
      >
        View More
      </Link>
      <Link
        href={`/admin/products/${product?._id}`}
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
      <div className="flex flex-row items-center justify-between flex-wrap w-full">
        <h1 className="font-semibold text-lg">
          Category: {category?.category}
        </h1>
        {/* <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Search Products"
          className="border border-slate-200 p-2 rounded-md w-[60%]"
        /> */}
      </div>

      <div className="flex flex-col items-start gap-5 w-full">
        {category &&
          category?.sub_categories &&
          category?.sub_categories?.map(
            (subCategory: any, subIndex: number) =>
              category?.products![subIndex]!.length > 0 && (
                <div key={subIndex} className="flex flex-col items-start gap-3">
                  <h1 className="font-semibold text-md">
                    Sub-Category: {subCategory?.name}
                  </h1>
                  <div className="flex flex-row items-start justify-start flex-wrap gap-5">
                    {category?.products![subIndex]!.map(
                      (productData: any, index: number) => (
                        <>
                          {productData.sub_category === subCategory?.name && (
                            <ProductCard
                              product={
                                productData &&
                                productData.sub_category ===
                                  subCategory?.name &&
                                productData
                              }
                              key={index}
                            />
                          )}
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
  const [productSearch, setProductSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProductsForAdminAll();
      console.log(data);
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredResults = products?.filter((product: any) =>
      product?.category.toLowerCase().includes(productSearch.toLowerCase())
    );
    setFilteredProducts(filteredResults);
  }, [productSearch, products]);

  return (
    <div className="flex flex-col items-start my-5 lg:px-10 gap-5 w-full">
      <h1 className="font-semibold text-4xl">Manage Products</h1>
      <div className="flex flex-row items-center gap-2 flex-wrap w-full">
        <input
          type="text"
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
          placeholder="Search Category"
          className="border border-slate-200 p-2 rounded-md w-[60%]"
        />
        <Link
          href={"/admin/products/add"}
          className="bg-black px-5 py-2 text-white border border-black hover:bg-white hover:text-black font-semibold text-sm lg:text-lg"
        >
          Search Product
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
  );
};

export default ManageProductsPage;
