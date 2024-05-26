import React from "react";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  return (
    <div className="w-full bg-white py-2 px-5 rounded-xl">
      <div className="flex flex-row items-center justify-between flex-wrap-reverse">
        <h1 className="font-semibold text-xl">Reviews & Ratings</h1>
        <button className="bg-red-300 text-red-600 text-base px-5 py-2 rounded-xl font-semibold hover:bg-opacity-30 hover:border-red-600 hover:border">
          WRITE A REVIEW
        </button>
      </div>

      <h1 className="text-base ">Product Name</h1>
      <div className="flex flex-row items-start gap-5 py-2">
        <div className="flex flex-col items-center gap-2 w-full md:w-60">
          <h1 className="font-semibold flex flex-row items-center text-4xl text-green-500">
            4.7{" "}
            <svg
              className="w-8 h-8 ms-3 text-green-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </h1>
          <h1 className="text-gray-500 text-justify text-base">
            Average Rating based on 36 ratings and 35 reviews
          </h1>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h1>5 Star Ratings : </h1>
          <h1>4 Star Ratings : </h1>
          <h1>3 Star Ratings : </h1>
          <h1>2 Star Ratings : </h1>
          <h1>1 Star Ratings : </h1>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  );
};

export default Reviews;
