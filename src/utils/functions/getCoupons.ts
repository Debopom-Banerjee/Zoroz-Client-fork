import axios from "axios";

export const getCoupons = async()=>{
    try{
        const token:any =
        localStorage.getItem("token")
        const couponsData = await axios.get(`http://localhost:5000/coupons/`,
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