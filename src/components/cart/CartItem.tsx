import { useUser } from "@/lib/store/user";
import { addToCart } from "@/utils/functions/addToCart";
import { manageQuantity } from "@/utils/functions/manageQuantity";
import React, { useEffect, useMemo, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

const CartItem = ({ product, setCartData }: { product: any; setCartData: any }) => {
  
  const [quantity, setQuantity] = useState<number>(1);
  const [subtotal, setSubtotal] = useState<number>(product?.price);

  useEffect(() => {
    setQuantity(product?.quantity);
    setSubtotal(product?.price * product?.quantity);
  }, [product?.quantity, product?.price]);

  const user = useUser((state) => state.user);
  console.log(product)
  const handleAddToCart = async () => {
    try {
      const data = await manageQuantity(
        product?.quantity,
        "add",
        user?._id!,
        product?.product_id!
      );
      setQuantity((prev) => prev + 1);
      setSubtotal((prev) => prev + product?.price);
      setCartData((prev: any) =>
        prev.map((item: any) =>
          item.product_id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleRemoveCart = async () => {
    try {
      const data = await manageQuantity(
        product?.quantity,
        "remove",
        user?._id!,
        product?.product_id!
      );
      setQuantity((prev) => prev - 1);
      setSubtotal((prev) => prev - product?.price);
      setCartData((prev: any) =>
        prev.map((item: any) =>
          item.product_id === product.product_id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (
    <div className="flex flex-row w-full gap-2 justify-between items-center border-slate-400 border bg-white p-4 rounded-xl">
      <img src={product?.image} className="w-20 rounded-xl" />
      <div className="flex flex-col items-start gap-2">
        <h1 className="font-semibold tracking-wide">{product?.name}</h1>
        <p className="text-gray-500">{product?.description}</p>
      </div>
      <div className="flex flex-col items-center gap-2 ml-auto">
        <h1 className="font-semibold tracking-wide">${subtotal}</h1>
        <div className="flex flex-row items-center gap-2">
          <BiMinus
            onClick={handleRemoveCart}
            className="text-2xl text-slate-500 bg-slate-200 rounded-xl"
            size={25}
          />
          <h1 className="text-black font-semibold text-md border border-black px-4 rounded-xl py-1">
            {quantity}
          </h1>
          <BiPlus
            onClick={handleAddToCart}
            className="text-2xl text-slate-500 bg-slate-200 rounded-xl"
            size={25}
          />
        </div>
      </div>
    </div>
  );
};


export default CartItem;
