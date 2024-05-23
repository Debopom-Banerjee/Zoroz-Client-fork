"use client";
import BrandModal from "@/components/admin/BrandModal";
import FormElement from "@/components/common/FormElement";
import { addBrand } from "@/utils/functions/addBrand";
import { getBrands } from "@/utils/functions/getBrands";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";

const BrandTab = ({
  name,
  categories,
  sub_categories,
  total_products,
  image,
}: {
  name: string;
  categories: any;
  sub_categories: any;
  total_products: number;
  image: string;
}) => {
  return (
    <div className="bg-slate-200 border flex flex-col items-center w-[300px] h-auto gap-5 justify-center border-slate-200 rounded-md p-4">
      <img alt="" src={image} width={100} height={100} />
      <h1 className="font-semibold text-xl">{name}</h1>
      <button className="bg-black hover:bg-white hover:text-black border border-black hover:border-black text-white px-5 py-1 text-md font-semibold ">
        Categories
      </button>
      <button className="bg-black hover:bg-white hover:text-black border border-black hover:border-black text-white px-5 py-1 text-md font-semibold ">
        Sub-Categories
      </button>
      <h1>Total Products : {total_products}</h1>
    </div>
  );
};

const AddBrand = () => {
  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    categories: [],
    sub_categories: [],
  });
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getBrands();
      setBrands(data);
      setFilteredBrands(data);
      console.log(data);
      setLoading(false);
    };
    fetchBrands();
  }, []);

  const handleAddBrand = async () => {
    setDisabled(true);
    const response = await addBrand(inputs);
    if (response) {
      toast.success("Brand Added Successfully");
      setDisabled(false);
      setIsBrandModalOpen(false);
    } else {
      toast.error("Failed to add Brand");
      setDisabled(false);
    }
    setIsBrandModalOpen(false);
  };

  useEffect(()=>{
    const filteredResults = brands.filter((brand:any)=>brand.name.toLowerCase().includes(brandName.toLowerCase()));
    setFilteredBrands(filteredResults)
  },[brandName])
  return (
    <div className="w-full flex flex-col gap-3 px-5 py-5">
      <h1 className="font-semibold  text-xl ">All Categories</h1>
      <div className="flex flex-row items-center gap-10">
        <input
        value={brandName}
        onChange={(e:any)=>setBrandName(e.target.value)}
          type="text"
          placeholder="Search Category"
          className="border border-slate-200 p-2 rounded-md w-[60%]"
        />
        <button
          onClick={() => setIsBrandModalOpen(true)}
          className="bg-black px-10 py-2 text-white border border-black hover:bg-white hover:text-black font-semibold text-lg"
        >
          Add Brand
        </button>
      </div>

      <div className="flex flex-row flex-wrap w-full  items-center gap-20 px-10 py-10">
        {loading ? (
          <PuffLoader color="red" size={40} />
        ) : (
          filteredBrands.map((brand: any, index: number) => {
            return (
              <BrandTab
                key={index}
                name={brand.name}
                image={brand.image}
                categories={brand.categories}
                sub_categories={brand.sub_categories}
                total_products={brand.total_products}
              />
            );
          })
        )}
      </div>
      <BrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        substance={<AddBrandBody inputs={inputs} setInputs={setInputs} />}
        disabled={disabled}
        onSubmit={handleAddBrand}
      />
    </div>
  );
};

const AddBrandBody = ({
  inputs,
  setInputs,
}: {
  inputs: any;

  setInputs: any;
}) => {
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
      <FormElement
        name="Image"
        id="image"
        type={"text"}
        value={inputs.image}
        width="60%"
        onChange={(e: any) => setInputs({ ...inputs, image: e.target.value })}
      />
    </div>
  );
};

export default AddBrand;
