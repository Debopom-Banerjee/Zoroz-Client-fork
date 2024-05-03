import axios from "axios"

export const getProductById = async (id: string) => {
    try{
        const data = await axios.get(`https://zoroz-ecommerce-backend.onrender.com/products/product/${id}`)
        return data.data.data
    }
    catch(err){
        console.log(err)
    }
}