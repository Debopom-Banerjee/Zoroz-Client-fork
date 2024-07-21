import axios from "axios";

export const getCoupons = async()=>{
    try{
        const token:any =
        localStorage.getItem("token")
        const couponsData = await axios.get(`https://zoroz-ecommerce-backend.onrender.com/coupons/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        return couponsData.data.data
    }
    catch(error){
        console.log(error)
    }
}