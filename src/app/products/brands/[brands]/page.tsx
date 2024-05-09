"use client";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import ProductView from "@/components/products/ProductView";
import { getProductsByBrand } from "@/utils/functions/getProductsByBand";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const page = () => {

  const [productData, setProductData] = useState<any>([]);
  const brand = useParams().brands.toLocaleString();
  console.log(brand);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsByBrand(brand);
      console.log(data)
      setProductData(data);

      setLoading(false)
    };
    fetchProducts();
  }, [brand]);
  return (
    <>
    <Navbar />
    <div className="w-full mx-auto my-10">
      <div className="flex flex-col bg-white items-start gap-5 mx-auto justify-center rounded-xl w-full px-5 py-5 lg:w-4/5 ">
        <h1 className="font-semibold text-2xl">{brand}</h1>
        <div className="flex flex-row flex-wrap gap-5 md:gap-10 lg:gap-20 items-center self-center justify-center mx-auto w-full">
          {loading ? 

          <div className="min-h-[80vh] flex flex-col items-center justify-center ">
   <PuffLoader size={35} color="black" />
          </div>
       
          : productData.map((product: any, index: number) => {
            return <ProductView product={product} key={index} />;
          })}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default page;
