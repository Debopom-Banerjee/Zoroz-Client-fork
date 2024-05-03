import axios from "axios";

export const approveOrderByVendor = async (orderId: string) => {
    try {
        const token: any = localStorage.getItem("token");
        const response = await axios.post(
        `https://zoroz-ecommerce-backend.onrender.com/orders/vendor/${orderId}`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}