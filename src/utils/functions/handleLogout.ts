import axios from "axios";

export const handleLogout = async () => {
    try{
        await axios.post(`http://localhost:5000/auth/logout`);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
    catch(error){
        console.log(error)
    }
}