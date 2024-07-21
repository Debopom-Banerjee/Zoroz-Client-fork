"use client";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import CarouselSection from "./CarouselSection";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCategories } from "@/utils/functions/getCategories";
import { getBrands } from "@/utils/functions/getBrands";
import { BiSolidCategory } from "react-icons/bi";
import Brands from "./Brands";

const referralCardImages = [
  "https://i.postimg.cc/QNktmBST/banner5.jpg",
  "https://i.postimg.cc/yxP885WP/banner6.jpg",
  "https://i.postimg.cc/bNyvBzFF/banner7.jpg",
];

const SideChip = ({
  category,
  image,
  linkPrefix,
  linkSuffix,
}: {
  category: any;
  image?: string | React.ReactNode;
  linkPrefix?: string;
  linkSuffix?: string;
}) => {
  return (
    <Link
      href={`/products${linkPrefix && linkPrefix}/${category}${
        linkSuffix && linkSuffix
      }`}
      className="flex font-normal hover:text-red-500 text-black duration-300 flex-row items-center gap-2"
    >
      {typeof image === "string" ? (
        image && <img src={image} alt="" className="w-7" />
      ) : (
        <BiSolidCategory color="#F44336" size={12} />
      )}

      <h1 className="text-sm">{category}</h1>
    </Link>
  );
};

const MobileChip = ({ category }: { category: any }) => {
  return (
    <Link
      href={`/products/${category}`}
      className="flex flex-row items-center font-semibold  px-5 py-3 bg-gray-300 rounded-xl"
    >
      <h1 className="text-sm">{category}</h1>
    </Link>
  );
};

const ReferralCards = ({ image }: { image: string }) => {
  return (
    <div className="w-full h-full flex flex-row items-center gap-2">
      <Image width={500} height={100} src={image} alt="chair" />
    </div>
  );
};

const Hero = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      const data = await getBrands();
      console.log(res);
      setCategories(res.map((category: any) => category.name));
      setBrands(data);
      console.log(data);
    };
    fetchCategories();
  }, []);
  return (
    <div className="w-full flex flex-col md:flex-row  items-start justify-center gap-5 my-5 ">
      <div className="hidden md:flex flex-col h-full items-start gap-3 w-auto pl-3 pr-16 py-2 pb-4  bg-white rounded-xl">
        <h1 className="font-semibold text-md">Categories</h1>
        {categories?.map((category: any) => {
          return (
            <SideChip
              category={category}
              linkPrefix=""
              linkSuffix="/subCategories"
            />
          );
        })}
        <h1 className="font-semibold text-md">Brands</h1>
        {brands?.slice(0, 6).map((brand: any, index: number) => {
          return (
            <SideChip
              key={index}
              category={brand.name}
              image={brand.image}
              linkPrefix={"/brands"}
              linkSuffix=""
            />
          );
        })}
        <Link
          href={"/products/brands"}
          className="font-semibold hover:text-red-500 text-black duration-300 cursor-pointer text-sm"
        >
          View All Brands
        </Link>
      </div>

      <div className="w-full lg:w-4/5  flex flex-col justify-center gap-2  mt-0">
        <div>
          <CarouselSection />
        </div>
        <div className="flex flex-col md:flex-row gap-1 items-center  h-full justify-between">
          {referralCardImages?.map((image: string, index: number) => {
            return <ReferralCards image={image} />;
          })}
        </div>
      </div>
      <div className="flex md:hidden flex-col items-start gap-4">
        <h1 className="text-start font-semibold text-xl">
          Trending Categories
        </h1>
        <div className="grid grid-cols-3 gap-2 ">
          {categories.map((category: any, index: number) => {
            return <MobileChip key={index} category={category} />;
          })}
        </div>
      </div>
      
    </div>
  );
};

export default Hero;
