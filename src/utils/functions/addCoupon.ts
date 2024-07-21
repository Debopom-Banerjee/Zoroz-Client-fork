import axios from "axios";

export const addCoupon = async(inputs:any)=>{
    try {
        const token:any =
          localStorage.getItem("token")
          
        const response = await axios.post(
          `https://zoroz-ecommerce-backend.onrender.com/coupons/add`,
          inputs,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
}