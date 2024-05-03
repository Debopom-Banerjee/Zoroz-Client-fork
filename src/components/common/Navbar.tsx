"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaBook, FaSearch } from "react-icons/fa";
import { IoMdCart, IoMdHome } from "react-icons/io";
import { IoPerson, IoSearchOutline } from "react-icons/io5";
import { RiGpsFill } from "react-icons/ri";
import AuthModal from "./AuthModal";
import Image from "next/image";
import { useUser } from "@/lib/store/user";
import { handleLogout } from "@/utils/functions/handleLogout";
import { useCart } from "@/lib/store/cart";

const LowerDrawer = () => {
  return (
    <div className="w-full pt-2 pb-1 border border-r-slate-400 border-black rounded-t-xl flex flex-row items-center justify-evenly">
      <Link
        href={"/"}
        className="text-gray-700 flex flex-col  items-center hover:bg-slate-200 rounded-xl"
      >
        <IoMdHome size={25} />
        <h1 className="text-xs">Home</h1>
      </Link>
      <Link
        href={"/"}
        className="text-gray-700  flex flex-col  items-center hover:bg-slate-200 rounded-xl"
      >
        <IoPerson size={25} />
        <h1 className="text-xs">Login</h1>
      </Link>
      <Link
        href={"/"}
        className="text-gray-700 flex flex-col border border-black p-3 rounded-full items-center hover:bg-slate-200"
      >
        <IoSearchOutline size={25} />
      </Link>
      <Link
        href={"/"}
        className="text-gray-700 flex flex-col  items-center hover:bg-slate-200 rounded-xl"
      >
        <FaBook size={25} />
        <h1 className="text-xs">Orders</h1>
      </Link>
      <Link
        href={"/"}
        className="text-gray-700 flex flex-col  items-center hover:bg-slate-200 rounded-xl"
      >
        <IoMdCart size={25} />
        <h1 className="text-xs">My Cart</h1>
      </Link>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const user = useUser((state) => state.user);
  const cart:any = useCart((state) => state.cart);
  // console.log(cart)
  
  const setUser = useUser((state) => state.setUser);
  const logout = async () => {
    try {
      handleLogout();
      setUser(undefined);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative w-full">
      <div className="w-full sticky top-0 border border-slate-400   flex flex-row  items-center justify-between px-2 md:justify-center md:gap-20 py-3">
        <div className="flex flex-row items-center gap-3">
          <div
            className="flex h-full w-8 cursor-pointer flex-col items-center justify-center gap-[6px]
             md:hidden
            "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`block h-[2px] w-6 bg-black transition-all duration-500
              ${isMenuOpen ? "translate-y-2 rotate-45" : ""}
              `}
            ></span>
            <span
              className={`block h-[2px] w-6 bg-black transition-all duration-500
              ${isMenuOpen ? "bg-white -translate-x-96 " : "translate-x-0"}
              `}
            ></span>
            <span
              className={`block h-[2px] w-6 bg-black transition-all duration-500
              ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}
              `}
            ></span>
          </div>
          <Link
            href={"/"}
            className="font-bold tracking-wide text-2xl  text-red-500 border rounded-xl"
          >
            <Image src={"/assets/logo.jpg"} height={40} width={180} alt="" />
          </Link>
        </div>

        <div className="w-[40%] hidden md:flex flex-row items-center relative  ">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full p-2 border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <div className="bg-red-500 h-full absolute rounded-tr-md cursor-pointer hover:bg-opacity-80 rounded-br-md right-0 top-0 w-10 mx-auto ">
            <FaSearch size={25} className="text-white w-full h-full p-2 " />
          </div>
        </div>

        <div className="flex flex-row items-center md:gap-3">
          <button
            onClick={() => {
              user ? logout() : setAuthOpen(true);
            }}
            className="text-white md:hidden px-2 text-sm py-1 rounded-xl font-semibold bg-red-600"
          >
            {user ? "Logout" : "Login"}
          </button>
          <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />
         { <div
            onClick={() => {
              user ? logout() : setAuthOpen(true);
            }}
            className="hidden md:flex flex-row items-center justify-center cursor-pointer hover:bg-slate-200 p-2 px-5 rounded-xl gap-2"
          >
            <IoPerson size={25} className="text-slate-600" />
            <p className="text-slate-600 ">{user ?  "Logout" : "Login Now"}</p>
          </div>}
          <div className="hidden md:flex flex-row items-center justify-center cursor-pointer hover:bg-slate-200 p-2 px-5 rounded-xl gap-2">
            <RiGpsFill size={25} className="text-slate-600" />
            <p className="text-slate-600">Track Order</p>
          </div>
          <Link href={"/cart"} className="hidden md:flex flex-row items-center justify-center cursor-pointer hover:bg-slate-200 p-2 px-5 rounded-xl gap-2">
            <IoMdCart size={25} className="text-slate-600" />
            <p className="text-slate-600">Cart {cart && cart?.cart?.length}</p>
          </Link>
          <div className="hidden md:block cursor-pointer hover:bg-slate-200 p-2  rounded-xl">
            <BsThreeDotsVertical size={25} className="text-slate-600   " />
          </div>
        </div>
        <div className="fixed md:hidden bg-white z-[100] left-0 bottom-0 w-full">
          <LowerDrawer />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
