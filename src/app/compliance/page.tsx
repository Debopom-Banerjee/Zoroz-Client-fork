import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-5 mx-auto bg-white p-10 rounded-xl lg:w-3/5 my-10">
        <h1 className="font-semibold text-4xl text-center w-full">
          Compliance
        </h1>
        <div className="text-justify w-full">
          At ZOROZ PRIVATE LIMITED (“ZOROZ”), we are committed to maintaining
          the highest standards of compliance with all applicable laws,
          regulations, and industry standards. Our commitment to compliance
          extends to every aspect of our business operations, ensuring
          integrity, transparency, and accountability. We adhere to all relevant
          laws and regulations governing e-commerce, consumer protection, data
          privacy, and security. ZOROZ ensures that our business practices align
          with the principles of fair competition, anti-corruption, and ethical
          sourcing. We regularly review and update our compliance policies to
          reflect changes in legislation and industry best practices. Our team
          is dedicated to safeguarding the privacy and personal data of our
          customers. We implement robust security measures to protect sensitive
          information and comply with data protection laws, including the
          General Data Protection Regulation (GDPR) and other relevant privacy
          laws. ZOROZ also ensures compliance with environmental regulations and
          promotes sustainable business practices. We are committed to reducing
          our environmental footprint and actively seek ways to minimize waste
          and promote recycling. We provide regular training to our employees on
          compliance-related matters and encourage a culture of compliance
          within our organization. Any concerns or violations can be reported
          through our confidential reporting channels, and we take prompt action
          to address any issues. By upholding these standards, ZOROZ aims to
          build trust with our customers, partners, and stakeholders, ensuring a
          responsible and ethical business environment.
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
