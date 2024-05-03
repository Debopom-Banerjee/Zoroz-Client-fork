"use client";
import { useUser } from "@/lib/store/user";
import { Avatar } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { FaProductHunt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import { MdBrandingWatermark, MdCategory, MdDashboard } from "react-icons/md";
import { RiProductHuntLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";

const sideBarRoutes = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <MdDashboard size={24} />,
  },
  {
    title: "Add Product",
    path: "/admin/products/add",
    icon: <FaProductHunt size={24} />,
  },
  {
    title: "Add Multiple Products",
    path: "/admin/products/add-multiple",
    icon: <RiProductHuntLine size={24} />,
  },
  {
    title: "Add Category",
    path: "/admin/categories",
    icon: <MdCategory size={24} />,
  },
  {
    title: "Add Brands",
    path: "/admin/brands",
    icon: <MdBrandingWatermark size={24} />,
  },
  {
    title: "Edit Products",
    path: "/admin/products/manage",
    icon: <FaProductHunt size={24} />,
  },
  {
    title: "Vendor Management",
    path: "/admin/vendors",
    icon: <IoPerson size={24} />,
  },
  {
    title: "Orders",
    path: "/admin/orders",
    icon: <FiShoppingCart size={24} />,
  },
];

const SideTab = ({
  text,
  link,
  icon,
  onClick,
}: {
  text: string;
  link: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Link
      onClick={onClick}
      href={link}
      className="text-white flex flex-row items-center mx-auto pl-4 gap-3 text-center py-2 cursor-pointer hover:bg-slate-500 w-full"
    >
      {icon}
      {text}
    </Link>
  );
};

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div
        className={`${
          isMenuOpen ? "hidden" : "flex"
        } absolute top-0 z-[120] left-0  border-b border-slate-400 bg-white py-3  flex justify-center  w-10 cursor-pointer flex-col items-center  gap-[6px]
             md:hidden
            `}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span
          className={`block h-[2px] w-7 bg-black transition-all duration-500
              ${isMenuOpen ? "translate-y-2 rotate-45" : ""}
              `}
        ></span>
        <span
          className={`block h-[2px] w-7 bg-black transition-all duration-500
              ${isMenuOpen ? "translate-x-44 " : "translate-x-0"}
              `}
        ></span>
        <span
          className={`block h-[2px] w-7 bg-black transition-all duration-500
              ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}
              `}
        ></span>
      </div>
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        }  md:flex absolute z-[100]   md:sticky top-0 left-0 h-screen  bg-gray-700 text-white   flex-col w-[50%] md:w-[25%]  lg:w-[20%]  items-center  gap-10  border-r-2 border-black`}
      >
        <div className="flex relative w-full h-full flex-col items-center py-4  mx-auto gap-2 ">
          <div className="flex relative w-full justify-center mx-auto flex-row items-center gap-2 my-2">
            <div
              onClick={() => setIsMenuOpen(false)}
              className="absolute   left-2 w-fit md:hidden"
            >
              X
            </div>
            <IoPerson size={24} />
            <h1 className="font-semibold text-lg">Admin</h1>
          </div>
          {sideBarRoutes.map((route, index) => {
            return (
              <SideTab
                onClick={() => setIsMenuOpen(false)}
                key={index}
                text={route.title}
                link={route.path}
                icon={route.icon}
              />
            );
          })}
          <button className="flex absolute bottom-20 hover:bg-slate-500 w-full mx-auto justify-center py-2  flex-row items-center gap-2">
            <TbLogout size={24} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
