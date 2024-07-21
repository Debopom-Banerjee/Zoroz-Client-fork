import axios from "axios";

export const getCategories = async()=>{
    try{
        const token:any =
        localStorage.getItem("token")
        const categoriesData = await axios.get(`http://localhost:5000/categories/getCategories`,
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