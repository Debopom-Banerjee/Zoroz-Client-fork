import axios from "axios";

export const getOrders = async () => {
  try {
    const token: any = localStorage.getItem("token");
    const response = await axios.get(`https://zoroz-ecommerce-backend.onrender.com/orders/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
    
  } catch (error) {
    console.log(error);
  }
};
