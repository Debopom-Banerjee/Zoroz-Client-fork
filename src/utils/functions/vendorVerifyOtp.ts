import axios from "axios"

export const vendorVerifyOtp = async (phone: any,otp:any) => {
    try{
        const data = await axios.post(`http://localhost:5000/vendor/verifyOtp`, {phone:phone,loginOtp:otp})
        console.log(data)
     
        if(data.data.statusCode == 200){
            localStorage.setItem("user", JSON.stringify(data.data.vendor))
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