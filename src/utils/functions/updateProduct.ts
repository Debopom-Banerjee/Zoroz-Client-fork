import axios from "axios";

export const updateProduct = async(inputs:any,productId:string)=>{
    try {
        const token:any =
          localStorage.getItem("token")
          
        const response = await axios.post(
          `https://zoroz-ecommerce-backend.onrender.com/products/updateProduct/${productId}`,
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