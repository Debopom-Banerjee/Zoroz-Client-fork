import axios from "axios";

export const addCopyProductByVendor = async (inputs: any) => {
    try {
      console.log(inputs)
        const token:any =
          localStorage.getItem("token")
          
        const response = await axios.post(
          `https://zoroz-ecommerce-backend.onrender.com/products/addProduct`,
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