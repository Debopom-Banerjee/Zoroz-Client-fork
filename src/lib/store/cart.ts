import { create } from "zustand";
import { ICart } from "../types/cart";

interface UserState {
  cart: ICart[] | undefined;
  setCart: (cart: ICart[] | undefined) => void;
}

export const useCart = create<UserState>((set) => ({
    cart: [],
    setCart: (cart) => {
      set({ cart }); // Update the cart directly
    },
  }));
  
