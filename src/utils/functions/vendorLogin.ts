import axios from "axios"

export const vendorLogin = async (phone:any) => {
     try{
       
        const data = await axios.post(`https://zoroz-ecommerce-backend.onrender.com/vendor/sendOtp`, {phone} )
        console.log(data)
} catch(error){
    console.log(error)
}
}