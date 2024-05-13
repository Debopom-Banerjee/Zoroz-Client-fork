import axios from "axios";

export async function getVendorInfo() {
  const userId: any = localStorage.getItem("user");
  const user = await axios.get(`https://zoroz-ecommerce-backend.onrender.com/vendor/${JSON.parse(userId)!._id!}`);

  return user.data.data;
}
