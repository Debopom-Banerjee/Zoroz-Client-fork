import axios from "axios";

export const getSearchData = async (searchText: string) => {
  try {
    const token: any = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:5000/products/search/${searchText}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
