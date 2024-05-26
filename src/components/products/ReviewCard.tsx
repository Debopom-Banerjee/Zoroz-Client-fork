import { useUser } from "@/lib/store/user";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { ReviewModal } from "./ReviewModal";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { deleteReview } from "@/utils/functions/deleteReview";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Stars = ({ starCount }: { starCount: number }) => {
  return (
    <div className="flex items-center mb-5">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className="w-6 h-6 ms-2 text-gray-300 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill={index < starCount ? "#FFD300" : "currentColor"}
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewCard = ({
  review,
  productId,
}: {
  review: any;
  productId: string;
}) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [hideReview,setHideReview] = useState(false);
  const user = useUser((state) => state.user);
  const router = useRouter();
  return (
    <>
    {!hideReview && <div className="flex flex-col items-start gap-2 border-y w-full border-gray-500 py-2 px-2 rounded-lg">
      <Toaster position="bottom-right" />
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-row flex-wrap gap-2 items-start">
          <h1 className="font-semibold text-lg">Rating : </h1>
          <Stars starCount={review.rating} />
        </div>
        {review?.user_id === user?._id && (
          <div
            onClick={() => {
              setOpenReviewModal(true);
            }}
            className="bg-red-300  rounded-lg p-2"
          >
            <MdEdit size={24} color="red" />
          </div>
        )}
        {review?.user_id === user?._id && (
          <div
            onClick={async () => {
            const response =  await deleteReview(user?._id!, productId);
            if(response?.status == 200){
              setHideReview(true);
            }
              toast.success("Review Deleted !");
              router.refresh();
            }}
            className="bg-red-300  rounded-lg p-2"
          >
            <RiDeleteBin6Fill size={24} color="red" />
          </div>
        )}
      </div>
      <h1 className="font-semibold text-base">{review.title}</h1>
      <h1 className="text-gray-600 text-base">
        {new Date(review.date).toDateString()}
      </h1>
      <p className="text-sm">{review.review}</p>
      {openReviewModal && (
        <ReviewModal
          isOpen={openReviewModal}
          onClose={() => setOpenReviewModal(false)}
          productID={productId}
          action="edit"
          title={review?.title}
          review={review?.review}
          rating={review?.rating}
        />
      )}
    </div>}
    </>
  );
};

export default ReviewCard;
