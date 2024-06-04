import React, { useState, useEffect } from "react";
import { useAppState } from "../../../AppStateContext";

const getRandomAnimation = (type) => {
  const animations = {
    in: ["slideInFromTop", "slideInFromLeft"],
    out: ["slideOutToRight", "breakOut"],
  };
  const randomIndex = Math.floor(Math.random() * animations[type].length);
  return animations[type][randomIndex];
};

const Alert = ({ timer, result, setResult }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationIn, setAnimationIn] = useState("");
  const [animationOut, setAnimationOut] = useState("");
  const { removeFirebasePrefix } = useAppState();

  useEffect(() => {
    setAnimationIn(getRandomAnimation("in"));
    setAnimationOut(getRandomAnimation("out"));
  }, []);

  useEffect(() => {
    if (timer) {
      const timeoutId = setTimeout(() => {
        setResult({
          status: 0,
          message: null,
        });
        setIsVisible(!isVisible);
      }, 4000); // 4 seconds
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [timer, result, isVisible]);

  const handleClose = () => {
    setResult({
      status: 0,
      message: null,
    });
  };

  if (result.message == null) return null;

  return (
    <div
      className={`w-full p-4 rounded-xl shadow-md transition-all duration-500 ${
        result.status === 200
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
      style={{ animation: `${isVisible ? animationIn : animationOut} 0.5s` }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">
            {result.message === 200 ? "Success" : "Error"}
          </p>
          <p>{removeFirebasePrefix(result.message)}</p>
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
