"use client";

import { useCart } from "@/lib/store/cart";
import { useUser } from "@/lib/store/user";
import { useUserType } from "@/lib/store/userType";
import { fetchCart } from "@/utils/functions/fetchCart";
import { getUserInfo } from "@/utils/functions/getUserInfo";
import { getVendorInfo } from "@/utils/functions/getVendorInfo";
import { useEffect } from "react";

const SessionProvider = () => {
  const setUser = useUser((state) => state.setUser);
  const user = useUser((state) => state.user);
  const setCart = useCart((state) => state.setCart);
  const userType = useUserType((state) => state.userType);
  const setUserType = useUserType((state) => state.setUserType);
  const userId: any = typeof window !== "undefined" && window.localStorage && localStorage.getItem("user");
  const readUserSession = async () => {
    try {
     
      if(userType === "vendor"){
        const data = await getVendorInfo();
        console.log(data)
        setUser(data);
        if (data) {
          const cart = await fetchCart(data._id);
          console.log(cart)
          setCart(cart.cart);
        }
      }
      else{
        const data = await getUserInfo();
        console.log(data)
        setUser(data);
        if (data) {
          const cart = await fetchCart(data._id);
          console.log(cart)
          setCart(cart.cart);
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    readUserSession();
    //eslint-disable-next-line
  }, [userType]);

  useEffect(() => {
    if(userType == undefined){
      if (userId !== undefined && userId !== null) {
        try {
          setUserType(JSON.parse(userId).role === "customer" ? "customer" : "vendor");
        } catch (error) {
          console.error("Error parsing userId:", error);
        }
      }
    }
   
  }, [userId]);
  

  return <></>;
};

export default SessionProvider;
