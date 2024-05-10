"use client";
import { getProductById } from "@/utils/functions/getProductById";
import { useParams } from "next/navigation";
import parse from "html-react-parser";
import React, { useEffect, useMemo, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { IoMdCart } from "react-icons/io";
import { useCart } from "@/lib/store/cart";
import { ICart } from "@/lib/types/cart";
import { addToCart } from "@/utils/functions/addToCart";
import { useUser } from "@/lib/store/user";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import Link from "next/link";
import { PuffLoader } from "react-spinners";

const page = () => {
  const productId = useParams().product.toLocaleString();
  const [loading,setLoading] = useState(false);
  console.log(productId);
  const [product, setProduct] = useState<any>(null);
  const [productPercentage, setProductPercentage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const cart = useCart((state) => state.cart);
  useEffect(() => {
    const fetchProductById = async () => {
      setLoading(true)
      const data = await getProductById(productId);
      console.log(data);
      setProduct(data);
      setLoading(false)
    };
    fetchProductById();
  }, [productId]);
  useMemo(() => {
    if (product && product.mrp && product.price) {
      setProductPercentage(
        ((1 - product.price / product.mrp) * 100).toFixed(2)
      );
    }
  }, [product?.mrp, product?.price]);
  const setCart: any = useCart((state) => state.setCart);
  const user = useUser((state) => state.user);
  const handleAddToCart = async () => {
    const productDetails = {
      customer_id: user?._id,
      product_id: productId,
      name: product?.name,
        quantity: quantity,
        price: product?.price,
        mrp: product?.mrp,
        image: product?.image,
        description: product?.description,
        vendor_id: product?.vendor_id,

    }
    const cartDetails = {
      name: product?.name,
      description: product?.description,
      image: product?.image,
      price: product?.price,
      mrp: product?.mrp,
      quantity: quantity,
      product_id: productId,
      
      _id: "",
    }
    console.log(productDetails)
    const data: any = await addToCart(
      user?._id!,
      productDetails,
      "add"
    );
    setCart((prev: ICart[]) => [...prev, cartDetails])
    console.log(data);
  };

  return (
    <>
    <Navbar />
    {loading ? 
    <div className="flex flex-col items-center justify-center mx-auto bg-white min-h-[60vh]">
        <PuffLoader size={30} color="black" />
    </div>
    : <div className="flex flex-col lg:flex-row my-10  lg:w-[90%] items-start justify-center gap-2">
      <div className="w-full flex flex-row items-start gap-3 bg-white rounded-xl p-8 lg:w-[80%] 2xl:w-[60%]">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-80  object-cover rounded-xl"
        />
        <div className="w-full flex flex-col items-start gap-3">
          <h1 className="font-semibold text-xl">{product?.name}</h1>
          <h1 className=" text-lg font-bold tracking-wider">
          ₹{product?.mrp}{" "}
          </h1>
          <h1 className="font-semibold">
            <s>₹{product?.price}</s>{" "}
            <span className="ml-2 text-green-500">
              {productPercentage}% off
            </span>
          </h1>
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-semibold text-lg">Product Description :</h1>
            <h1 className="font-normal text-md">
              {product?.description && parse(product?.description)}
            </h1>
          </div>
          <div className="flex w-full flex-col items-start gap-2 border px-5 py-5 rounded-xl border-slate-400">
            <h1 className="font-semibold text-lg border-b border-slate-500 pb-1">
              About the Product :
            </h1>
            <h1 className="font-semibold text-md  pb-1">Features :</h1>
            <ul
              style={{ listStyleType: "circle" }}
              className="ml-2 flex flex-col items-start gap-1"
            >
              {product?.features &&
                product.features.map((feature: any, index: number) => {
                  return (
                    <li key={index} className="font-medium">
                      {feature}
                    </li>
                  );
                })}
            </ul>

            <h1 className="font-semibold text-md  pb-1">
              Product Specifications :
            </h1>
            <table className="table-auto border border-gray-300 rounded-xl">
              <tbody>
                {product?.specifications &&
                  product.specifications.map((spec: any, index: number) => {
                    return (
                      <tr key={index} className="border-b border-slate-500">
                        <td className="font-medium text-md text-center px-10 py-2 border border-gray-300">
                          {spec.feature}
                        </td>
                        <td className="font-medium text-md text-center px-10 py-2 border border-gray-300">
                          {spec.value}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <h1 className="font-semibold text-md  pb-1">Benefits :</h1>
            <ul
              style={{ listStyleType: "circle" }}
              className="ml-2 flex flex-col items-start gap-1"
            >
              {product?.benefits &&
                product.benefits.map((benefit: any, index: number) => {
                  return (
                    <li key={index} className="font-medium">
                      {benefit}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start px-8 py-3 gap-4 bg-white rounded-xl">
        <h1 className="text-black  font-bold tracking-wider text-2xl">
        ₹{Number(product?.price * quantity).toFixed(2)}
        </h1>
        <h1 className="text-slate-500  font-semibold tracking-wider text-md">
          <s>MRP ₹{Number(product?.mrp * quantity).toFixed(2)}</s>{" "}
          <span className="ml-2 text-green-500">{productPercentage}% off</span>
        </h1>
        <div className="flex flex-row items-center justify-between gap-3 w-full">
          <h1 className="text-black font-semibold text-md">Update Qty</h1>
          <div className="flex flex-row items-center gap-2">
            {quantity > 1 && <BiMinus
              onClick={() => setQuantity(quantity - 1)}
              className="text-2xl text-slate-500 bg-slate-200 rounded-xl"
              size={25}
            />}
            <h1 className="text-black font-semibold text-md border border-black px-4 rounded-xl py-1">
              {quantity}
            </h1>
            <BiPlus
              onClick={() => setQuantity(quantity + 1)}
              className="text-2xl text-slate-500 bg-slate-200 rounded-xl"
              size={25}
            />
          </div>
        </div>
        {quantity > 0 && (
          <>
            <button
              onClick={handleAddToCart}
              className="bg-sky-500 mx-auto rounded-xl flex flex-row text-center items-center gap-2 text-white px-10 py-2 font-semibold text-xl"
            >
              <IoMdCart size={25} className="text-white" />
              Add to Cart
            </button>
            <Link href={`/checkout/${productId}?quantity=${quantity}`} className="bg-red-600 mx-auto w-full text-center rounded-xl  text-white px-10 py-2 font-semibold text-xl">
              Checkout
            </Link>
          </>
        )}
      </div>
    </div>}
    <Footer />
    </>
    
  );
};

export default page;
