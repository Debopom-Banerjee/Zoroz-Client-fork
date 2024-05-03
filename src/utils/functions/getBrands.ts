import axios from "axios";

export const getBrands = async()=>{
    try{
        const token:any =
        localStorage.getItem("token")
        const brandsData = await axios.get(`https://zoroz-ecommerce-backend.onrender.com/products/getBrands`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return brandsData.data.data
    }
    catch(error){
        console.log(error)
    }
}