"use client";
import React, { use, useEffect, useState } from "react";
import FormElement from "../common/FormElement";
import { useUser } from "@/lib/store/user";
import { updateUser } from "@/utils/functions/updateUser";
import toast, { Toaster } from "react-hot-toast";

const ProfileEditCard = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: 0,
  });
  const user = useUser((state) => state.user);
  console.log(user);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      name: user?.name!,
      email: user?.email!,
      phone: user?.phone!,
      address: user?.address!,
      city: user?.city!,
      state: user?.state!,
      pincode: parseInt(user?.pincode!),
    }));
  }, [user != undefined]);

  const handleUpdateUser = async () => {
    try {
      const data = await updateUser(inputs, user?._id!);
      console.log(data);
      toast.success("Profile Updated Successfully !");
    } catch (error) {
      toast.error("Something wrong happened !");
    }
  };
  return (
    <div className="flex flex-col items-start gap-5 bg-white border-2 border-red-600  w-[80%] px-5 py-3 rounded-lg">
      <h1 className="font-semibold text-lg">My Profile</h1>
      <div className="flex flex-row flex-wrap gap-3 items-center justify-start relative w-full">
        <FormElement
          id="name"
          type="text"
          value={inputs.name}
          onChange={handleInputChange}
          name="Name"
          width="40%"
        />
        <FormElement
          id="email"
          type="text"
          value={inputs.email}
          onChange={handleInputChange}
          name="Email"
          width="40%"
        />
        <FormElement
          id="phone"
          type="text"
          value={inputs.phone}
          onChange={handleInputChange}
          name="Phone"
          width="40%"
        />
     <FormElement
  id="pincode"
  type="number"
  value={inputs.pincode.toString()} // Convert pincode to string
  onChange={(e) =>
    setInputs((prev) => ({
      ...prev,
      pincode: parseInt(e.target.value), // Parse pincode from input value
    }))
  }
  name="Pincode"
  width="40%"
/>

        <FormElement
          id="address"
          type="text"
          value={inputs.address}
          onChange={handleInputChange}
          name="Address"
          width="80%"
        />
        <FormElement
          id="city"
          type="text"
          value={inputs.city}
          onChange={handleInputChange}
          name="City"
          width="40%"
        />

        <FormElement
          id="state"
          type="text"
          value={inputs.state}
          onChange={handleInputChange}
          name="State"
          width="40%"
        />
        
      </div>
      <div className="flex flex-row items-center gap-5 self-end">
        <button className=" bg-gray-400 text-white font-semibold px-5 py-2 rounded-lg ">
          Cancel
        </button>
        <button
          onClick={handleUpdateUser}
          className=" bg-red-600 text-white px-5 py-2 rounded-lg font-semibold border border-red-600 hover:border-red-600 hover:bg-white hover:text-red-600 "
        >
          Submit
        </button>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default ProfileEditCard;
