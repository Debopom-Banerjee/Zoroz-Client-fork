import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-5 mx-auto bg-white p-10 rounded-xl lg:w-3/5 my-10">
        <h1 className="font-semibold text-4xl text-center w-full">About Us</h1>
        <div className="text-justify w-full">
          Welcome to Zoroz – your premier destination for electronic spare parts
          in the B2B ecommerce sphere. Based out of India, we pride ourselves on
          being one of the fastest emerging and most reliable companies in this
          industry, with a steadfast commitment to prioritizing our customers’
          needs above all else.
          <br />
          At Zoroz, we cater to mobile repair shop retailers, wholesalers, and
          distributors, offering a diverse range of high-quality products to
          meet their requirements. Whether you’re in need of spare parts for
          smartphones, tablets, or other electronic devices, we’ve got you
          covered.
          <br />
          Our mission is simple: to provide our clients with seamless access to
          top-notch electronic spare parts, coupled with unparalleled customer
          service. With a user-friendly platform and a dedicated team at your
          service, we strive to make your shopping experience with us as
          efficient and enjoyable as possible.
          <br />
          What sets us apart is our unwavering commitment to excellence and
          customer satisfaction. We understand the importance of timely
          deliveries and reliable products, which is why we go above and beyond
          to ensure that every transaction meets the highest standards of
          quality and professionalism.
          <br />
          Join the Zoroz family today and experience the difference for
          yourself. We look forward to serving you and exceeding your
          expectations every step of the way.
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
