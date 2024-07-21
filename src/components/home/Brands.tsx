"use client";
import { getBrands } from "@/utils/functions/getBrands";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
const BrandSubChip = ({ brand }: { brand: any }) => {
  console.log(brand);
  return (
    <div className=" rounded-full p-4">
      <img
        src={brand.image}
        alt={brand.name}
        className="rounded-full w-full h-full"
      />
    </div>
  );
};

export const responsive = {
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
    <Carousel responsive={responsive} className="flex h-full w-full space-x-10">
      {brands?.map((brand: any, index: number) => {
        return <BrandSubChip key={index} brand={brand} />;
      })}
    </Carousel>
  );
};

export default Brands;
