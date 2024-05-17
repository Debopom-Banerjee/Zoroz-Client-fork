import axios from "axios";

export const getCountsForVendor = async(vendorId:string) => {
    try{
        const token:any =
        localStorage.getItem("token")
        const countsData = await axios.get(`https://zoroz-ecommerce-backend.onrender.com/products/vendor/counts/${vendorId}`,
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