import axios from "axios";

export const updateUser = async (data: any, userId: string) => {
  try {
    const userData = await axios.post(
      `http://localhost:5000/auth/update/${userId}`,
      data
    );

    return userData;
  } catch (error) {
    console.log(error);
  }
};
