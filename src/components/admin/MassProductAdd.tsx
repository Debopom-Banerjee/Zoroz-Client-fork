"use client";
// MassProductAdd.js
import React, { useEffect, useState } from "react";
import CSVConverter from "./CSVConverter";
import { addMultipleProducts } from "@/utils/functions/addMultipleProducts";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/lib/store/user";

const MassProductAdd = ({ role }: { role: string }) => {
  const user = useUser((state) => state.user);
  const [csvData, setCsvData] = useState<any>(null);
  const [showTable, setShowTable] = useState(false);
  function removeSpaces(inputString: string) {
    // Using regular expression to replace all spaces with empty string
    return inputString.replace(/\s+/g, "");
  }
  useEffect(() => {
    console.log(csvData);
    if (csvData && csvData.data.length > 1) {
      // Ensure results is an array and contains more than one row

      const headers = csvData.data[0].map(removeSpaces); // First row is assumed to be headers
      const objects = csvData.data.slice(1).map((row: any) => {
        const obj: any = {};
        row.forEach((value: any, index: number) => {
          obj[headers[index]] = value; // Assign each value to its corresponding header
        });
        return obj;
      });
      console.log("Parsed objects:", objects); // Log parsed objects for debugging
      setCsvData(objects); // Update with parsed data
    }
  }, [csvData != null]);
  const handleSubmit = async () => {
    try {
      console.log(csvData);
      let updatedCsvData = csvData?.map((data: any) => {
        const newData = { ...data };
        newData.admin_approval = role === "admin" ? true : false;
        // Parsing "benefits" property if it exists and is not empty
        if (newData.benefits && newData.benefits.trim() !== "") {
          try {
            newData.benefits = JSON.parse(newData.benefits);
          } catch (e) {
            newData.benefits = newData.benefits.split(".");
            if (newData.benefits.length == 0) {
              newData.benefits = [newData.benefits]; // Convert string to array of single element
            }
          }
        }

        // Parsing "features" property if it exists and is not empty
        if (newData.features && newData.features.trim() !== "") {
          try {
            newData.features = JSON.parse(newData.features);
          } catch (e) {
            try {
              newData.features = newData.features.split(".");
              if (newData.features.length == 0) {
                newData.features = [newData.features]; // Convert string to array of single element
              }
            } catch (e) {
              newData.features = [newData.features];
            }
          }
        }

        // Parsing "specifications" property if it exists and is not empty
        console.log(typeof newData.specifications);

        try {
          newData.specifications = JSON.parse(newData.specifications);
        } catch (e) {
          if (
            newData.specifications === "" ||
            typeof newData.specifications === "undefined"
          ) {
            newData.specifications = [];
          } else {
            newData.specifications = newData.specifications.split(".");
          }
        }

        console.log(newData.specifications);

        console.log("Before Parsing");

        // Parsing other properties if they need to be converted
        newData.mrp = parseInt(newData.mrp);
        newData.price = parseInt(newData.price);
        newData.stock_count = parseInt(newData.stock_count);
        newData.vendor_id = user?._id;
        return newData;
      });

      console.log("After Parsing");

      // Filtering out any empty objects
      updatedCsvData = updatedCsvData.filter((data: any) =>
        Object.values(data).some(
          (val) => val !== "" && val !== undefined && val !== null
        )
      );

      console.log(updatedCsvData);

      const data = await addMultipleProducts(updatedCsvData);
      toast.success("Multiple Products Added !");
    } catch (err) {
      toast.error("Something error occurred !");
      console.log(err);
    }
  };

  return (
    <div className="relative p-5 w-4/5 flex flex-col gap-2 items-start bg-white border-2 border-red-600 my-5 rounded-xl mx-auto">
      <h1 className="font-semibold text-2xl">Add Products</h1>
      <CSVConverter
        csvData={csvData}
        setCsvData={setCsvData}
        handleSubmit={handleSubmit}
      />
      <Toaster position="bottom-right" />
      <button
        onClick={() => setShowTable(true)}
        className="bg-red-600 text-white px-5 py-2 rounded-xl font-semibold border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2"
      >
        Show
      </button>
      <table className="table overflow-x-scroll table-auto w-4/5 border border-gray-300 text-black rounded-xl">
        {showTable && csvData && csvData.length > 0 && (
          <>
            <thead className="bg-gray-350 font-semibold w-full ">
              <tr>
                {Object.keys(csvData[0] || {}).map(
                  (header: string, index: number) => (
                    <th key={index} className="px-4 py-2">
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {csvData.map((item: any, index: number) => (
                <tr key={index} className="bg-white border ">
                  {Object.keys(csvData[0] || {}).map(
                    (header: string, subIndex: number) => (
                      <td key={subIndex} className="px-4 py-2 ">
                        {item[header]}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default MassProductAdd;
