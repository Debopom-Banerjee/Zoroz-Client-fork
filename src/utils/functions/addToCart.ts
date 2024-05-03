import axios from "axios";

export const addToCart = async (
    userId: string,
  productDetails:any,
    operation: string,
) => {
  try {
    const details = {...productDetails, operation:operation};
    const token: any = localStorage.getItem("token");
    const data = await axios.post(
      `https://zoroz-ecommerce-backend.onrender.com/carts/${userId}`,
      details,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    return data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
