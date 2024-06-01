"use client";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { deleteOrder } from "@/utils/functions/deleteOrder";
import { getSingleOrderById } from "@/utils/functions/getSingleOrderById";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = (Params: any) => {
  const params = Params?.params;
  const orderID = params?.orderId;
  const [orderData, setOrderData] = useState<any>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getOrder = async () => {
      const data = await getSingleOrderById(orderID);
      console.log(data);
      setOrderData(data);
    };
    getOrder();
  }, [orderID]);

  const cancelOrder = async () => {
    setDisabled(true);
    await deleteOrder(orderData?._id, orderData?.customer_id);
    toast.success("Order Deleted Successfully !");
    setIsConfirmOpen(false);
    setDisabled(false);
    router.push('/profile/orders');
  };
  return (
    <div className="flex flex-col w-full items-center gap-2 justify-center">
      <div className="flex flex-row flex-wrap bg-white rounded-lg w-full p-8 items-center justify-between">
        <img
          src={orderData && orderData?.product?.image!}
          alt=""
          className="w-40 h-40 rounded-lg"
        />
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-semibold text-xl">{orderData?.product?.name!}</h1>
          <h1 className="font-semibold text-lg">
            ₹ {orderData?.order?.price!}
          </h1>
          <h1 className="font-semibold text-lg text-slate-600">
            Quantity : {orderData?.order?.quantity}
          </h1>
          <h1 className="font-semibold text-lg text-slate-600">
            Status :{" "}
            <span className="text-red-600">{orderData?.order?.status}</span>
          </h1>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="bg-red-600 text-white px-8 py-2 rounded-lg border border-red-600 font-semibold hover:border-red-600 hover:bg-white hover:text-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg w-full flex flex-row  max-md:flex-col items-center justify-between">
        <div className="flex flex-col  bg-white rounded-lg w-full p-8 items-start justify-between">
          <h1 className="font-semibold text-xl">Delivery Address</h1>
          <h1 className="font-semibold text-sm text-slate-600">
            {orderData?.order?.shipping_address}
          </h1>
          <h1 className="font-semibold text-sm text-slate-600">
            {" "}
            Mobile : {orderData?.user?.phone}
          </h1>
          <h1 className="font-semibold text-sm text-slate-600">
            Name : {orderData?.user?.name}
          </h1>
        </div>
        <div className="flex flex-col  bg-white rounded-lg w-full p-8 items-start justify-between">
          <h1 className="font-semibold text-xl">Order Summary</h1>
          <h1 className="font-semibold text-lg text-slate-600">
            Price : {orderData?.order?.price}
          </h1>
          <h1 className="font-semibold text-lg text-slate-600">
            {" "}
            Payment Method : {orderData?.user?.phone}
          </h1>
        </div>
      </div>
      {isConfirmOpen && (
        <ConfirmModal
          disabled={disabled}
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          body={<OrderDetails order={orderData} />}
          onSuccess={cancelOrder}
        />
      )}
    </div>
  );
};

const OrderDetails = ({ order }: { order: any }) => {
  return (
    <div className="flex flex-row flex-wrap justify-between items-center  gap-3 w-full bg-white px-10 py-5 rounded-lg border border-slate-300">
      <div className="flex flex-row items-center gap-5 justify-center">
        <div className="w-20 h-20 bg-gray-200 rounded-lg">
          <img
            src={order?.product?.image}
            alt={order?.product?.name}
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col items-start gap-1 ">
          <h1 className="font-semibold text-sm">{order?.product?.name}</h1>
          <h1 className="font-semibold text-sm">
            Price: ₹ {order?.order?.price}
          </h1>
          <h1 className="font-semibold text-sm">
            Quantity: {order?.order?.quantity}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default page;
