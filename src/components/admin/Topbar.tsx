import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiHome } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";

const Topbar = () => {
  return (
    <div className="flex flex-row items-center px-10 font-semibold tracking-wider py-2 justify-between bg-white border-b border-slate-400 sticky top-0">
      Admin Dashboard
      <Link href={"/"}>
        {" "}
        <GoHomeFill size={24} color="black" />
      </Link>
    </div>
  );
};

export default Topbar;
