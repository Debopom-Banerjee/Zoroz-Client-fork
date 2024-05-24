import React from "react";

const SubDetail = () => {
  return (
    <div className="flex flex-col items-start gap-4 ">
      <h1 className="font-semibold text-sm">
        ZOROZ – Your Trusted B2B Partner for Mobile Products.
      </h1>
      <p className="text-xs">
        ZOROZ is committed to streamlining the procurement of industrial products, ensuring a hassle-free online buying experience. Our platform aims to help you save on supplies, enhance inventory management efficiency, and sustain growth. We make B2B and B2C procurement smooth and time-saving.

      </p>
    </div>
  );
};

const Details = () => {
  return(
    <div className="flex flex-col items-start gap-5 ">
        <SubDetail />
        <SubDetail />
        <SubDetail />
        <SubDetail />
    </div>
  )
};

export default Details;
