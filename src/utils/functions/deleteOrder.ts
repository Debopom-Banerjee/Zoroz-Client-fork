import axios from "axios";

export const deleteOrder = async(orderID:string,customerID:string)=>{
    try {
        console.log(orderID,customerID);
        const token:any =
          localStorage.getItem("token")
          const updatedInputs = { customer_id:customerID, order_id:orderID };
          console.log(updatedInputs)
        const response = await axios.post(
          `https://zoroz-ecommerce-backend.onrender.com/orders/delete`,
          updatedInputs,
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