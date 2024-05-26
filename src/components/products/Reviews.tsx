import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { ReviewModal } from "./ReviewModal";
import { addReview } from "@/utils/functions/addReview";
import { useUser } from "@/lib/store/user";

const Reviews = ({reviews,productName,productId}:{reviews:any,productName:string,productId:string}) => {
  const user = useUser((state)=>state.user);
  const [reviewDetails,setReviewDetails] = useState([]);
  const [productID, setProductID] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  useEffect(()=>{
    setReviewDetails(reviews)
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc:number, review:any) => acc + review.rating, 0);
      const avgRating = (totalRating / reviews.length).toFixed(2);
      setAverageRating(parseFloat(avgRating));
    } else {
      setAverageRating(0);
    }
    if(reviews.length > 0){
      
      const filteredReviews = reviews.filter((review:any) => review.review !== '');
      setReviewsCount(filteredReviews.length);
    }
    else{
      setReviewsCount(0);
    }
    console.log(productId)
    setProductID(productId);
  },[reviews,productId])
  const [openReviewModal , setOpenReviewModal] = useState(false);
  return (
    <div className="w-full bg-white py-2  px-2 rounded-xl">
      <div className="flex flex-col md:flex-row items-center justify-between flex-wrap   gap-3">
        <h1 className="font-semibold text-xl">Reviews & Ratings</h1>
        <button onClick={()=>setOpenReviewModal(true)} className="bg-red-300 text-red-600 text-sm md:text-base px-5 py-2 rounded-xl font-semibold hover:bg-opacity-30 hover:border-red-600 hover:border">
          WRITE A REVIEW
        </button>
      </div>

      <h1 className="text-base mt-2 font-semibold">{productName}</h1>
      <div className="flex flex-row flex-wrap justify-center mx-auto items-start gap-5 py-2">
        <div className="flex flex-col items-center gap-2 w-72 mx-auto md:w-60">
          <h1 className="font-semibold flex flex-row items-center text-4xl text-green-500">
            {averageRating}{" "}
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
            Average Rating based on {reviewDetails.length} ratings and {reviewsCount} reviews
          </h1>
        </div>
        <div className="flex flex-col mx-auto max-md:w-4/5 items-start gap-2">
          <h1>5 Star Ratings : {reviewDetails.filter((review:any,index:number)=>review.rating == 5).length} </h1>
          <h1>4 Star Ratings : {reviewDetails.filter((review:any,index:number)=>review.rating == 4).length} </h1>
          <h1>3 Star Ratings : {reviewDetails.filter((review:any,index:number)=>review.rating == 3).length} </h1>
          <h1>2 Star Ratings : {reviewDetails.filter((review:any,index:number)=>review.rating == 2).length} </h1>
          <h1>1 Star Ratings : {reviewDetails.filter((review:any,index:number)=>review.rating == 1).length} </h1>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        {
          reviewDetails.map((review:any,index:number)=>{
            return(
              <ReviewCard review={review} key={index} productId={productID} />
            )
          })
        }
      </div>
      {
        openReviewModal && 
        <ReviewModal
        productID={productID}
        isOpen={openReviewModal}
        onClose={()=>setOpenReviewModal(false)}
        action={'add'}
        />
      }
    </div>
  );
};

export default Reviews;
