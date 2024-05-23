"use client";
import FormElement from "@/components/common/FormElement";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import React, { useState } from "react";

const page = () => {
    const [inputs,setInputs] = useState({
        name:"",
        email:"",
        subject:"",
        message:""
    })
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
      ) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
      };
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-5 mx-auto bg-white p-10 rounded-xl lg:w-3/5 my-10">
        <h1 className="font-semibold text-4xl text-center w-full">
          Contact Us
        </h1>
       <div className="flex flex-row flex-wrap items-center gap-5">
            <FormElement
            id=""
            name="Your Name"
            onChange={handleInputChange}
            type="text"
            required={true}
            value={inputs.name}
            width="40%"
            />
            <FormElement
            id=""
            name="Your Email"
            onChange={handleInputChange}
            type="text"
            required={true}
            value={inputs.email}
            width="40%"
            />
            <FormElement
            id=""
            name="Subject"
            onChange={handleInputChange}
            type="text"
            value={inputs.subject}
            required={true}
            width="100%"
            />
           <div className="px-3 w-full flex flex-col items-start gap-3">
           <label htmlFor={"message"} className="font-semibold text-xs md:text-sm">
    Message :
    </label>
        <textarea  required={true} name="message" value={inputs.message} className="w-full rounded-lg" id="message" onChange={handleInputChange} />
           </div>

         
       </div>
       <button className="px-10 py-3 bg-red-600 text-white rounded-xl text-lg hover:border-red-600 border border-red-600 hover:bg-white hover:text-red-600 font-semibold">Submit</button>
      </div>
      <Footer />
    </>
  );
};

export default page;
