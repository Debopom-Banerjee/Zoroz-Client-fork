import axios from "axios";

export const addBrand = async (inputs: any) => {
    try {
        const token: any = localStorage.getItem("token");
        const brandData = await axios.post(`http://localhost:5000/categories/addBrand`, inputs, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return brandData.data.data;
    }
    catch (error) {
        console.log(error);
    }
}