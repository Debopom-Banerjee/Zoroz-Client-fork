import React from "react";

const SubDetail = () => {
  return (
    <div className="flex flex-col items-start gap-4 ">
      <h1 className="font-semibold text-sm">
        Zoroz – Leading B2B e-Commerce for Industrial Products
      </h1>
      <p className="text-xs">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure
        repellendus, earum cum quas ex voluptatibus aliquid voluptatem repellat
        odit placeat.
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
