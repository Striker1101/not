import React from "react";

const BlueButton = ({ children, onClick }) => {
  return (
    <button
      className="
        bg-blue-800 text-white 
          px-6 py-3 rounded-md 
          w-32
          text-nowrap
        transition-colors duration-300
        m-3
        p-4
      "
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BlueButton;
