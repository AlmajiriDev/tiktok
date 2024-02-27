import React from "react";
import { TextInputCompTypes } from "../types";

export default function TextInput({
  string,
  inputType,
  placeholder,
  error,
  onUpdate,
}: TextInputCompTypes) {
  return (
    <>
      <input
        type={inputType}
        value={string || ""}
        placeholder={placeholder}
        className="block w-full bg-[#f1f1f2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
        onChange={(event) => onUpdate(event.target.value)}
        autoComplete="off"
      />
      <div className="text-red-500 text-[14px] font-semibold"> 
            {error ? (error): null}
      </div>
    </>
  );
}
