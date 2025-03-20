/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface NormalInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  required?: boolean;
  placeholder: string;
  type: string;
  error?: boolean;
  errorMessage?: string;
}

const NormalInputField: React.FC<NormalInputProps> = ({
  id,
  value,
  onChange,
  required,
  placeholder,
  type,
  error,
  errorMessage,
}) => {
  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`mt-1 text-[#80838D] bg-[#F0F0F3] border-1 block w-full px-3 h-[52px] py-2 rounded-md shadow-sm ${
          error ? "border-[#D42620]" : "border-[#80838D]"
        }`}
      />
      {error && (
        <p className="text-[#D42620] mt-2 text-xs font-medium">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

//focus:outline-none focus:ring-[#001C4C] focus:border-[#001C4C]
export default NormalInputField;
