import React from "react";

const DefaultButton = ({ children, onClick }) => {
  return (
    <button
      className="
        bg-gray-800 text-white 
        dark:bg-white dark:text-gray-800 
        px-6 py-3 rounded-md 
         w-32
        transition-colors duration-300
         m-3
         border-2
         border-blue-400
      "
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
