import axios from "axios";

export const getSubCategoriesByCategory = async (category: string) => {
    try {
        const token: any = localStorage.getItem("token");
        console.log(token);
        const response = await axios.get(
        `http://localhost:5000/categories/getSubCategories/${category}`,
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