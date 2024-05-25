"use client";
import { getCategories } from "@/utils/functions/getCategories";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";

const footerBlocks = [
  {
    image: "/assets/home/great-value-icon.svg",
    title: "Great Value",
    description:
      "Most popular brands with widest range of selection at best prices.",
  },
  {
    image: "/assets/home/delivery-icon.svg",
    title: "Nation-wide Delivery",
    description: "Over 20,000 pincodes serviceable across India.",
  },
  {
    image: "/assets/home/secure-payment-icon.svg",
    title: "Secure Payment",
    description:
      "Partnered with India's most popular and secure payment solutions.",
  },
  {
    image: "/assets/home/buyer-protection-icon.svg",
    title: "Protection for Buyers",
    description:
      "Committed to buyer interests to provide a smooth shopping experience.",
  },
  {
    image: "/assets/home/helpdesk-icon.svg",
    title: "Help & Support",
    description: (
      <div className="w-full flex flex-col items-start gap-2">
        <Link href="tel : +91 9311796739">+91 9311796739</Link>
        <Link href="mailto :connect@zoroz.in">connect@zoroz.in</Link>
      </div>
    ),
  },
];

const footerQuickLinks = [
    {
        title:"Products",
        quickLinks:[
            
           {
                title:"Mobile Accessories",
                link:"/products/Mobile%20Accessories/subCategories"
            },
            {
                title:"Mobile Spare Parts",
                link:"/products/Mobile%20Spare%20Parts/subCategories"
            },
            {
                title:"Mobile Tool Kits",
                link:"/products/Mobile%20Tool%20Kits/subCategories"
            },
            {
                title:"Solar & Lighting",
                link:"/products/Solar%20&%20Lighting/subCategories"
            },
            {
                title:"View All Brands",
                link:"/products/brands"
            },
        ]
    },
    {
        title:"Know About Us",
        quickLinks:[
            {
                title:"About Us",
                link:"/about-us/"
            },
            {
                title:"Privacy Policy",
                link:"/privacy-policy/"
            },
            {
                title:"Terms and Conditions",
                link:"/terms-and-conditions"
            },
            {
                title:"Refund & Return Policy",
                link:"/refund-and-returns-policy"
            },
            {
                title:"Ship Delivery Policy",
                link:"/ship-delivery-policy"
            },
        ]
    },
    
]

const FeatureChip = ({ block }: { block: any }) => {
  return (
    <div className="flex flex-col items-start gap-2 text-xs w-[200px] border-r border-slate-500 last:border-0 px-3">
      <Image src={block.image} width={80} height={80} alt="" />
      <h1 className=" font-semibold">{block.title}</h1>
      {typeof block?.description === "string" ? (
        <h1>{block?.description}</h1>
      ) : (
        block?.description
      )}
    </div>
  );
};



const ListChip = ({list,title}:{list:any,title:string}) => {
  return (
    <div className="flex flex-col items-start gap-2 justify-center">
      <h1 className="font-semibold text-lg">{title}</h1>
      <ul className="flex flex-col text-sm items-start gap-2">
        {
            list?.quickLinks?.map((quick:any,index:number)=>{
                return(
                        <Link href={quick?.link ? quick?.link : ''} key={index} className="hover:text-red-600">{quick?.title}</Link>
                )
            })
        }
      </ul>
    </div>
  );
};

const FootChip = ({ title, link }: { title?: string; link?: string }) => {
  return (
    <Link href={link!} className="border-r text-xs pr-2 border-slate-500 last:border-0">
      {title}
    </Link>
  );
};

const Foot = () => {
  return (
    <div className="flex flex-row items-center  py-2 justify-between bg-[#efeff4] w-full px-10">
      <div className="flex flex-row items-center gap-2">
        <FootChip title="Terms of Use" link="/terms-and-conditions" />
        <FootChip title="Copyright" link="/terms-of" />
        <FootChip title="Privacy Policy" link="/privacy-policy" />
        <FootChip title="Compliance" link="/terms-of-use" />
      </div>
      <h1 className="text-sm">
        Zoroz India Private Limited © 2024 Zoroz.com All Rights Reserved
      </h1>
    </div>
  );
};

const Footer = () => {
   
  return (
    <div className="hidden md:flex bg-white mt-10 pt-10 flex-col w-full mx-auto justify-center items-center gap-5 ">
      <div className="flex flex-row justify-evenly w-full mx-auto items-center gap-4 pb-10 border-b border-slate-500">
        {footerBlocks?.map((block: any, index: number) => {
          return <FeatureChip block={block} key={index} />;
        })}
      </div>
      <div className="flex flex-row justify-evenly w-full mx-auto items-start gap-4 pb-10 border-b border-slate-500">
        <div className="flex flex-col items-center gap-10 w-40">
          <Image src={"/assets/logo.jpg"} width={400} height={100} alt="" />
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-semibold text-sm">Address</h1>
            <p className="text-xs">
              No.-289, Level 01, Tower A, Building 10, DLF Phase 2, Gurugram,
              Haryana -122018 Email:connect@zoroz.in Phone:+91 9311796739 Office
              Time - 9:00AM - 7:00PM (Monday-Friday)
            </p>
          </div>
        </div>
      
       {
        footerQuickLinks?.map((quickLink:any,index:number)=>{
            return(
                <ListChip key={index} list={quickLink} title={quickLink?.title} />
            )
        })
       }
       
        <div className="flex flex-col items-center gap-10 w-40">
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-semibold text-lg">Get In Touch</h1>
            <Link href={'tel: +91 9311796739'} className="hover:text-red-600">+91 9311796739</Link>
            <Link href={'mailto: connect@zoroz.in'} className="hover:text-red-600">connect@zoroz.in</Link>
          </div>
        </div>
      
      </div>
      <div className="flex flex-row items-center justify-between w-[90%]">
        {/* <div className="flex flex-row items-center gap-2 justify-center">
          <Image
            src={"/assets/home/app_store-img.png"}
            width={100}
            height={40}
            alt=""
          />
          <Image
            src={"/assets/home/play_store-img.png"}
            width={100}
            height={40}
            alt=""
          />
        </div> */}

        <div className="flex flex-col items-center">
          <h1 className="text-blue-500 flex flex-row items-center gap-1">
            <IoMailSharp />
            <Link href={'mailto: connect@zoroz.in'} className="hover:text-red-600">connect@zoroz.in</Link>
          </h1>
          <h1>In case of any concern, mail us</h1>
        </div>

        <div className="flex flex-col items-center gap-3">
          <h1>Stay Connected</h1>
          <div className="flex flex-row items-center gap-3 justify-center">
            <FaFacebook color="#1877F2" size={30} />
            <FaLinkedin color="#0077b5" size={30} />
            <RiTwitterXLine color="#000" size={30} />
            <FaYoutube color="	#FF0000" size={30} />
            <FaInstagram color="#FCAF45" size={30} />
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
};

export default Footer;
