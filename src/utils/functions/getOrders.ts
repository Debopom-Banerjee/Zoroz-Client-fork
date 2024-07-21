import axios from "axios";

export const getOrders = async () => {
  try {
    const token: any = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:5000/orders/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
    
  } catch (error) {
    console.log(error);
  }
};
