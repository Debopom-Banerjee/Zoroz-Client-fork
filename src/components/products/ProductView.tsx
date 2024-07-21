import Link from "next/link";
import React from "react";
import { IoMdCart } from "react-icons/io";

const ProductView = ({ product,width="200px",height }: { product: any,width?:string,height?:string }) => {
  const percentageOff = ((1 - product.price / product.mrp) * 100).toFixed(2);
  return (
    <div className={`flex flex-col self-center bg-white border h-[${height ? height : "400px"}] w-[${width}] rounded-xl p-5 gap-2 items-start justify-center`}>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-xl"
      />
      <div className="flex flex-col items-start">
        <Link
          href={`/products/${product.category}/${product._id}`}
          className="font-normal text-sm hover:text-blue-500 cursor-pointer"
        >
          {product.name}
        </Link>
        <h1 className="font-semibold text-sm">
          ₹{product.mrp}{" "}
          <span className="ml-2">
            <s>₹{product.price}</s>
          </span>
          <span className="ml-2 text-green-500">{percentageOff}% off</span>
        </h1>
      </div>

      <div className="flex flex-row mt-3 w-full mx-auto justify-center items-center flex-wrap gap-5">
        <button className="bg-white p-2 rounded-xl border border-black ">
          <IoMdCart size={20} color="black" />
        </button>

        <Link
          href={"/checkout"}
          className="bg-black text-white font-semibold px-3 py-2 hover:bg-white hover:text-black hover:border hover:border-black border border-black rounded-xl"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default ProductView;
