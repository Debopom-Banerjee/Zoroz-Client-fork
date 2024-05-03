import axios from "axios";

export const addOrder = async(data:any)=>{
    try {
        const token: any = localStorage.getItem("token");
        const response = await axios.post(
          `https://zoroz-ecommerce-backend.onrender.com/orders/add`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      }
}