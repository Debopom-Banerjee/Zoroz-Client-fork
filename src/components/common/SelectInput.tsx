import React from "react";

const SelectInput = ({
  options,
  onChange,
  id,
  name,
  value,
  width,
}: {
  options: any;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  width?: string;
}) => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-2 relative">
      <label htmlFor="event" className="font-semibold text-sm md:text-xl ">
        {name} :
      </label>
      <select
        value={value}
        name={id}
        id={id}
        className={`py-1 px-4 w-[${
          width ? width : "100%"
        }] rounded-xl border border-black font-semibold`}
        onChange={onChange}
      >
        <option id={id} value=""></option>
        {options.map((option: any, index: number) => {
          return (
            <option key={index} value={option} className="flex flex-row items-center gap-1">
             {/* {option.image != undefined && <img src={option.image} className="w-10 h-10" alt="" />} */}
              <h1>{option}</h1>
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;