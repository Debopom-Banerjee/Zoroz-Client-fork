import axios from "axios";

export const addCategory = async (category: any) => {
    try {
        console.log(category)
        const token: any = localStorage.getItem("token");
        const categoriesData = await axios.post(
        `https://zoroz-ecommerce-backend.onrender.com/categories/addCategory`,
        category,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
        return categoriesData;
    } catch (error) {
        console.log(error);
    }
}