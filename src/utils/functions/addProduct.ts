import axios from "axios";

export const addProduct = async (inputs: any) => {
  try {
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
};
