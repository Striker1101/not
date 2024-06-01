import React, { useState, useEffect } from "react";

const getRandomAnimation = (type) => {
  const animations = {
    in: ["slideInFromTop", "slideInFromLeft"],
    out: ["slideOutToRight", "breakOut"],
  };
  const randomIndex = Math.floor(Math.random() * animations[type].length);
  return animations[type][randomIndex];
};

const Alert = ({ type, message, timer }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationIn, setAnimationIn] = useState("");
  const [animationOut, setAnimationOut] = useState("");

  useEffect(() => {
    setAnimationIn(getRandomAnimation("in"));
    setAnimationOut(getRandomAnimation("out"));
  }, []);

  useEffect(() => {
    if (timer) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 40000); // 4 seconds
      return () => clearTimeout(timeoutId);
    }
    console.log(!isVisible || message == null, message);
  }, [timer, message, isVisible]);

  const handleClose = () => {
    message = null;
    setIsVisible(isVisible);
  };

  if (!isVisible || message == null) return null;

  return (
    <div
      className={`w-full p-4 rounded-xl shadow-md transition-all duration-500 ${
        type ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
      style={{ animation: `${isVisible ? animationIn : animationOut} 0.5s` }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">{type ? "Success" : "Error"}</p>
          <p>{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="ml-4 text-xl font-bold focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
