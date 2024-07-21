import axios from "axios";

export const getCountsForVendor = async(vendorId:string) => {
    try{
        const token:any =
        localStorage.getItem("token")
        const countsData = await axios.get(`http://localhost:5000/products/vendor/counts/${vendorId}`,
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