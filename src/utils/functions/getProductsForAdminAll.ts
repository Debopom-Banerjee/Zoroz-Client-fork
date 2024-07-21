import axios from "axios";

export const getProductsForAdminAll = async()=>{
    try{
        const token:any =
        localStorage.getItem("token")
        const productsData = await axios.get(`https://zoroz-ecommerce-backend.onrender.com/products/admin/products/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return productsData.data.data
    }
    catch(error){
        console.log(error)
    }
}