import axios from "axios";

export const getCategories = async()=>{
    try{
        const token:any =
        localStorage.getItem("token")
        const categoriesData = await axios.get(`https://zoroz-ecommerce-backend.onrender.com/categories/getCategories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return categoriesData.data.data
    }
    catch(error){
        console.log(error)
    }
}