"use client";

import { Toaster } from "react-hot-toast";
import { PuffLoader } from "react-spinners";

export const ConfirmModal = ({
  isOpen,
  onClose,
  body,
  onSuccess,
  disabled,
}: {
  isOpen: boolean;
  onClose: () => void;
  body: React.ReactNode;
  onSuccess:()=>void;
  disabled:boolean;
}) => {
  return (
    <>
      <Toaster position="bottom-right" />
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div
            className={`bg-gray-100 p-4 rounded-lg max-h-[50vh] md:max-h-[60vh] min-h-auto w-[90%] flex flex-col items-start md:w-[50%] lg:w-[25%]`}
          >
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold">Confirm</h2>
              <h2
                onClick={onClose}
                className="bg-black md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-black border-2 border-black text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>
            <div className="flex gap-5 flex-col items-center justify-between w-full">
              <div>{body}</div>
              <div className="flex flex-row w-full items-center flex-wrap justify-between px-2">
                <button
                  onClick={onClose}
                  className="bg-black text-white border border-black hover:border-black hover:bg-white hover:text-black px-5 py-1 rounded-lg"
                >
                  No
                </button>
                <button onClick={onSuccess} className="bg-black text-white border border-black hover:border-black hover:bg-white hover:text-black px-5 py-1 rounded-lg">
                 { disabled ? <PuffLoader size={25} color="white" />  : "Yes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
