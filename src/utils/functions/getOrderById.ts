import axios from "axios";

export const getOrderbyId = async (userId: string) => {
  try {
    const token: any = localStorage.getItem("token");
    const response = await axios.get(
      `https://zoroz-ecommerce-backend.onrender.com/orders/get/${userId}`,
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
};
