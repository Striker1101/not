import React from "react";

const GradientDiv = ({ children, col1, col2, direction }) => {
  const gradientStyle = {
    background: `linear-gradient(${direction}, ${col1}, ${col2})`,
  };

  return (
    <div className="w-full h-full" style={gradientStyle}>
      {children}
    </div>
  );
};

export default GradientDiv;
