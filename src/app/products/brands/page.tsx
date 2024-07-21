"use client";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import { BrandCard } from "@/components/products/BrandCard";
import { getBrands } from "@/utils/functions/getBrands";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const page = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      const data = await getBrands();
      console.log(data);
      setBrands(data);
      setLoading(false);
    };
    fetchBrands();
  }, []);
  return (
    <>
      <Navbar />

      <div className="flex flex-col items-start gap-5 w-full min-h-[60vh] lg:w-[70%] mx-auto my-10">
        <h1 className="font-semibold text-2xl">All Brands</h1>
        <div className="flex flex-row w-full flex-wrap gap-10 items-center">
          {loading ? (
            <div className="flex flex-col min-h-[60vh] w-full mx-auto justify-center items-center">
              <PuffLoader size={30} color="black" />
            </div>
          ) : (
            brands?.map((brand: any, index: number) => {
              return (
                <div key={index}>
                  <BrandCard brand={brand} />
                </div>
              );
            })
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
