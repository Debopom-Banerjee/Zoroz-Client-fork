"use client";
import Navbar from "@/components/common/Navbar";
import Brands from "@/components/home/Brands";
import Details from "@/components/home/Details";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import SellingCategory from "@/components/home/SellingCategory";
import Socials from "@/components/home/Socials";
import { getProducts } from "@/utils/functions/getProducts";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [productDetails, setProductDetails] = useState<any>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      console.log(data);
      setProductDetails(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <Navbar />
      <main className="w-[100%] mx-auto h-full gap-10 mb-20 max-md:mb-28  flex flex-col items-center justify-center max-md:gap-20">
        <Hero />
        <Brands />
        <div className="w-full flex flex-col items-center gap-5">
          {loading ? (
            <PuffLoader size={20} color="#000" />
          ) : (
            productDetails?.map((product: any, index: number) => {
              return <SellingCategory product={product} />;
            })
          )}
        </div>
        <Socials />
        <Details />
      </main>
      <Footer />
    </>
  );
}
