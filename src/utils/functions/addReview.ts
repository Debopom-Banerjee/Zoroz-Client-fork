import axios from "axios";

export const addReview = async(inputs:any,userId:string,productId:string)=>{
    try {
        const token:any =
          localStorage.getItem("token")
          const updatedInputs = { ...inputs, userId: userId, productId: productId };
          console.log(updatedInputs)
        const response = await axios.post(
          `http://localhost:5000/products/reviews/add`,
          updatedInputs,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
}