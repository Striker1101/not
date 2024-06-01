import React, { useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TextInput = ({
  placeholder,
  handleChange,
  name,
  value,
  type,
  required = false,
}) => {
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

  const handlepasswordDisplay = () => {};

  return (
    <div className="relative w-full mb-6">
      <input
        type={type}
        onFocus={handleFocus}
        autoComplete
        autoCorrect
        defaultValue={value}
        required={required}
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
      />
      <div className="absolute bottom-3 border-red-300">
        {type === "password" ? (
          <div onClick={handlepasswordDisplay}>
            <FontAwesomeIcon icon="fa-solid fa-eye" />
          </div>
        ) : (
          <div onClick={handlepasswordDisplay}>
            <FontAwesomeIcon icon="fa-regular fa-eye" />
          </div>
        )}
      </div>
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

export default TextInput;
