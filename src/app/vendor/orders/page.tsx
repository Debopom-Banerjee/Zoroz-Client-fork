"use client";

import { useUser } from "@/lib/store/user";
import { approveOrderByVendor } from "@/utils/functions/approveOrderByVendor";
import { getOrders } from "@/utils/functions/getOrders";
import { getOrdersForVendor } from "@/utils/functions/getOrdersForVendor";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [ordersData, setOrdersData] = useState<any>([]);
  const [modalData, setModalData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState<any>([]);
  const user:any = useUser((state)=>state.user);
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrdersForVendor(user?._id);
      console.log(data);
      setOrdersData(data);
      setFilteredResults(data);
      setLoading(false);
    };
    fetchOrders();
  }, [user]);
  return (
    <div className="flex flex-col items-center w-full justify-center mx-auto gap-10">
      <h1 className="font-semibold text-3xl text-center">Registered Orders</h1>
      {loading ? (
        <div className="min-h-[60vh] flex flex-col justify-center items-center">
          <PuffLoader size={40} color="#000" />{" "}
        </div>
      ) : (
        <div className="overflow-x-auto px-3 w-full mx-auto">
          <table className="w-full oveflow-x-auto table-auto border border-gray-300 rounded-xl">
            <thead>
              <tr className="text-center">
                <th>Sl. No.</th>

                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Vendor Approval</th>
                <th>Admin Approval</th>
                <th>Customer Contact</th>
                <th>Payment Method</th>
                <th>Details</th>
                {/* <th>Registered at</th> */}
              </tr>
            </thead>
            <tbody>
              {!(filteredResults?.length > 0) ?  
              <div className="min-h-[80vh] flex flex-col items-center justify-center w-full">
                <h1 className="text-red-600 font-semibold text-xl w-full">No Orders Yet !</h1></div>
              : filteredResults.map((registration: any, index: number) => {
                return (
                  <>
                    <tr
                      key={index}
                      className={
                        registration.admin_approval
                          ? "bg-green-100 text-green-500 font-semibold text-center text-sm"
                          : "cursor-pointer bg-red-100 text-red-500 font-semibold text-sm text-center hover:bg-red-200 hover:text-red-600"
                      }
                    >
                      <td className="border  border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>

                      <td className="border border-gray-300 px-4 py-2">
                        {registration.product.name}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        {registration.quantity}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration.price}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration.status}
                      </td>
                      <td
                        className="border border-gray-300 px-4 py-2"
                        onClick={() => {
                          console.log(registration)
                          setModalData(registration);
                          setIsOpen(true);
                        }}
                      >
                        {registration.vendor_approval ? (
                          "Verified"
                        ) : (
                          <button className="font-semibold px-5 py-1 bg-black text-white rounded-lg hover:bg-white hover:text-black border border-black hover:border-black">
                            Approve
                          </button>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {registration.admin_approval
                          ? "Verified"
                          : "Not Verified"}
                      </td>

                   
                      <td className="border border-gray-300  py-2">
                        {registration && registration?.customer?.phone}
                      </td>
                      <td className="border border-gray-300  py-2">
                        {registration.payment_method}
                      </td>
                      <td className="border border-gray-300  py-2">
                        <button onClick={()=>{
                          setIsOpen(true)
                          setModalData(registration);
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
                  </>
                );
              })}
            </tbody>
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
  );
};

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
  console.log(data)
  const [imageUrl, setImageUrl] = useState<any>("");
  const [loaded, setLoaded] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    setImageUrl(data?.product?.image);
  }, [data]);

  const handleApprove = async () => {
    setDisabledButton(true);
    const details = await approveOrderByVendor(data._id);
    console.log(details);
    setDisabledButton(false);
    const orderData = await getOrders();
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
              <h2 className="text-lg font-semibold">Approve Order</h2>
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
                Customer ID : {data.customer._id}
              </h1>
              <h1 className="font-semibold text-sm">Quantity : {data?.quantity} </h1>
              <h1 className="font-semibold text-sm">Price : {data?.price} </h1>
              <h1 className="font-semibold text-sm">
                Name : {data.customer?.name}
              </h1>
              <h1 className="font-semibold text-sm">
                Shipping Address : {data.shipping_address!}
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
            <div className="mt-5 w-full flex flex-row items-center justify-center gap-5">
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
                  <PuffLoader size={20} color="white" />
                ) : (
                  "Accept"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
