"use client";
import Calendar from "react-calendar";
import { PuffLoader } from "react-spinners";
import FormElement from "../common/FormElement";
import { addCoupon } from "@/utils/functions/addCoupon";
import { useEffect, useState } from "react";

type ValuePiece = Date | null ;

type Value = ValuePiece | [ValuePiece, ValuePiece];
export const CouponModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;

}) => {
  const [disabled,setDisabled] = useState(false)
  const [inputs,setInputs] = useState({
    name:"",
    code:"",
    discount_text:"",
    discount:"",
    startDate:"",
    expiryDate:""
  })

  const [begin, setBegin] = useState<Value>(new Date());
  const [end, setEnd] = useState<Value>(new Date());
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      startDate:new Date(begin!.toString()).toISOString().toString(),
      expiryDate:new Date(end!.toString()).toISOString().toString(),
      discount:parseInt(inputs.discount)
    }));
  },[begin,end,inputs?.discount])

  const handleSubmit = async()=>{
    setDisabled(true)
    const data = await addCoupon(inputs);
    console.log(inputs)
    setDisabled(false)
   onClose();
  }

  return (
    <>
      {isOpen && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div
            className={`bg-gray-100 p-4 rounded-lg max-h-[50vh] md:max-h-[60vh] min-h-auto w-[90%] flex flex-col items-start md:w-[50%] lg:w-[35%] `}
          >
            <div className="w-full flex flex-row mb-2 items-center justify-between">
              <h2 className="text-lg font-semibold">Add Coupon</h2>
                
              <h2
                onClick={onClose}
                className="bg-black md:py-2 md:px-3 px-2 py-1 hover:bg-white hover:text-black border-2 border-black  text-white text-sm font-semibold rounded-full cursor-pointer"
              >
                X
              </h2>
            </div>
            <div className="h-full flex flex-col items-start gap-4 overflow-y-scroll my-1 py-2 px-1 w-full">
          
                    <FormElement
                      name='Name'
                      id='name'
                      value={inputs?.name}
                      onChange={handleInputChange}
                      type='text'
                      placeholder='Coupon Name'
                      width='100%'
                    />
               
               <FormElement
                      name='Code'
                      id='code'
                      value={inputs?.code}
                      onChange={handleInputChange}
                      type='text'
                      placeholder='Code'
                      width='100%'
                    />
                     <FormElement
                      name='Discount'
                      id='discount'
                      value={inputs?.discount}
                      onChange={handleInputChange}
                      type='number'
                      placeholder='Discount'
                      width='100%'
                    />
                     <FormElement
                      name='Description'
                      id='discount_text'
                      value={inputs?.discount_text}
                      onChange={handleInputChange}
                      type='text'
                      placeholder='Description'
                      width='100%'
                    />
                    <Calendar onChange={setBegin} value={begin} />
                    <Calendar onChange={setEnd} value={end} />
            </div>
            <button
              className="border-2 mt-3 border-black px-5 py-1 rounded-full font-semibold bg-black text-white hover:bg-white hover:text-black"
              onClick={handleSubmit}
              disabled={disabled}
            >
              {!disabled ? "Submit" : <PuffLoader color="white" size={10} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
