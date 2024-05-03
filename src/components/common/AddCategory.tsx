"use client";
import CategoryModal from "@/components/admin/CategoryModal";
import FormElement from "@/components/common/FormElement";
import { addCategory } from "@/utils/functions/addCategory";
import { getCategories } from "@/utils/functions/getCategories";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  TbSquareRoundedMinusFilled,
  TbSquareRoundedPlusFilled,
} from "react-icons/tb";
import { PuffLoader } from "react-spinners";

const CategoryTab = ({
  name,
  sub_categories,
  total_products,
}: {
  name: string;
  sub_categories: any;
  total_products: number;
}) => {
  return (
    <div className="bg-slate-200 border flex flex-col items-center w-[300px] h-[300px] gap-5 justify-center border-slate-200 rounded-md p-4">
      <h1 className="font-semibold text-xl">{name}</h1>
      <div className="flex flex-row items-center gap-2">
        {sub_categories.map((sub_category: any, index: number) => {
          return (
            <div
              key={index}
              className="bg-gray-600 text-white px-2 py-1 hover:bg-gray-800 cursor-pointer rounded-md"
            >
              {sub_category.name}
            </div>
          );
        })}
      </div>
      <h1>Total Products : {total_products}</h1>
    </div>
  );
};

const AddCategory = () => {
    const [inputs, setInputs] = useState({
        name: "",
        sub_categories: [],
      });
      
      
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      console.log(data);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    setDisabled(true);
    const data = await addCategory(inputs);
    console.log(data);
    setDisabled(false);
    toast.success("Category Added Successfully");
    setIsCategoryModalOpen(false);
  };
  return (
    <div className="w-full flex flex-col gap-3 px-5 py-5">
      <h1 className="font-semibold  text-xl ">All Categories</h1>
      <div className="flex flex-row items-center gap-10">
        <input
          type="text"
          placeholder="Search Category"
          className="border border-slate-200 p-2 rounded-md w-[60%]"
        />
        <button
          onClick={() => setIsCategoryModalOpen(true)}
          className="bg-black px-10 py-2 text-white border border-black hover:bg-white hover:text-black font-semibold text-lg"
        >
          Add Category
        </button>
      </div>

      <div className="flex flex-row flex-wrap w-full  items-center gap-20 px-10 py-10">
        {loading ? (
          <PuffLoader color="red" size={40} />
        ) : (
          categories.map((category: any, index: number) => {
            return (
              <CategoryTab
                key={index}
                name={category.name}
                sub_categories={category.sub_categories}
                total_products={category.total_products}
              />
            );
          })
        )}
      </div>
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        substance={<AddCategoryBody inputs={inputs} setInputs={setInputs} />}
        onSubmit={handleAddCategory}
        disabled={disabled}
      />
    </div>
  );
};

const AddCategoryBody = ({
  inputs,
  setInputs,
}: {
  inputs: any;

  setInputs: any;
}) => {
    const handleAddSubCategory = () => {
        setInputs((prevInputs: any) => ({
          ...prevInputs,
          sub_categories: [
            ...prevInputs.sub_categories,
            { name: "", image: "" },
          ],
        }));
      };
      
      
      const handleRemoveSubCategory = (index: number) => {
        setInputs((prevInputs: any) => ({
          ...prevInputs,
          sub_categories: prevInputs.sub_categories.filter((_:any, idx: number) => idx !== index),
        }));
      };
      
      const handleImageChange = (index: number, value: string) => {
        setInputs((prevInputs: any) => ({
          ...prevInputs,
          sub_categories: prevInputs.sub_categories.map((sub_category: any, idx: number) => {
            if (idx === index) {
              return {
                ...sub_category,
                image: value
              };
            }
            return sub_category;
          })
        }));
      };
      
      const handleNameChange = (index: number, value: string) => {
        setInputs((prevInputs: any) => ({
          ...prevInputs,
          sub_categories: prevInputs.sub_categories.map((sub_category: any, idx: number) => {
            if (idx === index) {
              return {
                ...sub_category,
                name: value
              };
            }
            return sub_category;
          })
        }));
      };
      
  console.log(inputs);
  return (
    <div className="flex flex-col items-start w-full gap-5">
      <FormElement
        name="Name"
        id="name"
        type={"text"}
        value={inputs.name}
        width="60%"
        onChange={(e: any) => setInputs({ ...inputs, name: e.target.value })}
      />

      <div className="flex flex-col w-full">
        <div className="flex flex-col  items-start gap-2 text-black">
          <label
            htmlFor={"sub_categories"}
            className="font-semibold flex flex-row items-center gap-2  text-base md:text-lg"
          >
            Sub Categories :
          </label>
          {Array.isArray(inputs.sub_categories) && inputs.sub_categories.map((sub_category: any, index: number) => (
            <div
              key={index}
              className="flex flex-row   flex-wrap items-center gap-10 rounded-lg border-2  border-regalia px-10 py-2 pb-5 text-sm"
            >
              <div className="flex flex-col  items-start gap-2">
                <label
                  htmlFor=""
                  className="font-hollirood font-semibold tracking-widest"
                >
                  {`Sub Category ${index + 1}`}
                </label>

                <div className="flex flex-col items-start gap-3">
                  <div className="flex flex-row flex-wrap gap-2 font-semibold">
                    <label
                      htmlFor="name"
                      className="font-retrolight tracking-widest"
                    >
                      Name :
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={sub_category.name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      className={`w-full rounded-xl border-b border-regalia bg-transparent px-2 py-1 focus:border-b max-md:w-full `}
                    />
                  </div>

                  <div className="flex flex-row flex-wrap gap-2 font-semibold">
                    <label
                      htmlFor="image"
                      className="font-retrolight tracking-widest"
                    >
                      Image :
                    </label>
                    <input
                      type="text"
                      value={sub_category.image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className={`w-full rounded-xl border-b border-regalia bg-transparent px-2 py-1 focus:border-b max-md:w-full `}
                    />
                  </div>
                </div>
              </div>

              {inputs?.sub_categories.length > 1 && (
                <button
                  onClick={() => handleRemoveSubCategory(index)}
                  className="rounded-full border-2 border-regalia px-2 py-1 text-xs font-semibold text-regalia lg:text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            onClick={handleAddSubCategory}
            className="mt-3 bg-black text-white px-5 py-1 rounded-full font-semibold hover:bg-white hover:text-black border-2 border-black text-sm"
          >
            Add Sub Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
