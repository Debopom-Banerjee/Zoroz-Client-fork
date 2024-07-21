import axios from "axios";

export const getProductsBySubCategory = async (subCategory: string) => {
  try {
    const token: any = localStorage.getItem("token");
    const data = await axios.get(`http://localhost:5000/products/categories/${subCategory}`, {
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
