import axios from "axios";

export const getCounts = async() => {
    try{
        const token:any =
        localStorage.getItem("token")
        const countsData = await axios.get(`https://zoroz-ecommerce-backend.onrender.com/products/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        return countsData.data;
    }
    catch(error){
        console.log(error)
    }
}