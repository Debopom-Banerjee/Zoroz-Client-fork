import React from 'react'

const FormElement = ({
    name,
    value,
    type,
    id,
    onChange,
    width,
    disabled,
    placeholder,
    required=false,
  }: {
    name: string;
    value: string;
    type: string;
    id: string;
    width?: string;
    disabled?: boolean;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    placeholder?: string;
    required?:boolean
  }) => {
  return (
    <div className={`flex w-full lg:w-[${width}] flex-col  px-3  items-start gap-1 md:gap-2 flex-wrap justify-start`}>
    <label htmlFor={id} className="font-semibold text-xs md:text-xl">
      {name} :
    </label>
    <input
      required={required}
      type={type}
      value={value}
      onChange={onChange}
      name={id}
      disabled={disabled}
      id={id}
      placeholder={placeholder}
      className={` w-full  border-b rounded-md border-black px-2 py-1 font-semibold max-md:w-full focus:border-b bg-transparent `}
    />
  </div>
  )
}

export default FormElement