
import axios from "axios";


export const fetchCart = async(userId:string)=>{
    try {

        const token: any = localStorage.getItem("token");

        const data = await axios.get(
          `https://zoroz-ecommerce-backend.onrender.com/carts/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        return data.data.cart;
      } catch (error) {
        // console.log(error);
      }
}