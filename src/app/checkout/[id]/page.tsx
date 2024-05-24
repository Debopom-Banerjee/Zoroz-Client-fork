"use client";
import CheckoutCard from "@/components/cart/CheckoutCard";
import FormElement from "@/components/common/FormElement";
import Navbar from "@/components/common/Navbar";
import ThankYouModal from "@/components/common/ThankYouModal";
import Footer from "@/components/home/Footer";
import { useUser } from "@/lib/store/user";
import { addOrder } from "@/utils/functions/addOrder";
import { getProductById } from "@/utils/functions/getProductById";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiMinus, BiPlus } from "react-icons/bi";
import { PuffLoader } from "react-spinners";

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
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  console.log(displayRazorpay);
  const [orderDetails, setOrderDetails] = useState({
    orderId: null,
    currency: null,
    amount: null,
  });
  const user = useUser((state) => state.user);
  const [showThankYou, setShowThankYou] = useState(true);
  const [cartData, setCartData] = useState<any>([]);
  const [productData, setProductData] = useState<any>(null);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalGST, setTotalGST] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  const [vendorId, setVendorId] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [orderPrice, setOrderPrice] = useState<number>(0);
  const params = useParams();
  const searchParams = useSearchParams();
  const productId = useParams().id.toLocaleString();
  const quantity: any = searchParams.get("quantity");

  useEffect(() => {
    setProductQuantity(parseInt(quantity));
    const fetchProductData = async () => {
      const data = await getProductById(productId);
      setProductData(data);
      setLoading(false);
    };
    fetchProductData();
  }, [productId, quantity]);

  useEffect(() => {
    setUserId(user?._id!);
    setVendorId(productData?.vendor_id);

    if (productData) {
      const calculatedTotalAmount: number = productData.price * productQuantity;
      setTotalAmount(calculatedTotalAmount);
      const calculatedTotalGST: number = Number(
        (calculatedTotalAmount * 0.1).toFixed(2)
      );
      setTotalGST(calculatedTotalGST);

      const calculatedTotal: number =
        calculatedTotalAmount + calculatedTotalGST;
      setTotal(calculatedTotal);
    }
  }, [user, productData, productQuantity]);

  const router = useRouter();
  const createOrderId = async () => {
    try {
      const response = await fetch(
        "https://zoroz-ecommerce-backend.onrender.com/orders/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_method: "Online Payment",
           price:total*100
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      return data.order_id;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const orderId: string = await createOrderId();
      const options = {
        key: "rzp_test_fq5x5RVk096MtS",
        amount: total * 100,
        currency: "INR",
        name: "name",
        description: "description",
        order_id: orderId,
        handler: async function (response: any) {
          console.log(response);
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            ordersData:[
              {
                payment_method:"Online Payment",
            product_id: productId,
            quantity: quantity,
            customer_id: userId,
            vendor_id: vendorId,
            shipping_address:
              inputs.address +
              ", " +
              inputs.city +
              ", " +
              inputs.state +
              ", " +
              inputs.pincode,
            price: total * 100,
            status: "pending",
            vendor_approval: false,
            admin_approval: false,
              }
            ]
          };

          const result = await fetch(
            "https://zoroz-ecommerce-backend.onrender.com/orders/paymentCapture",
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: { "Content-Type": "application/json" },
            }
          );
          const res = await result.json();
          if (res.isOk) alert("payment succeed");
          else {
            alert(res.message);
          }
        },
        prefill: {
          name: "Soumyaraj Bag",
          email: "soumyarajbag@gmail.com",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject =
        typeof window !== "undefined" && new (window as any).Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddOrder = async (e: any) => {
    const orderDetails = {
      product_id: productId,
      quantity: quantity,
      customer_id: userId,
      vendor_id: vendorId,
      shipping_address:
        inputs.address +
        ", " +
        inputs.city +
        ", " +
        inputs.state +
        ", " +
        inputs.pincode,
      price: orderPrice,
      status: "pending",
      vendor_approval: false,
      admin_approval: false,
      payment_method: inputs.payment_method,
    };

    if (inputs.payment_method === "Online Payment") {
      await processPayment(e);
      router.push("/profile/orders")
    } else {
      const data = await addOrder(orderDetails);
      if (data?.status === 201) {
        toast.success("Order Placed Successfully");
        router.push("/profile/orders");
      }
    }
  };
  return (
    <>
      <Navbar />

      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Toaster position="bottom-right" />
      <div className="min-h-[80vh]">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <PuffLoader color="#000" size={70} />
          </div>
        ) : (
          <div className="flex flex-col-reverse my-10 lg:flex-row items-center gap-5 lg:items-start justify-center mx-auto w-full">
            <div className="bg-white w-full flex flex-col items-center gap-3 lg:w-[40%] rounded-xl p-4">
              <h1 className="font-semibold text-lg">
                Product : {productData?.name}
              </h1>
              <div className="flex flex-row items-center justify-between gap-3 w-full">
                <h1 className="text-black font-semibold text-md">Update Qty</h1>
                <div className="flex flex-row items-center gap-2">
                  {productQuantity > 1 && (
                    <BiMinus
                      onClick={() => setProductQuantity(productQuantity - 1)}
                      className="text-2xl text-slate-500 bg-slate-200 rounded-xl"
                      size={25}
                    />
                  )}
                  <h1 className="text-black font-semibold text-md border border-black px-4 rounded-xl py-1">
                    {productQuantity}
                  </h1>
                  <BiPlus
                    onClick={() => setProductQuantity(productQuantity + 1)}
                    className="text-2xl text-slate-500 bg-slate-200 rounded-xl"
                    size={25}
                  />
                </div>
              </div>
              <h1 className="font-semibold text-lg">Add Delivery Details</h1>
              <div className="flex flex-row flex-wrap   items-center gap-2 w-full">
                <FormElement
                  id="name"
                  name="Name"
                  type="text"
                  value={inputs.name}
                  width="40%"
                  onChange={handleInputChange}
                />
                <FormElement
                  id="email"
                  name="Email"
                  type="email"
                  width="40%"
                  value={inputs.email}
                  onChange={handleInputChange}
                />
                <FormElement
                  id="phone"
                  name="Phone"
                  type="text"
                  width="40%"
                  value={inputs.phone}
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
                  id="address"
                  name="Address"
                  type="text"
                  width="100%"
                  value={inputs.address}
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
                <label htmlFor="payment_method">Payment Method : </label>
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
                <button
                  onClick={handleAddOrder}
                  className="bg-black text-white p-2 rounded-xl md:w-1/3"
                >
                  Continue
                </button>
              </div>
            </div>
            <CheckoutCard
              totalAmount={totalAmount}
              totalGST={totalGST}
              total={total}
            />
          </div>
        )}
      </div>
      {
      showThankYou && 
      <ThankYouModal
      isOpen={showThankYou}
      onClose={()=>setShowThankYou(false)}
      onSubmit={()=>{}}
      />
    }
      <Footer />
    </>
  );
};

export default page;
