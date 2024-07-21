import axios from "axios";

export const getProducts = async()=>{
    try{
        const token:any =
        localStorage.getItem("token")
        const productsData = await axios.get(`http://localhost:5000/products/getProducts`,
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