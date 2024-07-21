import axios from "axios";

export const getSingleOrderById = async (orderId: string) => {
  try {
    const token: any = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:5000/orders/get/single/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.data;
    return response;
  } catch (error) {
    console.log(error);
  }
};
