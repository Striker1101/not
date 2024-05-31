import React, { useState } from "react";
import classNames from "classnames";

const TextArea = ({ placeholder, handleChange, name, value }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    validateInput(e.target.value);
  };

  const validateInput = (inputValue) => {
    // Example validation: input should not be empty
    setIsValid(inputValue.trim() !== "");
  };

  return (
    <div className="relative w-full mb-6">
      <textarea
        onFocus={handleFocus}
        autoComplete
        autoCorrect
        rows={5}
        defaultValue={value}
        name={name}
        onBlur={handleBlur}
        onChange={(e) => {
          validateInput(e.target.value);
          handleChange(e);
        }}
        className={classNames(
          "w-full px-4 py-2 rounded-t-xl bg-blue-300 border-b-2",
          "focus:outline-none",
          {
            "border-gray-300 dark:border-gray-700": !isFocused && isValid,
            "border-black dark:border-white": isFocused,
            "border-red-500": !isValid,
          }
        )}
        placeholder=" "
      ></textarea>
      <label
        className={classNames(
          "absolute left-4 bottom-6 text-sm text-gray-500 transition-all",
          {
            "top-0 text-xs text-blue-500": isFocused || !isValid,
            "text-red-500": !isValid,
          }
        )}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default TextArea;
