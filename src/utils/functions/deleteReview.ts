import axios from "axios";

export const deleteReview = async(userId:string,productId:string)=>{
    try {
        const token:any =
          localStorage.getItem("token")
          const updatedInputs = { userId: userId, productId: productId };
          console.log(updatedInputs)
        const response = await axios.post(
          `https://zoroz-ecommerce-backend.onrender.com/products/reviews/delete`,
          updatedInputs,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      }
}