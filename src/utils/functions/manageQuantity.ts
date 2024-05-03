import axios from "axios";

export const manageQuantity = async (
  quantity: number,
  operation: string,
  customerId: string,
  productId: string
) => {
  try {
    console.log(quantity, operation, customerId, productId)
    const data = await axios.post(
      `https://zoroz-ecommerce-backend.onrender.com/carts/${customerId}/${productId}`,
      {
        quantity: quantity,
        operation: operation,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
