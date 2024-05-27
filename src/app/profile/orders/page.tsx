"use client";

import ThankYouModal from "@/components/common/ThankYouModal";
import OrderCard from "@/components/profile/OrderCard";
import { useUser } from "@/lib/store/user";
import { getOrdersByUser } from "@/utils/functions/getOrdersByUser";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";



const ThankYouSection = ()=>{
    const searchParams = useSearchParams();
    const success: any = searchParams?.get("success");
    const [showThankYou, setShowThankYou] = useState<boolean>(false);
    useEffect(()=>{
        setShowThankYou(success)
      },[success])
    return(
         <>
         {showThankYou && (
        <ThankYouModal
          isOpen={showThankYou}
          onClose={() => setShowThankYou(false)}
          onSubmit={() => {}}
        />
      )}
         </>
    )
}

const Page = () => {


  const [loading, setLoading] = useState(true);
  const user = useUser((state) => state.user);
  const [ordersData, setOrdersData] = useState([]);


  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrdersByUser(user?._id!);
      if (data) {
        setOrdersData(data.orders);
      }
      console.log(data);
      setLoading(false);
    };
    fetchOrders();
  }, [user]);
  return (
    <div className="bg-white px-8 py-5 mx-auto w-[100%] md:w-[70%] flex flex-col items-start gap-10 rounded-lg min-h-[60vh]">
      <h1 className="font-semibold text-xl">My Orders</h1>
      <div className="flex flex-col items-start  gap-5 w-full">
        {loading ? (
          <div className="flex flex-col w-full items-center gap-2 justify-center min-h-[60vh]">
            <PuffLoader color="red" loading={loading} size={30} />
          </div>
        ) : ordersData?.length > 0 ? (
          ordersData?.map((order, index) => {
            return <OrderCard orderData={order} key={index} />;
          })
        ) : (
          <div className="flex flex-col items-center justify-center mx-auto my-auto  w-full mt-20 font-semibold text-lg text-red-600">
            No Orders
          </div>
        )}
      </div>
      <Suspense>
        <ThankYouSection />
      </Suspense>
    </div>
  );
};

export default Page;
