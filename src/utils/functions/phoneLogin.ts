import axios from "axios"

export const phoneLogin = async (phone:any) => {
     try{
       
        const data = await axios.post(`http://localhost:5000/auth/sendOtp`, {phone} )
        console.log(data)
} catch(error){
    console.log(error)
}
}