"use client";
import CheckoutCard from "@/components/cart/CheckoutCard";
import FormElement from "@/components/common/FormElement";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import { useUser } from "@/lib/store/user";
import { addMultipleOrder } from "@/utils/functions/addMultipleOrders";
import { fetchCart } from "@/utils/functions/fetchCart";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment_method: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const user = useUser((state) => state.user);
  const [cartData, setCartData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalGST, setTotalGST] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const getDatafromCart = async () => {
      const data = await fetchCart(user?._id!);
      console.log(data)
      if (data?.cart) {
        setCartData(data.cart);
      }
    };
      getDatafromCart();

  }, [user]);



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

  const handleAddOrder = async()=>{
    try{
    const orderDetails = cartData?.map((item:any)=>{
        return{
          product_id: item?.product_id,
          quantity: item?.quantity,
          customer_id: user?._id!,
          vendor_id: item?.vendor_id,
          shipping_address:
            inputs.address +
            ", " +
            inputs.city +
            ", " +
            inputs.state +
            ", " +
            inputs.pincode,
          price: total,
          status: "pending",
          vendor_approval: false,
          admin_approval: false,
          payment_method: inputs.payment_method
        }
          
       
      })
      console.log(orderDetails)
      const data = await addMultipleOrder(orderDetails)
      if(data?.status==201){
        toast.success("Order Placed Successfully")
      }
    }
    catch{

    }
  }
  return (
    <>
    <Navbar />
  
    <div className="min-h-[80vh]">
      <div className="flex flex-col-reverse my-10 lg:flex-row items-center gap-5 lg:items-start justify-center mx-auto w-full">
        <div className="bg-white w-full flex flex-col items-center gap-3 lg:w-[40%] rounded-xl p-4">
          <h1 className="font-semibold text-lg">Add Delivery Details</h1>
          <div className="flex flex-row flex-wrap   items-center gap-2 w-full">
            <FormElement
              id="name"
              name="Name"
              type="text"
              placeholder="Enter your name"
              value={inputs.name}
              width="40%"
              onChange={handleInputChange}
            />
            <FormElement
              id="email"
              name="Email"
              type="email"
              width="40%"
              placeholder="Enter your email"
              value={inputs.email}
              onChange={handleInputChange}
            />

            <FormElement
              id="address"
              name="Address"
              type="text"
              width="100%"
              value={inputs.address}
              onChange={handleInputChange}
            />
            <FormElement
              id="city"
              name="City"
              type="text"
              width="40%"
              value={inputs.city}
              onChange={handleInputChange}
            />
            <FormElement
              id="state"
              name="State"
              type="text"
              width="40%"
              value={inputs.state}
              onChange={handleInputChange}
            />
            <FormElement
              id="pincode"
              name="Pin Code"
              type="text"
              width="40%"
              value={inputs.pincode}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row flex-wrap items-center px-3 font-semibold  md:gap-2">
                <label htmlFor="gender">Gender : </label>
                <div className="flex w-full flex-row flex-wrap items-center gap-10  max-md:justify-between  md:items-center md:gap-16 ">
                  <label className="flex flex-row items-center gap-1">
                    <input
                      name="payment_method"
                      type="radio"
                      value="Online Payment"
                      className="bg-white text-regalia"
                      checked={inputs.payment_method === "Online Payment"}
                      onChange={handleInputChange}
                      required={true}
                    />
                    Online Payment
                  </label>
                  <label className="flex flex-row items-center gap-1">
                    <input
                      name="payment_method"
                      type="radio"
                      value="Cash On Delivery"
                      className="bg-white text-regalia"
                      checked={inputs.payment_method === "Cash On Delivery"}
                      onChange={handleInputChange}
                      required={true}
                    />
                    Cash On Delivery
                  </label>
                </div>
              </div>
          <div className="w-full flex flex-row flex-wrap items-center justify-center gap-10">
            <button className="bg-red-500 text-white p-2 rounded-xl md:w-1/3">
              Cancel
            </button>
            <button onClick={()=>handleAddOrder()} className="bg-black text-white p-2 rounded-xl md:w-1/3">
              Continue
            </button>
          </div>
        </div>
       <CheckoutCard totalAmount={totalAmount} totalGST={totalGST} total={total} />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default page;
