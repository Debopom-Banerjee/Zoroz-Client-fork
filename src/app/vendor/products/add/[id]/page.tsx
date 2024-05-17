"use client";
import FeatureAddForm from '@/components/admin/FeatureAddForm';
import FeatureChip from '@/components/admin/FeatureChip';
import FormElement from '@/components/common/FormElement';
import SelectInput from '@/components/common/SelectInput';
import "react-quill/dist/quill.snow.css";
import { useUser } from '@/lib/store/user';
import { addProduct } from '@/utils/functions/addProduct';
import { getBrands } from '@/utils/functions/getBrands';
import { getCategories } from '@/utils/functions/getCategories';
import { getProductById } from '@/utils/functions/getProductById';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { TbSquareRoundedMinusFilled, TbSquareRoundedPlusFilled } from 'react-icons/tb';
import { PuffLoader } from 'react-spinners';
import { addCopyProductByVendor } from '@/utils/functions/addCopyProductByVendor';
export interface FeaturesType {
    feature: string;
    value: string;
  }
  
  const page = () => {
    const productId = useParams().id.toLocaleString();
    const [loading, setLoading] = useState(true);
    const ReactQuill = useMemo(
      () => dynamic(() => import("react-quill"), { ssr: false }),
      []
    );
    const [featureAddOpen, setFeatureAddOpen] = useState(false);
    const user = useUser((state)=>(state.user));
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
      warranty: "",
      vendor_id:""
    });
    console.log(inputs)

    useEffect(() => {
        const fetchProductId = async () => {
            setLoading(true);
            const productData = await getProductById(productId);
            console.log(productData)
            setInputs((prevInputs: any) => ({
                ...prevInputs,
                category: productData.category,
                name: productData.name,
                sub_category: productData.sub_category,
                price: productData.price,
                description: productData.description,
                mrp: productData.mrp,
                stock_count: productData.stock_count,
                image: productData.image,
                video_link: productData.video_link,
                features: productData.features,
                specifications: productData.specifications,
                reviews: productData.reviews,
                benefits: productData.benefits,
                brand: productData.brand,
                warranty: productData.warranty,

              }));
            setLoading(false);
        }
        fetchProductId()
    }, [productId]);

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
  
    const router = useRouter();
    useEffect(()=>{
      console.log(user)
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        vendor_id: user?._id,
      }));
    },[user])
    const handleSubmit = async () => {
      try {
        console.log(user?._id)
       
        await addCopyProductByVendor(inputs);
        toast.success("Product Added !");
        router.push("/vendor/products/all")
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
  
    // useEffect(() => {
    //   setInputs((prevInputs: any) => ({
    //     ...prevInputs,
    //     brandImage:
    //       brands.filter((brand: any) => brand.name === inputs.brand)[0]?.image ||
    //       "",
    //   }));
    // }, [inputs.brand]);
    console.log(inputs);
    return (
        <>
    {loading ?
        <PuffLoader color="#f27474" loading={loading} size={80} className='w-full flex self-center items-center justify-center mx-auto mt-20' />
        :  <div className="p-5 w-4/5 flex flex-col gap-5 items-start bg-white border-2 border-red-600 rounded-xl mx-auto">
        <h1 className="font-semibold text-2xl">Add Product</h1>
        <Toaster position="bottom-right" />
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
            onChange={(e) => {
              handleInputChange(e);
              // const brandImageData = brands.filter((brand:any)=> brand.name === e.target.value)[0]?.image;
  
              // setInputs((prevInputs: any) => ({
              //   ...prevInputs,
              //   brandImage: brandImageData,
              // }));
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
                    onChange={(e) => handleChangeBenefit(e.target.value, index)}
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
                    onChange={(e) => handleChangeFeature(e.target.value, index)}
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
      </div>}
      </>
    );
  };

export default page