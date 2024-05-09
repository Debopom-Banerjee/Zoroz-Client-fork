import axios from "axios";

export const getProductsBySubCategory = async (subCategory: string) => {
  try {
    const token: any = localStorage.getItem("token");
    const data = await axios.get(`https://zoroz-ecommerce-backend.onrender.com/products/categories/${subCategory}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data.data.data)
    return data.data.data;
  } catch (err) {
    console.log(err);
  }
};
