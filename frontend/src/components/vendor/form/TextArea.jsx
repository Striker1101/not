import React, { useState } from "react";
import classNames from "classnames";

const TextArea = ({ 
  placeholder, 
  handleChange, 
  name, 
  value, 
  rows = 5,
  required = false,
  className = "" 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <textarea
        name={name}
        value={value}
        rows={rows}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        placeholder={placeholder}
        className={classNames(
          "w-full px-5 py-4 rounded-2xl bg-white/5 border-2 transition-all duration-200 outline-none resize-none",
          "text-gray-900 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500",
          isFocused 
            ? "border-blue-500 ring-4 ring-blue-500/10 shadow-lg" 
            : "border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700",
          className
        )}
      ></textarea>
      
      {value && (
        <label className="absolute -top-2.5 left-4 px-2 bg-white dark:bg-[#0f172a] text-[10px] font-black uppercase tracking-widest text-blue-500 rounded-md">
          {placeholder}
        </label>
      )}
    </div>
  );
};

export default TextArea;
