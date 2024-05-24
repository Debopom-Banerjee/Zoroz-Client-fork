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
      <h1 className="font-semibold text-sm">
        Shop from Our Wide Range of Products.
      </h1>
      <p className="text-xs">
        ZOROZ offers over 20,000 SKUs across four main categories:

        - Mobile Accessories: From chargers to cases, find all essential mobile accessories to keep your devices running smoothly.
        - Mobile Spare Parts: Source high-quality spare parts for mobile phones to ensure seamless repairs and maintenance.
        - Mobile Tool Kits: Equip yourself with comprehensive tool kits designed specifically for mobile device repair and servicing.
        - Solar, Lighting and Essentials: Explore a variety of solar products, lighting solutions, and essential utilities for both personal and business use.
          Exceptional Buying Experience with ZOROZ.
      </p>
      <h1 className="font-semibold text-sm">
        Purchase Online with Confidence
      </h1>
      <p className="text-xs">
        Navigate our user-friendly site to find detailed information on our products. We ensure timely delivery across over 25,000 pin codes in India through our reliable logistics partners. All products undergo rigorous quality checks and comply with ISI standards.

        Experience seamless and efficient online procurement with ZOROZ. Choose from our extensive product range and find the perfect solutions for your needs.
      </p>
    </div>
  );
};

const Details = () => {
  return(
    <div className="flex flex-col items-start gap-5 ">
        <SubDetail />
    </div>
  )
};

export default Details;
