import axios from "axios";

export const approveProduct = async (id: string) => {
    try {
        const token: any = localStorage.getItem("token");
        console.log(id)
        const response = await axios.post(
        `https://zoroz-ecommerce-backend.onrender.com/products/admin/approve/${id}`,
        {},
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}