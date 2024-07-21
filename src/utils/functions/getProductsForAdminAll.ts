import axios from "axios";

export const getProductsForAdminAll = async()=>{
    try{
        const token:any =
        localStorage.getItem("token")
        const productsData = await axios.get(`http://localhost:5000/products/admin/products/all`,
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