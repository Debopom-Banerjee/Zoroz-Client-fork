"use client";

import { useEffect, useRef, useState } from "react";
import { PuffLoader } from "react-spinners";
import FormElement from "../common/FormElement";
import { useUser } from "@/lib/store/user";
import { addReview } from "@/utils/functions/addReview";
import toast, { Toaster } from "react-hot-toast";
import { editReview } from "@/utils/functions/editReview";
import { useRouter } from "next/navigation";

export const ReviewModal = ({
  isOpen,
  onClose,
  productID,
  action,
  review,
  title,
  rating,
}: {
  isOpen: boolean;
  onClose: () => void;
  productID: string;
  rating?:number;
  review?:string;
  title?:string;
  action: string;
}) => {
  const [productId, setProductId] = useState('');
  const router = useRouter();
  const user = useUser((state) => state.user);
  const [disabled, setDisabled] = useState(false);
  const [inputs, setInputs] = useState({
    rating: rating ? rating : 0,
    review: review ? review : "",
    title: title ? title : "",
  });

  useEffect(()=>{
    console.log(productID)
    setProductId(productID)
  },[productID])
  const handleSubmit = async () => {
    // handle submit logic
    setDisabled(true);
    if (action === "add") {
      const reviewAdd = await addReview(inputs, user?._id!, productId);
      toast.success("Review Added !");
      router.refresh();
    } else if (action === "edit") {
      const reviewEdit = await editReview(inputs, user?._id!, productId);
      toast.success("Review Editted !");
      router.refresh();
    }
    setDisabled(false);
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleStarClick = (index: number) => {
    setInputs({ ...inputs, rating: index + 1 });
  };

  return (
    <>
      <Toaster position="bottom-right" />
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div
            className={`bg-gray-100 p-4 rounded-lg max-h-[50vh] md:max-h-[60vh] min-h-auto w-[90%] flex flex-col items-start md:w-[50%] lg:w-[35%]`}
          >
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold">Add Review</h2>
              <h2
                onClick={onClose}
                className="bg-black md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-black border-2 border-black text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>
            <div className="flex flex-col items-start w-full gap-4">
              <div className="flex flex-row items-center gap-0">
                {[...Array(5)].map((_, index) => {
                  return (
                    <svg
                      key={index}
                      onClick={() => handleStarClick(index)}
                      className="w-6 h-6 ms-2 text-gray-300 dark:text-gray-500 cursor-pointer"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={inputs.rating > index ? "#FFD300" : "currentColor"}
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  );
                })}
              </div>
              <FormElement
                name="Title"
                id="title"
                type="text"
                value={inputs.title}
                required
                onChange={handleInputChange}
              />
              <div className="flex flex-col w-full items-start gap-2 px-3">
                <label htmlFor="review" className="font-semibold text-sm">
                  Review:
                </label>
                <textarea
                  name="review"
                  id="review"
                  className="rounded-lg w-full"
                  value={inputs.review}
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              className="border-2 mt-3  border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
              onClick={handleSubmit}
              disabled={disabled}
            >
              {!disabled ? "Submit" : <PuffLoader color="white" size={10} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
