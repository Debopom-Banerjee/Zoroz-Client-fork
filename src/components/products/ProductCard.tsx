import Image from "next/image";
import React from "react";

const ProductCard = () => {
  return (
    <div className="flex flex-row items-start py-10 px-10 justify-center w-full mx-auto">
      <div className="flex flex-row w-[60%] py-5 bg-white mx-auto justfiy-center flex-wrap gap-5">
        <div className="md:w-2/5">
          <Image
            src={"/assets/home/chair.jpg"}
            width={600}
            height={100}
            alt=""
          />
        </div>
        <div className="flex md:w-1/2 flex-col items-start gap-5">
          <h1 className="font-semibold text-2xl">
            Schneider Electric Livia 25A White Motor Starter Switch, P1186MS
          </h1>
          <h1 className="text-lg font-semibold">
            ₹533 <span className="text-gray-400 text-md"> + ₹96 GST</span>
          </h1>
          <h1>
            MRP <s>₹1,353 </s>
            <span className="text-green-400 text-md">53% OFF</span>{" "}
          </h1>
          <div className="border border-gray-400 rounded-xl px-5 py-5">
            <h1 className="font-semibold text-xl">About This Product</h1>
            <hr className="" />
            <h1 className="text-lg font-semibold">Key Features</h1>
            <ul className="flex flex-col items-start gap-1">
              <li>Flat Edge Design.</li>
              <li>Robust & Strong Design.</li>
              <li>Tastefully Selected Range of Colour Plates.</li>
            </ul>
          </div>
          <div className="border border-gray-400 rounded-xl px-5 py-5">
            <h1 className="text-lg font-semibold">Key Features</h1>
            <table className="">
              <tr>
                <td>Brand : </td>
                <td>Schneider Electric</td>
              </tr>
              <tr>
                <td>Colour :</td>
                <td>White</td>
              </tr>
              <tr>
                <td>Finish :</td>
                <td>Glossy</td>
              </tr>
            </table>
          </div>
          <h1 className="text-lg font-semibold">Product Details</h1>
          <p>
            The Schneider Electric Livia 25A White Motor Starter Switch is a
            reliable and easy-to-use switch that is perfect for starting motors.
            It features a durable design that is built to last, and it is easy
            to install and use. Looking for a starter switch that is rated for a
            current up to 25 amps? Then Schneider's starter switch is perfect
            for you! It is also one of the most affordable options on Moglix,
            making it a great choice for budget-conscious shoppers.
            Additionally, this switch is white in colour and has a long life, so
            you can rest assured knowing that...
          </p> 
        </div>
      </div>
      <div className="bg-white w-[20%] flex flex-col gap-2 px-5 py-5 rounded-xl border-xl">
      <h1 className="text-lg font-semibold">
            ₹533 <span className="text-gray-400 text-md"> + ₹96 GST</span>
          </h1>
          <h1>
            MRP <s>₹1,353 </s>
            <span className="text-green-400 text-md">53% OFF</span>{" "}
          </h1>
          <div className="flex flex-row items-center gap-2">
            <button className="bg-gray-400 px-2 rounded-xl border border-gray-400">-</button>
            <h1>1</h1>
            <button className="bg-gray-400 px-2 rounded-xl border border-gray-400">+</button>
          </div>
          <button className="bg-sky-500 w-1/2 mx-auto px-5 text-white py-2 rounded-xl font-semibold">
            Add to Cart
          </button>
          <button className="bg-red-500 w-1/2 mx-auto text-white px-5 py-2 rounded-xl font-semibold">
            Buy Now 
          </button>
      </div>
    </div>
  );
};

export default ProductCard;
