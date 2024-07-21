import axios from "axios";

export const addCoupon = async(inputs:any)=>{
    try {
        const token:any =
          localStorage.getItem("token")
          
        const response = await axios.post(
          `http://localhost:5000/coupons/add`,
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