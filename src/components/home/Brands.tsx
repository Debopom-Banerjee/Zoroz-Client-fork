"use client";
import { getBrands } from "@/utils/functions/getBrands";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
const BrandSubChip = ({ brand }: { brand: any }) => {
  console.log(brand);
  return (
    <Link href={`/products/brands/${brand?.name}`} className=" rounded-full p-4 z-[-100]">
      <img
        src={brand.image}
        alt={brand.name}
        className="rounded-full w-28 h-28 lg:w-48 lg:h-48"
      />
    </Link>
  );
};

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};
const Brands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getBrands();
      setBrands(data);
    };
    fetchBrands();
  }, []);
  return (
<Carousel responsive={responsive} className="flex w-[90%] h-full relative z-0  space-x-5 lg:space-x-10">
      {brands?.map((brand: any, index: number) => {
        return <BrandSubChip key={index} brand={brand} />;
      })}
    </Carousel>
   
  );
};

export default Brands;
