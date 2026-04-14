import React, { useState } from "react";
import classNames from "classnames";

const SelectInput = ({
  placeholder,
  handleChange,
  name,
  value,
  required = false,
  options = [],
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <select
        name={name}
        value={value}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        className={classNames(
          "w-full px-5 py-4 rounded-2xl bg-white/5 border-2 transition-all duration-200 outline-none appearance-none cursor-pointer",
          "text-gray-900 dark:text-white font-medium",
          isFocused 
            ? "border-blue-500 ring-4 ring-blue-500/10" 
            : "border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700",
          className
        )}
      >
        <option value="" disabled className="bg-white dark:bg-[#0f172a] text-gray-400">
          {placeholder || "Select an option"}
        </option>
        {options.map((option, index) => (
          <option 
            key={index} 
            value={option.value} 
            className="bg-white dark:bg-[#0f172a] text-gray-900 dark:text-white py-2"
          >
            {option.content}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {value && (
        <label className="absolute -top-2.5 left-4 px-2 bg-white dark:bg-[#0f172a] text-[10px] font-black uppercase tracking-widest text-blue-500 rounded-md">
          {placeholder}
        </label>
      )}
    </div>
  );
};

export default SelectInput;
