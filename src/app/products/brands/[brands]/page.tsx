"use client";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import ProductView from "@/components/products/ProductView";
import { getProductsByBrand } from "@/utils/functions/getProductsByBand";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { PuffLoader } from "react-spinners";

const page = () => {
  const [productData, setProductData] = useState<any>([]);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(0);
  const [minPriceFilter, setMinPriceFilter] = useState<number>(0);
  const [filterProducts, setFilteredProducts] = useState<any>([]);
  const [priceOptions, setPriceOptions] = useState<number[]>([0]);
  const [productName,setProductName] = useState("");
  const brand = useParams().brands.toLocaleString();
  console.log(brand);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsByBrand(brand);
      console.log(data);
      setProductData(data);
      if (data.length > 0) {
        const prices = data.map((product: any) => product.price);
        const minPrice = Math.floor(Math.min(...prices) / 100) * 100;
        const maxPrice = Math.ceil(Math.max(...prices) / 100) * 100;
        setMinPriceFilter(minPrice);
        setMaxPriceFilter(maxPrice);
        // Generate price options
        const step = 400; // You can adjust this step value as needed
        const options = [];
        for (let price = minPrice; price <= maxPrice; price += step) {
          options.push(price);
        }
        setPriceOptions(options);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [brand]);

  useEffect(() => {
    const filteredData = () => {
      const filtered = productData.filter((product: any) => {
        const price = product.price;
        const min = minPriceFilter || 0;
        const max = maxPriceFilter || Infinity;
        return price >= min && price <= max;
      });
      setFilteredProducts(filtered);
    };

    filteredData();
  }, [minPriceFilter, maxPriceFilter, productData]);

  useEffect(()=>{
    const filteredResults = productData.filter((product:any)=>product?.name.toLowerCase().includes(productName.toLowerCase()))
    setFilteredProducts(filteredResults)
  },[productName, productData])
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col md:flex-row gap-5 items-start mx-auto my-10">
        <div className="bg-white px-10 py-5 max-md:w-full md:w-1/6 mx-auto flex flex-col items-center justify-center  rounded-lg">
          <h1 className="font-semibold text-lg">Filters</h1>
          <div className="flex flex-col items-start gap-3">
            <h1 className="font-semibold">Price:</h1>
            <label>Lowest: </label>
            <select
              name="lowestPrice"
              value={minPriceFilter}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setMinPriceFilter(parseInt(event.target.value));
              }}
            >
              <option value={0} defaultValue={0}>
                Select
              </option>
              {priceOptions.map((price, index) => (
                <option key={index} value={price}>
                  {price}
                </option>
              ))}
            </select>
            <label>Highest: </label>
            <select
              name="highestPrice"
              value={maxPriceFilter}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setMaxPriceFilter(parseInt(event.target.value));
              }}
            >
              <option value={0} defaultValue={0}>
                Select
              </option>
              {priceOptions.map((price, index) => (
                <option key={index} value={price}>
                  {price}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col bg-white items-start gap-5 mx-auto justify-center rounded-xl w-full px-5 py-5 lg:w-full ">
          <div className="flex flex-row w-full items-center justify-between flex-wrap-reverse">
          <h1 className="font-semibold text-2xl">{brand}</h1>

 <div className="w-[40%] hidden md:flex flex-row items-center relative  ">
          <input
            type="text"
            value={productName}
            onChange={(e)=>setProductName(e.target.value)}
            placeholder="Search for products, brands and more"
            className="w-full p-2 border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <div className="bg-red-500 h-full absolute rounded-tr-md cursor-pointer hover:bg-opacity-80 rounded-br-md right-0 top-0 w-10 mx-auto ">
            <FaSearch size={25} className="text-white w-full h-full p-2 " />
          </div>
        </div>
          </div>
          
          <div className="flex flex-row flex-wrap gap-5 md:gap-10 lg:gap-3 items-center self-center justify-center mx-auto w-full">
            {loading ? (
              <div className="min-h-[80vh] flex flex-col items-center justify-center ">
                <PuffLoader size={35} color="black" />
              </div>
            ) : ( filterProducts?.length > 0 ?
              filterProducts.map((product: any, index: number) => {
                return <ProductView product={product} key={index} />;
              })
              :
              <div className="flex flex-col items-center justify-center mx-auto">
              <h1 className="font-semibold text-red-600 text-lg my-20">No Products Found !</h1>
           </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
