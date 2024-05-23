import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-5 mx-auto bg-white p-10 rounded-xl lg:w-3/5 my-10">
        <h1 className="font-semibold text-4xl text-center w-full">
          Privacy Policy
        </h1>
        <div className="text-justify w-full">
          This Privacy Policy is intended for all Users of Zoroz.in. Zoroz is
          dedicated to respecting and protecting the privacy of our Users. All
          information User provides, such as phone number, home address, current
          location, e-mail addresses or any additional personal information
          found on the site, will be used solely to support User relationship
          with Zoroz. Zoroz strives to develop innovative methods to serve Users
          even better. Zoroz is designed to operate efficiently while keeping
          user’s privacy in mind. This Privacy Policy outlines the types of
          personal information that Zoroz gathers from its users and takes steps
          to safeguard it. In order to provide a personalized browsing
          experience, Zoroz may collect information from you, which may include
          technical or other related information from the device used to access
          Zoroz platforms including without limitation to your current location.
          By registering or using or visiting Zoroz platforms, you explicitly
          accept, without limitation or qualification, the collection, use and
          transfer of the personal information provided by you in the manner
          described in the Terms & Conditions and Privacy Policy. Kindly read
          the Terms & Conditions and the Privacy Policy carefully as it affects
          your rights and liabilities under law. If you do not accept the Terms
          and Conditions and this Privacy Policy, please do not use Zoroz
          services. Zoroz reserves the right to take any rightful legal action
          against the customer if any fraudulent activity is identified such as
          multiple usage & abuse of coupon code, wrong claims for orders etc.
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
