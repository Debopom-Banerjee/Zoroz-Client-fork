import axios from "axios";

export const handleLogout = async () => {
    try{
        await axios.post(`https://zoroz-ecommerce-backend.onrender.com/auth/logout`);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
    catch(error){
        console.log(error)
    }
}