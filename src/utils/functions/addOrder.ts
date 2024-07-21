import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
export const addOrder = async(data:any)=>{
    try {
       const updatedData = {...data, transaction_id:uuidv4()}
        const token: any = localStorage.getItem("token");
        const response = await axios.post(
          `http://localhost:5000/orders/add`,
          updatedData,
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