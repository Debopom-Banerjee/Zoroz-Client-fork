import axios from "axios"

export const phoneLogin = async (phone:any) => {
     try{
       
        const data = await axios.post(`https://zoroz-ecommerce-backend.onrender.com/auth/sendOtp`, {phone} )
        console.log(data)
} catch(error){
    console.log(error)
}
}