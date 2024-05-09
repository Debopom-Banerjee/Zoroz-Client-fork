"use client";

import { useCart } from "@/lib/store/cart";
import { useUser } from "@/lib/store/user";
import { fetchCart } from "@/utils/functions/fetchCart";
import { getUserInfo } from "@/utils/functions/getUserInfo";
import { useEffect } from "react";

const SessionProvider = () => {
  const setUser = useUser((state) => state.setUser);
  const user = useUser((state) => state.user);
  const setCart = useCart((state) => state.setCart);

  const readUserSession = async () => {
    try {
      const data = await getUserInfo();
      console.log(data)
      setUser(data);
      if (data) {
        const cart = await fetchCart(data._id);
        console.log(cart)
        setCart(cart.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    readUserSession();
    //eslint-disable-next-line
  }, []);

  return <></>;
};

export default SessionProvider;
