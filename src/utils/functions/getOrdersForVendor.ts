import axios from "axios";

export const getOrdersForVendor = async (userId:string) => {
    try {
        const token: any = localStorage.getItem("token");
        const response = await axios.get(`https://zoroz-ecommerce-backend.onrender.com/orders/vendor/get/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
        
    } catch (error) {
        console.log(error);
    }

}