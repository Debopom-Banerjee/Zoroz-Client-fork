"use client";
import Navbar from "@/components/common/Navbar";
import Brands from "@/components/home/Brands";
import Details from "@/components/home/Details";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import SellingCategory from "@/components/home/SellingCategory";
import Socials from "@/components/home/Socials";
import { getProducts } from "@/utils/functions/getProducts";
import { getProductsByCategory } from "@/utils/functions/getProductsByCategory";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import ProductView from "@/components/products/ProductView";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 12,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 12,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};
const similarProducts = [
  {
    id: 1,
    image: "https://i.postimg.cc/QNktmBST/banner5.jpg",
  },
  {
    id: 2,
    image: "https://i.postimg.cc/QNktmBST/banner5.jpg",
  },
  {
    id: 3,
    image: "https://i.postimg.cc/QNktmBST/banner5.jpg",
  },
  {
    id: 4,
    image: "https://i.postimg.cc/QNktmBST/banner5.jpg",
  },
  {
    id: 5,
    image: "https://i.postimg.cc/QNktmBST/banner5.jpg",
  },
  {
    id: 6,
    image: "https://i.postimg.cc/QNktmBST/banner5.jpg",
  },
  {
    id: 7,
    image: "https://i.postimg.cc/QNktmBST/banner5.jpg",
  },
  {
    id: 8,
    image: "https://i.postimg.cc/QNktmBST/banner5.jpg",
  },
  {
    id: 9,
    image: "https://i.postimg.cc/QNktmBST/banner5.jpg",
  },
  {
    id: 10,
    image: "https://i.postimg.cc/QNktmBST/banner5.jpg",
  },
];

const referralCardImages = [
  "https://i.postimg.cc/QNktmBST/banner5.jpg",
  "https://i.postimg.cc/yxP885WP/banner6.jpg",
  "https://i.postimg.cc/bNyvBzFF/banner7.jpg",
];

const ReferralCards = ({ image }: { image: string }) => {
  return (
    <div className="w-full h-full flex flex-row items-center gap-6">
      <Image width={500} height={100} src={image} alt="chair" />
    </div>
  );
};

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
      <main className="w-[90%] mx-auto h-full gap-10 mb-20 max-md:mb-28  flex flex-col items-center justify-center max-md:gap-20">
        <Hero />

        <div className="w-full lg:px-10 h-full py-2 ">
          <h1 className="font-semibold text-2xl my-2 ">New Arrivals</h1>
          <Carousel
            responsive={responsive}
            className="flex h-full w-full space-x-10"
          >
            {similarProducts?.map((product: any, index: number) => {
              console.log(product);
              return (
                <ProductView
                  product={product}
                  key={index}
                  width="200px"
                  height="400px"
                />
              );
            })}
          </Carousel>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center h-full justify-between">
          {referralCardImages?.map((image: string, index: number) => {
            return (
              <div key={index} className="rounded-lg shadow-md">
                <ReferralCards image={image} />
              </div>
            );
          })}
        </div>

        <div className="w-full flex flex-col items-center gap-5">
          {loading ? (
            <PuffLoader size={20} color="#000" />
          ) : (
            productDetails?.map((product: any, index: number) => {
              return <SellingCategory product={product} />;
            })
          )}
        </div>
        <Brands />
        <Socials />
        <Details />
      </main>
      <Footer />
    </>
  );
}
