import axios from "axios";

export const getProductsForAdmin = async()=>{
    try {
        const token: any = localStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
        `http://localhost:5000/products/admin/products`,
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