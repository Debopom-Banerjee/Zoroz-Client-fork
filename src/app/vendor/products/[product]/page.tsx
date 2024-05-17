"use client";
import React, { useEffect, useMemo, useState } from "react";

import {
  TbSquareRoundedMinusFilled,
  TbSquareRoundedPlusFilled,
} from "react-icons/tb";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { addProduct } from "@/utils/functions/addProduct";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { getBrands } from "@/utils/functions/getBrands";

import { getCategories } from "@/utils/functions/getCategories";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/lib/store/user";
import FeatureAddForm from "@/components/admin/FeatureAddForm";
import FeatureChip from "@/components/admin/FeatureChip";
import SelectInput from "@/components/common/SelectInput";
import FormElement from "@/components/common/FormElement";
import { getProductById } from "@/utils/functions/getProductById";
import { PuffLoader } from "react-spinners";
import { updateProduct } from "@/utils/functions/updateProduct";

export interface FeaturesType {
  feature: string;
  value: string;
}

const page = () => {
  const productId = useParams().product.toLocaleString();

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [featureAddOpen, setFeatureAddOpen] = useState(false);
  const user = useUser((state) => state.user);
  const [categories, setCategories] = useState<any>([]); // [ {id: 1, name: "Electronics"}, {id: 2, name: "Clothing"}
  const [brands, setBrands] = useState<any>([]); // [ {id: 1, name: "Electronics"}, {id: 2, name: "Clothing"}
  const [isSpecificationFormOpen, setIsSpecificationFormOpen] = useState(false);
  const [inputs, setInputs] = useState<any>({
    category: "",
    name: "",
    sub_category: "",
    price: "",
    description: "",
    mrp: "",
    stock_count: "",
    image: "",
    video_link: "",
    features: [],
    specifications: [],
    reviews: [],
    benefits: [],
    brand: "",
    brandImage: "",
    warranty: "",
    vendor_id: "",
  });
  console.log(inputs);
  const handleQuillChange = (value: string, name: string) => {
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleAddSpecification = (feature: FeaturesType) => {
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      specifications: [...prevInputs.specifications, feature],
    }));
  };

  const handleRemoveSpecification = (index: number) => {
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      specifications: prevInputs.specifications.filter(
        (_: any, idx: number) => idx !== index
      ),
    }));
  };
  const handleAddBenefits = () => {
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      benefits: [...prevInputs.benefits, ""],
    }));
  };

  const handleChangeBenefit = (benefit: string, index: number) => {
    setInputs((prevInputs: any) => {
      const updatedBenefits = [...prevInputs.benefits];
      updatedBenefits[index] = benefit;
      return { ...prevInputs, benefits: updatedBenefits };
    });
  };

  const handleRemoveBenefit = (index: number) => {
    setInputs((prevInputs: any) => {
      const updatedBenefits = [...prevInputs.benefits];
      updatedBenefits.splice(index, 1);
      return { ...prevInputs, benefits: updatedBenefits };
    });
  };

  const handleAddFeature = () => {
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      features: [...prevInputs.features, ""],
    }));
  };

  const handleChangeFeature = (feature: string, index: number) => {
    setInputs((prevInputs: any) => {
      const updatedFeatures = [...prevInputs.features];
      updatedFeatures[index] = feature;
      return { ...prevInputs, features: updatedFeatures };
    });
  };

  const handleRemoveFeature = (index: number) => {
    setInputs((prevInputs: any) => {
      const updatedFeatures = [...prevInputs.features];
      updatedFeatures.splice(index, 1);
      return { ...prevInputs, features: updatedFeatures };
    });
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      const data = await getProductById(productId);
      console.log(data);
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        category: data?.category,
        name: data?.name,
        sub_category: data?.sub_category,
        price: data?.price,
        description: data?.description,
        mrp: data?.mrp,
        stock_count: data?.stock_count,
        image: data?.image,
        video_link: data?.video_link,
        features: data?.features,
        specifications: data?.specifications,
        reviews: data?.reviews,
        benefits: data?.benefits,
        brand: data?.brand,
        brandImage: data?.brandImage,
        warranty: data?.warranty,
        vendor_id: data?.vendor_id,
      }));
      setLoading(false);
    };
    fetchProductDetails();
  }, [productId, user?._id]);

  const router = useRouter();
  useEffect(() => {
    console.log(user);
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      vendor_id: user?._id,
    }));
  }, [user]);
  const handleSubmit = async () => {
    try {
      console.log(user?._id);
      await updateProduct(inputs,productId);
      toast.success("Product Added !");
      router.push("/vendor/products/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchBrands = async () => {
      const brandsData = await getBrands();
      const categoriesData = await getCategories();
      console.log(categoriesData);
      // Assuming categoriesData is an array of category names
      setCategories(categoriesData);
      setBrands(brandsData);
    };
    fetchBrands();
  }, []);

  const [subCategories, setSubCategories] = useState<any>([]);
  useEffect(() => {
    const subs =
      categories.filter(
        (category: any) => category?.name === inputs.category
      )[0]?.sub_categories || [];
    setSubCategories(subs.map((sub: any) => sub.name));
  }, [inputs.category, categories]);

 
  return (
    <div className="p-5 w-4/5 flex min-h-[60vh] flex-col gap-5 items-start bg-white border-2 border-red-600 rounded-xl mx-auto">
      <h1 className="font-semibold text-2xl">Edit Product</h1>
      <Toaster position="bottom-right" />

      {loading ? (
        <div className="flex flex-col items-center mx-auto justify-center min-h-[60vh]">
          <PuffLoader size={30} color="black" />
        </div>
      ) : (
        <>
          <div className=" flex flex-row mx-auto  flex-wrap gap-3 w-full">
            <FormElement
              id="name"
              name="Name"
              value={inputs.name}
              onChange={handleInputChange}
              type="text"
              width="40%"
            />

            <FormElement
              id="mrp"
              name="MRP"
              value={inputs.mrp}
              onChange={handleInputChange}
              type="number"
              width="40%"
            />
            <FormElement
              id="price"
              name="Price"
              value={inputs.price}
              onChange={handleInputChange}
              type="number"
              width="20%"
            />
            <FormElement
              id="stock_count"
              name="Stock Count"
              value={inputs.stock_count}
              onChange={handleInputChange}
              type="number"
              width="20%"
            />
            <FormElement
              id="image"
              name="Image Link"
              value={inputs.image}
              onChange={handleInputChange}
              type="text"
              width="40%"
            />
            <FormElement
              id="video_link"
              name="Video Link"
              value={inputs.video_link}
              onChange={handleInputChange}
              type="text"
              width="40%"
            />

            <FormElement
              id="warranty"
              name="Warranty"
              value={inputs.warranty}
              onChange={handleInputChange}
              type="text"
              width="20%"
            />
          </div>
          <div className="flex flex-row items-center gap-10 justify-center w-full flex-wrap">
            <SelectInput
              id="brand"
              name="Brand"
              value={inputs.brand}
              onChange={(e: any) => {
                handleInputChange(e);
                const brandImageData = brands.filter(
                  (brand: any) => brand.name === e.target.value
                )[0]?.image;

                setInputs((prevInputs: any) => ({
                  ...prevInputs,
                  brandImage: brandImageData,
                }));
              }}
              options={brands.map((cat: any) => cat.name)}
            />
            <SelectInput
              id="category"
              name="Category"
              value={inputs.category}
              onChange={handleInputChange}
              options={categories.map((cat: any) => cat.name)}
            />
            {subCategories?.length > 0 && (
              <SelectInput
                id="sub_category"
                name="Sub-Category"
                value={inputs.sub_category}
                onChange={handleInputChange}
                options={subCategories}
              />
            )}
          </div>
          <div className="flex flex-col items-start gap-1 w-full md:gap-5 flex-wrap justify-start">
            <label htmlFor={"description"} className="font-semibold md:text-xl">
              Description :
            </label>
            <ReactQuill
              theme="snow"
              value={inputs.description}
              className="w-full   text-red-600"
              onChange={(value) => handleQuillChange(value, "description")}
            />
          </div>
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col  items-start gap-2 text-red-600">
              <label
                htmlFor={"specifications"}
                className="font-semibold flex flex-row items-center gap-2  text-base md:text-lg"
              >
                Specifications :
                {inputs.specifications.length == 0 && (
                  <div className="font-semibold">
                    <TbSquareRoundedPlusFilled
                      onClick={() => setIsSpecificationFormOpen(true)}
                      className="font-semibold cursor-pointer rounded-full"
                      size={30}
                    />
                  </div>
                )}
              </label>
              <div className="flex flex-col items-start">
                {inputs.specifications.length > 0 &&
                  inputs.specifications.map(
                    (feature: FeaturesType, index: number) => {
                      return (
                        <FeatureChip
                          name={feature.feature}
                          link={feature.value}
                          index={index}
                          handleAddFeature={handleAddSpecification}
                          handleRemoveFeature={handleRemoveSpecification}
                          isFeatureFormOpen={isSpecificationFormOpen}
                          setIsFeatureFormOpen={setIsSpecificationFormOpen}
                        />
                      );
                    }
                  )}
              </div>
            </div>

            <div className="flex flex-col  items-start gap-2 text-red-600">
              <label
                htmlFor={"benefits"}
                className="font-semibold flex flex-row items-center gap-2  text-base md:text-lg"
              >
                Benefits :
                {inputs.benefits.length == 0 && (
                  <div className="font-semibold">
                    <TbSquareRoundedPlusFilled
                      onClick={() => handleAddBenefits()}
                      className="font-semibold cursor-pointer rounded-full"
                      size={30}
                    />
                  </div>
                )}
              </label>
              {inputs.benefits.length > 0 &&
                inputs.benefits.map((benefit: string, index: number) => (
                  <div
                    key={index}
                    className="flex flex-row flex-wrap items-center gap-2"
                  >
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) =>
                        handleChangeBenefit(e.target.value, index)
                      }
                    />
                    <TbSquareRoundedPlusFilled
                      onClick={() => handleAddBenefits()}
                      className="cursor-pointer"
                      size={30}
                    />
                    <TbSquareRoundedMinusFilled
                      onClick={() => handleRemoveBenefit(index)}
                      className="cursor-pointer"
                      size={30}
                    />
                  </div>
                ))}
            </div>

            <div className="flex flex-col  items-start gap-2 text-red-600">
              <label
                htmlFor={"features"}
                className="font-semibold flex flex-row items-center gap-2  text-base md:text-lg"
              >
                Features :
                {inputs.features.length == 0 && (
                  <div className="font-semibold">
                    <TbSquareRoundedPlusFilled
                      onClick={() => handleAddFeature()}
                      className="font-semibold cursor-pointer rounded-full"
                      size={30}
                    />
                  </div>
                )}
              </label>
              {inputs.features.length > 0 &&
                inputs.features.map((feature: string, index: number) => (
                  <div
                    key={index}
                    className="flex flex-row flex-wrap items-center gap-2"
                  >
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleChangeFeature(e.target.value, index)
                      }
                    />
                    <TbSquareRoundedPlusFilled
                      onClick={() => handleAddFeature()}
                      className="cursor-pointer"
                      size={30}
                    />
                    <TbSquareRoundedMinusFilled
                      onClick={() => handleRemoveFeature(index)}
                      className="cursor-pointer"
                      size={30}
                    />
                  </div>
                ))}
            </div>
          </div>

          <FeatureAddForm
            handleAddFeature={handleAddSpecification}
            isOpen={isSpecificationFormOpen}
            onClose={() => setIsSpecificationFormOpen(false)}
          />
          <button
            className="w-1/2 md:w-1/3 lg:w-1/5 rounded-xl font-semibold  bg-red-500 text-white py-3 text-lg hover:bg-white border-2 hover:border-2 border-red-500 hover:text-red-500  mx-auto "
            onClick={handleSubmit}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default page;
