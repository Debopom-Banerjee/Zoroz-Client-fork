import axios from "axios"

export const verifyOtp = async (phone: any,otp:any) => {
    try{
        const data = await axios.post(`https://zoroz-ecommerce-backend.onrender.com/auth/verifyOtp`, {phone:phone,loginOtp:otp})
        console.log(data)
     
        if(data.data.statusCode == 200){
            localStorage.setItem("user", JSON.stringify(data.data.user))
            localStorage.setItem("token", data.data.token)
            
            return true;
        }else{
            return false;
        }
        
    }
    catch(error){
        console.log(error)
    }
}