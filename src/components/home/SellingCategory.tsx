import { useCart } from "@/lib/store/cart";
import { useUser } from "@/lib/store/user";
import { ICart } from "@/lib/types/cart";
import { addToCart } from "@/utils/functions/addToCart";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdCart } from "react-icons/io";

const Brand = ({ brand }: { brand: any }) => {
  return (
    <Link
      href={`/products/brands/${brand.name}`}
      className="flex flex-col items-center gap-2"
    >
      <div className=" bg-white rounded-full border hover:bg-slate-100 border-slate-300 p-4 py-6">
        <img src={brand.image} width={80} height={80} alt="" />
      </div>
      <h1 className="text-xs">{brand.name}</h1>
    </Link>
  );
};

const ProductCard = ({ product }: { product: any }) => {
  console.log(product);
  const user = useUser((state) => state.user);
  const setCart: any = useCart((state) => state.setCart);
  const handleAddToCart = async () => {
    const productDetails = {
      customer_id: user?._id,
      product_id: product?._id,
      name: product?.name,
      quantity: 1,
      price: product?.price,
      mrp: product?.mrp,
      image: product?.image,
      description: product?.description,
      vendor_id: product?.vendor_id,
    };

    const cartDetails: any = {
      name: product?.name,
      description: product?.description,
      image: product?.image,
      price: product?.price,
      mrp: product?.mrp,
      quantity: 1,
      product_id: product?._id,
      _id: "",
    };

    console.log(productDetails);

    const data: any = await addToCart(user?._id!, productDetails, "add");
    setCart((prev: ICart[]) => [...prev, cartDetails]);
    toast.success("Product added to cart!");
    console.log(data);
  };
  const percentageOff = ((1 - product.price / product.mrp) * 100).toFixed(2);
  return (
    <div className="flex flex-col items-start gap-3 bg-white p-4  w-[140px] md:w-[250px] rounded-xl">
      <Toaster position="bottom-right" />
      <img
        src={product.image}
        className="mx-auto"
        width={200}
        height={80}
        alt=""
      />
      <Link
        href={`/products/${product.category}/${product._id}`}
        className="text-xs"
      >
        {product.name}
      </Link>
      <h1 className="font-semibold text-sm">₹{product.mrp}</h1>
      <div className="flex flex-col items-start gap-1">
        <s className="text-xs">₹{product.price}</s>
        <h1 className="text-xs  text-green-500">{percentageOff}% off</h1>
      </div>
      <div className="flex flex-row justify-evenly w-full px-2 items-center">
        <button
          onClick={handleAddToCart}
          className="bg-white p-2 rounded-xl border border-black "
        >
          <IoMdCart size={20} color="black" />
        </button>
        <Link
          href={`/checkout/${product?._id}?quantity=1`}
          className="bg-black text-white hover:bg-white hover:border-black hover:text-black text-sm px-5 py-2 font-semibold rounded-xl border border-black "
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

const SpecialCategory = ({ category }: { category: any }) => {
  return (
    <Link
      href={`/products/categories/${category.name}`}
      className="bg-[#ffedcb] border px-5 pt-5 pb-10 rounded-xl flex flex-col items-center gap-1"
    >
      <img src={category.image} width={200} height={100} alt="" />
      <h1 className="font-semibold text-sm">{category.name}</h1>
      <h1 className="text-xs">Explore Now</h1>
    </Link>
  );
};

const CategoriesAssemble = ({ categories }: { categories: any }) => {
  return (
    <div className="grid grid-cols-2 md:flex flex-row flex-wrap items-center gap-5">
      {categories.slice(0, 4).map((category: any, index: number) => {
        return <SpecialCategory category={category} key={index} />;
      })}
    </div>
  );
};

const TopBrands = ({ brands }: { brands: any }) => {
  const slicedBrands = brands.slice(0, 3);
  const moreBrands = brands.length - slicedBrands?.length;
  return (
    <div className="flex flex-col items-start rounded-xl border gap-2 bg-white px-5 py-3">
      <h1 className="font-semibold text-start text-sm">
        Top Brands & Related Categories
      </h1>
      <div className="grid grid-cols-2 md:flex flex-row flex-wrap w-full items-center gap-3">
        {slicedBrands.map((brand: any, index: number) => {
          return <Brand brand={brand} />;
        })}
        {moreBrands > 0 && (
          <Link
            href={`/products/brands`}
            className="flex flex-col  items-center gap-2"
          >
            <div className=" bg-white font-semibold rounded-full hover:bg-slate-100 text-center border text-xl flex self-start border-slate-300 px-8 py-10">
              {moreBrands}+ <br /> more
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
const SellingCategory = ({ product }: { product: any }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-5 p-4 bg-white ">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="font-semibold text-lg">{product.category}</h1>
        <Link
          href={`/products/${product.category}`}
          className="font-semibold text-sm bg-red-300 text-red-600 px-2 py-1 rounded-lg"
        >
          VIEW ALL
        </Link>
      </div>

      <div className="flex bg-[#efeff4] w-full flex-col items-start justify-center gap-5 ">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-2 px-4 py-4">
          <TopBrands brands={product.brands} />
          <CategoriesAssemble categories={product.sub_categories} />
        </div>

        <div className="px-2 md:px-4 pb-4 flex flex-row flex-wrap  gap-2 md:gap-3 items-center  justify-center">
          {product
            .products![0]!.slice(0, 6)
            .map((productData: any, index: number) => {
              return <ProductCard product={productData} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SellingCategory;
