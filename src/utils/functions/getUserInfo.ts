import axios from "axios";

export async function getUserInfo() {
  const userId: any = localStorage.getItem("user");
  const user = await axios.get(`http://localhost:5000/auth/${JSON.parse(userId)!._id!}`);

  return user.data.data;
}
