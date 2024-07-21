import axios from "axios"

export const getProductsByBrand = async (brand: any) => {
    try{
        const token:any =
        localStorage.getItem("token")
        const brandsData = await axios.get(`http://localhost:5000/products/brands/${brand}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(brandsData)
        return brandsData.data.data
    }
    catch(error){
        console.log(error)
    }
}