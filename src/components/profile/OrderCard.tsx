"use client";
import { useState } from "react";
import { ConfirmModal } from "../common/ConfirmModal";
import { deleteOrder } from "@/utils/functions/deleteOrder";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const OrderCard = ({orderData}:{orderData:any})=>{
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [disabled,setDisabled] = useState(false);
    console.log(orderData)
    const router = useRouter();
    const cancelOrder = async()=>{
        setDisabled(true);
      await deleteOrder(orderData?._id,orderData?.customer_id);
      toast.success("Order Deleted Successfully !");
      setIsConfirmOpen(false);
      setDisabled(false);
      router.refresh();
    }
    return(
        <div className='flex flex-row flex-wrap justify-between items-center  gap-3 w-full bg-white px-10 py-5 rounded-lg border border-slate-300'>
            <div className='flex flex-row items-center gap-5 justify-center'>
            <div className='w-20 h-20 bg-gray-200 rounded-lg'>
                <img src={orderData?.product?.image} alt={orderData?.product?.name} width={100} height={100} />
            </div>
           <div className='flex flex-col items-start gap-1 '>
                <h1 className='font-semibold text-sm'>{orderData?.product?.name}</h1>
                <h1 className='font-semibold text-sm'>Price: ₹ {orderData?.product?.price}</h1>
                <h1 className='font-semibold text-sm'>Quantity: {orderData?.quantity}</h1>
           </div>
            </div>
           
           <div className='flex flex-col items-center gap-2'>
                <h1 className='font-semibold'>Status : {orderData?.status}</h1> 
                <button onClick={()=>setIsConfirmOpen(true)} className='font-semibold text-white bg-red-600 px-5 py-1 rounded-lg border border-red-600 hover:bg-white hover:text-red-600 hover:border-red-600'>Cancel</button>
           </div>
           {isConfirmOpen && <ConfirmModal disabled={disabled} isOpen={isConfirmOpen} onClose={()=>setIsConfirmOpen(false)} body={<OrderDetails order={orderData} />} onSuccess={cancelOrder} />}
        </div>
    )
}

const OrderDetails = ({order}:{order:any})=>{
    return(
        <div className='flex flex-row flex-wrap justify-between items-center  gap-3 w-full bg-white px-10 py-5 rounded-lg border border-slate-300'>
            <div className='flex flex-row items-center gap-5 justify-center'>
            <div className='w-20 h-20 bg-gray-200 rounded-lg'>
                <img src={order?.product?.image} alt={order?.product?.name} width={100} height={100} />
            </div>
           <div className='flex flex-col items-start gap-1 '>
                <h1 className='font-semibold text-sm'>{order?.product?.name}</h1>
                <h1 className='font-semibold text-sm'>Price: ₹ {order?.product?.price}</h1>
                <h1 className='font-semibold text-sm'>Quantity: {order?.quantity}</h1>
           </div>
            </div>
           
        </div>
    )
}

export default OrderCard;