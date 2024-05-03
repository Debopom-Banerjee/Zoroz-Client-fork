import { User } from "@supabase/supabase-js";

interface cartType{
  product_id: string;
  quantity: number;
}
export interface IUser extends User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  city: string;
  state: string;
  pincode: string;
  cart: [cartType];
}
