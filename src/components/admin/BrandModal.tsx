import parse from "html-react-parser";
import { PuffLoader } from "react-spinners";
const BrandModal = ({
  isOpen,
  onClose,
  substance,
  onSubmit,
  disabled,
}: {
  isOpen: boolean;
  onClose: () => void;
  substance: React.ReactNode;
  onSubmit: () => void;
  disabled: boolean;
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div
            className={`bg-gray-100 p-4 rounded-lg max-h-[50vh] md:max-h-[40vh] min-h-auto w-[90%] flex flex-col items-start md:w-[50%] lg:w-[35%] `}
          >
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold">Add Category</h2>

              <h2
                onClick={onClose}
                className="bg-black md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-black border-2 border-black  text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>
            <div className="h-full overflow-y-scroll my-1 py-2 px-1 w-full">
              {substance}
            </div>
            <button
              className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
              onClick={onSubmit}
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

export default BrandModal;
