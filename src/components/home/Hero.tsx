"use client";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import CarouselSection from "./CarouselSection";
import Link from "next/link";
const SideChip = () => {
  return (
    <Link href={"/"} className="flex flex-row items-center gap-2">
      <Image src="/assets/home/chair.jpg" width={40} height={40} alt="chair" />
      <h1 className="text-sm">Office Stationery & Supplies</h1>
    </Link>
  );
};

const MobileChip = () => {
  return (
    <div className="flex flex-col items-center px-5 pb-3 bg-gray-300 rounded-xl">
      <Image src="/assets/home/chair.jpg" width={40} height={40} alt="chair" />
      <h1 className="text-sm">Office Stationery & Supplies</h1>
    </div>
  );
};

const ReferralCards = () => {
  return (
    <div className="w-full h-full flex flex-row items-center gap-2">
      <Image
        width={96}
        height={100}
        src="https://cdn.moglix.com/cms/flyout/Images_2024-04-05_17-20-42_Gold_pwa-waxpol.png"
        className="w-full md:h-36"
        alt="chair"
      />
    </div>
  );
};

const Hero = () => {
  return (
    <div className="w-full flex flex-col md:flex-row  items-start justify-center gap-5 my-5 ">
      <div className="hidden md:flex flex-col h-full items-start gap-5 w-auto pl-3 pr-16 py-5  bg-white rounded-xl">
        <SideChip />
        <SideChip />
        <SideChip />
        <SideChip />
        <SideChip />
        <SideChip />
        <SideChip />
        <SideChip />
        <SideChip />
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/assets/home/chair.jpg"
            width={40}
            height={40}
            alt="chair"
          />
          <h1 className="text-red-500 text-sm">View All Categories</h1>
        </div>
      </div>

      <div className="w-full lg:w-4/5  flex flex-col justify-center gap-2  mt-0">
        <div>
          <CarouselSection />
        </div>
        <div className="flex flex-col md:flex-row gap-1 items-center  h-full justify-between">
          <ReferralCards />
          <ReferralCards />
          <ReferralCards />
        </div>
        
      </div>
      <div className="flex md:hidden flex-col items-start gap-4">
        <h1 className="text-start font-semibold text-xl">
          Trending Categories
        </h1>
        <div className="grid grid-cols-3 gap-2 ">
          <MobileChip />
          <MobileChip />
          <MobileChip />
          <MobileChip />
          <MobileChip />
          <MobileChip />
          <MobileChip />
          <MobileChip />
          <MobileChip />
        </div>
      </div>
    </div>
  );
};

export default Hero;
