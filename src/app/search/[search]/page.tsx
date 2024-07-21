"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/home/Footer";
import { getSearchData } from "@/utils/functions/getSearchData";
import ProductView from "@/components/products/ProductView";
import { PuffLoader } from "react-spinners";
import { CategoryCard } from "@/components/products/CategoryCard";
import { BrandCard } from "@/components/products/BrandCard";

const Tabs = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}) => {
  const tabs = ["All", "Products", "Categories", "Brands"];

  return (
    <div className="flex flex-row gap-5">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setSelectedTab(tab)}
          className={`text-sm text-gray-500 focus:outline-none ${
            selectedTab === tab
              ? "bg-red-300 text-red-600 font-semibold"
              : "hover:bg-gray-200"
          } rounded-md px-4 py-2 transition-colors duration-300`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const Page = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    products: [],
    categories: [],
    brands: [],
  });
  const { search }: { search: string } = useParams();

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
      const data = await getSearchData(search);
      setSearchResults(data); // Assuming getSearchData returns an object with products, categories, brands
        setLoading(false);
    };
    fetchData();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-5 items-start py-10 px-3 md:px-5 lg:px-10">
        <h1 className="font-semibold text-3xl">Search Results</h1>
        <div className="bg-white rounded-md w-full px-3 md:px-5 lg:px-10 py-5">
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {/* Render content based on selected tab */}
          {loading ? 
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <PuffLoader size={30} color="black" />
            </div>
          :
            <div className="mt-5">
            {selectedTab === "All" && (
              <div className="flex flex-col items-start gap-5">
                 <h1 className="font-semibold text-2xl">Categories</h1>
                {searchResults?.categories?.length > 0 ? <div className="grid grid-cols-1 justify-center items-center w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {searchResults?.categories?.length > 0 &&
                    searchResults?.categories?.map((category: any, index) => (
                      <CategoryCard key={index} category={category} />
                    ))}
                </div> : <h1 className="text-center w-full text-red-600 justify-center flex h-[20vh]">No Categories found</h1>}
                <h1 className="font-semibold text-2xl">Brands</h1>
                {searchResults?.brands?.length > 0 ?  <div className="grid grid-cols-1 justify-center items-center w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {searchResults?.brands?.length > 0 &&
                    searchResults?.brands?.map((brand: any, index) => (
                        <div key={index}>
                            <BrandCard brand={brand} />
                        </div>
                    ))}
                </div>: <h1 className="text-center w-full text-red-600 justify-center flex h-[20vh]">No Brands found</h1>}
                <h1 className="font-semibold text-2xl">Products</h1>
                {searchResults?.products?.length > 0 ? <div className="grid grid-cols-1 justify-center items-center w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {searchResults?.products?.length > 0 &&
                    searchResults?.products?.map((product: any, index) => {
                      return <ProductView product={product} key={index} />;
                    })}
                </div> : <h1 className="text-center w-full text-red-600 justify-center flex h-[20vh]">No products found</h1>}
               
              </div>
            )}
         {selectedTab === "Products" && (
    <>
        {searchResults?.products?.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {searchResults.products.map((product: any, index: number) => (
                    <ProductView product={product} key={index} />
                ))}
            </div>
        ) : (
            <h1 className="text-center text-red-600 h-[20vh] flex items-center justify-center">
                No products found
            </h1>
        )}
    </>
)}

{selectedTab === "Categories" && (
    <>
        {searchResults?.categories?.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {searchResults.categories.map((category: any, index: number) => (
                    <CategoryCard key={index} category={category} />
                ))}
            </div>
        ) : (
            <h1 className="text-center text-red-600 h-[20vh] flex items-center justify-center">
                No categories found
            </h1>
        )}
    </>
)}

{selectedTab === "Brands" && (
    <>
        {searchResults?.brands?.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {searchResults.brands.map((brand: any, index: number) => (
                    <div key={index}>
                        <BrandCard  brand={brand} />
                    </div>
                ))}
            </div>
        ) : (
            <h1 className="text-center text-red-600 h-[20vh] flex items-center justify-center">
                No brands found
            </h1>
        )}
    </>
)}

          </div>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
