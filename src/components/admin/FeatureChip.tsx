import { TbSquareRoundedMinusFilled, TbSquareRoundedPlusFilled } from "react-icons/tb";
import FeatureAddForm from "./FeatureAddForm";
import Link from "next/link";
import { FeaturesType } from "./ProductAddForm";

const FeatureChip = ({
    name,
    link,
    index,
    handleAddFeature,
    handleRemoveFeature,
    isFeatureFormOpen,
    setIsFeatureFormOpen,
  }: {
    name: string;
    link: string;
    index: number;
    isFeatureFormOpen: boolean;
    setIsFeatureFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleAddFeature: (feature:FeaturesType) => void;
    handleRemoveFeature: (index: number) => void;
  }) => {
    return (
      <div className="flex flex-row flex-wrap items-center gap-2 bg-sky-200 border px-4 py-1 rounded-xl border-[#1a8fdd]">
        <h1 className="font-semibold text-md text-black">{name}</h1>
        <Link
          target="_blank"
          className="text-black font-medium text-sm"
          href={link}
        >
          {link}
        </Link>
        <div className="flex flex-row flex-wrap items-center gap-1">
          {
            <TbSquareRoundedPlusFilled
              onClick={() => setIsFeatureFormOpen(true)}
              className="font-semibold cursor-pointer rounded-full"
              size={30}
            />
          }
          {
            <TbSquareRoundedMinusFilled
              onClick={() => handleRemoveFeature(index)}
              className="font-semibold cursor-pointer rounded-full"
              size={30}
            />
          }
        </div>
        <FeatureAddForm
          isOpen={isFeatureFormOpen}
          onClose={() => setIsFeatureFormOpen(false)}
          handleAddFeature={handleAddFeature}
        />
      </div>
    );
  };

export default FeatureChip;