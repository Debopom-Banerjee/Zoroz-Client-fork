import axios from "axios";

export const addMultipleProducts = async (inputs: any) => {
  try {
    const token:any =
      localStorage.getItem("token")
      
    const response = await axios.post(
      `https://zoroz-ecommerce-backend.onrender.com/products/addProducts`,
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
