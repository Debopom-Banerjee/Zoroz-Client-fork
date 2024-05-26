"use client";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import ProductView from "@/components/products/ProductView";
import { getProductsByCategory } from "@/utils/functions/getProductsByCategory";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const page = () => {
  const [productData, setProductData] = useState<any>([]);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(0);
  const [minPriceFilter, setMinPriceFilter] = useState<number>(0);
  const categoryString = useParams().category.toLocaleString();
  const category = decodeURIComponent(categoryString);
  const [filterProducts, setFilteredProducts] = useState<any>([]);
  const [priceOptions, setPriceOptions] = useState<number[]>([0]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProductsByCategory(categoryString);
      setProductData(data);
      setFilteredProducts(data);
      console.log(data);

      // Calculate the lowest and highest prices
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
  }, [categoryString]);

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
  return (
    <>
      <Navbar />
      <div className="w-5/6 flex flex-col md:flex-row gap-5 items-start mx-auto my-10">
        <div className="bg-white px-10 py-5 max-md:w-full mx-auto flex flex-col items-center justify-center  rounded-lg">
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
        <div className="flex flex-col bg-white items-start gap-5 mx-auto justify-center rounded-xl w-full px-5 py-5  ">
          <h1 className="font-semibold text-2xl">{category}</h1>
          <div className="flex flex-row flex-wrap gap-5 md:gap-3 items-center self-center justify-center mx-auto w-full">
            {loading ? (
              <div className="min-h-[80vh] flex flex-col items-center justify-center ">
                <PuffLoader size={35} color="black" />
              </div>
            ) : (
              filterProducts.length > 0 ? 
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
