"use client";
import { approveProduct } from '@/utils/functions/approveProduct';
import { getProductsForAdmin } from '@/utils/functions/getProductsForAdmin';
import React, { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners';

const page = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalData, setModalData] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [filteredResults, setFilteredResults] = useState<any>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const response = await getProductsForAdmin();
            setProducts(response);
            setFilteredResults(response);
            setLoading(false);
        }
        fetchProducts();
    }, [])
  return (
    <div className="flex flex-col items-center w-full justify-center mx-auto gap-10">
      <h1 className="font-semibold text-3xl text-center">Product Publishment Requests</h1>
      {loading ? (
        <div className="min-h-[60vh] flex flex-col justify-center items-center">
          <PuffLoader size={40} color="#000" />{" "}
        </div>
      ) : (
        <div className="overflow-x-auto px-3 w-full mx-auto">
          <table className="w-full oveflow-x-auto table-auto border border-gray-300 rounded-xl">
          <thead className="bg-red-600 text-white font-sans tracking-wider">
              <tr className="text-center py-4">
                <th className="py-4">Sl. No.</th>

                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
<th>MRP</th>
<th>Admin Approval</th>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>Brand</th>
                <th>Details</th>
                <th>View</th>
                {/* <th>Registered at</th> */}
              </tr>
            </thead>
            {!(filteredResults?.length > 0) ?  
              <div className="min-h-[80vh] flex flex-col items-center justify-center mx-auto w-full text-red-600 font-semibold text-lg">No Pending Requests Yet !</div>
              : filteredResults.map((product: any, index: number) => {
                return (
            <tbody className="font-sans tracking-wide">
             
           
                    <tr
                      key={index}
                      className={
                        product.admin_approval
                          ? "bg-green-100 text-green-500 font-semibold text-center text-sm"
                          : "cursor-pointer bg-red-100 text-red-500 font-semibold text-sm text-center hover:bg-red-200 hover:text-red-600"
                      }
                    >
                      <td className="border text-lg border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>

                      <td className="border text-lg border-gray-300 px-4 py-2">
                        {product.name}
                      </td>
                      <td className="border text-lg border-gray-300 px-4 py-2">
                        {product.stock_count}
                      </td>
                      <td className="border text-lg border-gray-300 px-4 py-2">
                      ₹ {product.price}
                      </td>
                      <td className="border text-lg border-gray-300 px-4 py-2">
                      ₹ {product.mrp}
                      </td>
                      <td className="border text-lg border-gray-300 px-4 py-2">
                        {product.admin_approval
                          ? "Verified"
                          : "Not Verified"}
                      </td>
                      <td className="border text-lg border-gray-300 px-4 py-2">
                        {product.category}
                      </td>
                      <td className="border text-lg border-gray-300 px-4 py-2">
                        {product.sub_category}
                      </td>
                      <td className="border text-lg border-gray-300 px-4 py-2">
                        {product.brand}
                      </td>

                      <td
                        className="border text-lg border-gray-300 px-4 py-2"
                        onClick={() => {
                          setModalData(product);
                          setIsOpen(true);
                        }}
                      >
                        {product.admin_approval ? (
                          <button className="font-semibold px-5 py-1 bg-black text-white rounded-lg hover:bg-white hover:text-black border border-black hover:border-black">
                          Reject
                        </button>
                        ) : (
                          <button className="font-semibold px-5 py-1 bg-black text-white rounded-lg hover:bg-white hover:text-black border border-black hover:border-black">
                            Approve
                          </button>
                        )}
                      </td>
                     
                      <td className="border text-lg border-gray-300 px-4 py-4">
                        <button onClick={()=>{setIsOpen(true)
                          setModalData(product)
                        }} className="font-semibold px-5 py-1 bg-black text-white rounded-lg hover:bg-white hover:text-black border border-black hover:border-black">
                          View Details
                        </button>
                      </td>
                      {/* <td className="border border-gray-300 py-2">
                      {new Date(registration.created_at).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </td> */}
                    </tr>
             
               
             
            </tbody>
             ); })}
          </table>
        </div>
      )}
      <ApproveModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={modalData}
        setFilteredResults={setFilteredResults}
      />
    </div>
  )
}

const ApproveModal = ({
    isOpen,
    onClose,
    data,
    setFilteredResults,
  }: {
    isOpen: boolean;
    onClose: () => void;
    data: any;
    setFilteredResults: any;
  }) => {
    const [imageUrl, setImageUrl] = useState<any>("");
    const [loaded, setLoaded] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
  
    useEffect(() => {
      setImageUrl(data?.image);
    }, [data]);
  
    const handleApprove = async () => {
        setDisabledButton(true);
        const details = await approveProduct(data._id);
        console.log(details);
        setDisabledButton(false);
        const orderData = await getProductsForAdmin();
        setFilteredResults(orderData);
        setImageUrl("");
        onClose();
        setLoaded(false);
    };
  
    return (
      <>
        {isOpen && (
          <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
            <div
              className={`bg-gray-100 p-4 rounded-lg h-[60%]
              w-[90%] flex flex-col items-start md:w-[30%] `}
            >
              <div className="w-full flex flex-row mb-2 items-center justify-between">
                <h2 className="text-lg font-semibold">Approve Product</h2>
                <h2
                  onClick={onClose}
                  className="bg-black md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-black border-2 border-black  text-white text-sm font-semibold rounded-full cursor-pointer"
                >
                  X
                </h2>
              </div>
  
              <div className="h-full overflow-y-scroll flex flex-col gap-3 my-1 py-2 px-1 w-full mx-auto">
                <h1 className="font-semibold text-sm">Order ID : {data._id}</h1>
                <h1 className="font-semibold text-sm">
                  Customer ID : {data.vendor_id}
                </h1>
                <h1 className="font-semibold text-sm">
                  Name : {data.name}
                </h1>
                <h1 className="font-semibold text-sm">Quantity : {data?.stock_count} </h1>
                <h1 className="font-semibold text-sm">Price : {data?.price} </h1>
                
                <h1 className="font-semibold text-sm">
                  MRP : {data.mrp!}
                </h1>
  
                {imageUrl && (
                  <img
                    src={imageUrl && imageUrl}
                    alt="Team Image"
                    width={300}
                    height={300}
                    onLoad={() => setLoaded(true)}
                    className="border-2 border-gray-600 mx-auto  rounded-lg object-cover"
                  />
                )}
              </div>
              {data?.admin_approval == false && <div className="mt-5 w-full flex flex-row items-center justify-center gap-5">
                <button
                  className="w-full rounded-md bg-red-400 font-semibold px-4 py-2 text-white shadow-md hover:bg-red-600"
                  onClick={() => {
                    onClose();
                    setImageUrl("");
                    setLoaded(false);
                  }}
                >
                  Reject
                </button>
                <button
                  className="w-full rounded-md bg-green-400 px-4 py-2 text-white shadow-md hover:bg-green-600"
                  onClick={handleApprove}
                >
                  {disabledButton ? (
                    <div className="flex flex-col items-center w-full mx-auto">
    <PuffLoader size={20} color="white" />
                    </div>
                  
                  ) : (
                    "Accept"
                  )}
                </button>
              </div>}
            </div>
          </div>
        )}
      </>
    );
  };

export default page