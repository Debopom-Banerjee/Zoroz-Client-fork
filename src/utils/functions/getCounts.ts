import axios from "axios";

export const getCounts = async() => {
    try{
        const token:any =
        localStorage.getItem("token")
        const countsData = await axios.get(`http://localhost:5000/products/`,
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