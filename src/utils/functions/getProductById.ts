import axios from "axios"

export const getProductById = async (id: string) => {
    try{
        const data = await axios.get(`http://localhost:5000/products/product/${id}`)
        console.log(data)
        return data.data.data
    }
    catch(err){
        console.log(err)
    }
}