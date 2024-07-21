import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
export const addMultipleOrder = async(data:any)=>{
    try {
      const ordersWithData = data.map((order:any) => ({
        ...order,
        transaction_id: uuidv4() // Generate UUID for each order
    }));
    const structuredOrders = {
      ordersData : ordersWithData
    }
    console.log(ordersWithData)
        const token: any = localStorage.getItem("token");
        const response = await axios.post(
          `http://localhost:5000/orders/add-multiple`,
          structuredOrders,
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
}