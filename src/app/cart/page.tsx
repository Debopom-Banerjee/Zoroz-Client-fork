"use client";
import CartItem from "@/components/cart/CartItem";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import { useCart } from "@/lib/store/cart";
import { useUser } from "@/lib/store/user";
import { fetchCart } from "@/utils/functions/fetchCart";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const Page = () => {
  const user = useUser((state) => state.user);
  const [cartData, setCartData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalGST, setTotalGST] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const getDatafromCart = async () => {
      const data = await fetchCart(user?._id!);
      if (data?.cart) {
        setCartData(data.cart);
       
      }
    };
    if (user?._id) {
      getDatafromCart();
    }
  }, [user?._id]);

  useEffect(() => {
    const calculatedTotalAmount = cartData.reduce(
      (acc: any, item: any) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(calculatedTotalAmount.toFixed(2));

    // Calculate total GST (10% of total amount)
    const calculatedTotalGST: number = Number(
      (calculatedTotalAmount * 0.1).toFixed(2)
    );
    setTotalGST(calculatedTotalGST);

    // Calculate total payment (total amount + total GST)
    const calculatedTotal = calculatedTotalAmount + calculatedTotalGST;
    setTotal(calculatedTotal.toFixed(2));

    setLoading(false);
  }, [cartData]);

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh]">
        {loading ? (
          <div className="flex items-center flex-col my-20 h-full justify-center">
            <PuffLoader color="#000" size={30} />
          </div>
        ) : (
          <div className="flex flex-col-reverse my-10 lg:flex-row items-center gap-5 lg:items-start justify-center mx-auto w-full">
            <div className="bg-white w-full flex flex-col items-center gap-3 lg:w-[40%] rounded-xl p-4">
              <h1 className="font-semibold text-xl">Cart Details</h1>
              {cartData && cartData.length > 0 ? (
                cartData.map((product: any) => (
                  <CartItem
                    key={product.product_id}
                    product={product}
                    setCartData={setCartData}
                  />
                ))
              ) : (
                <h1 className="text-lg font-semibold">No items in cart</h1>
              )}
            </div>
            <div className="bg-white rounded-xl p-4 flex flex-col items-center gap-8">
              <h1 className="text-xl font-semibold">Cart Summary</h1>
              <div className="flex flex-row w-full justify-between items-center gap-10">
                <h1 className="text-md font-semibold">Total Amount</h1>
                <h1 className="text-md font-semibold">{totalAmount}</h1>
              </div>
              <div className="flex flex-row w-full justify-between items-center gap-10">
                <h1 className="text-md font-semibold">Total GST</h1>
                <h1 className="text-md font-semibold">{totalGST}</h1>
              </div>
              <div className="flex flex-row w-full justify-between items-center gap-10">
                <h1 className="text-md font-semibold">Total Payment</h1>
                <h1 className="text-md font-semibold">{total}</h1>
              </div>
              {total > 0 && (
                <Link
                  href={"/checkout"}
                  className="bg-black text-center text-white w-full rounded-xl p-2"
                >
                  Checkout
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Page;
