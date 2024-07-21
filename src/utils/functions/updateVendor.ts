import axios from "axios";

export const updateVendor = async (data: any, userId: string) => {
  try {
    const userData = await axios.post(
      `http://localhost:5000/vendor/update/${userId}`,
      data
    );

    return userData;
  } catch (error) {
    console.log(error);
  }
};
