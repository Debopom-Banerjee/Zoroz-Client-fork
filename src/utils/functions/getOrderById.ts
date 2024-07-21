import axios from "axios";

export const getOrderbyId = async (userId: string) => {
  try {
    const token: any = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:5000/orders/get/${userId}`,
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
