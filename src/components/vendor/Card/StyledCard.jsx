import React, { useState, useEffect } from "react";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color1 = "#";
  let color2 = "#";
  for (let i = 0; i < 6; i++) {
    color1 += letters[Math.floor(Math.random() * 16)];
    color2 += letters[Math.floor(Math.random() * 16)];
  }
  return { color1, color2 };
};

const StyledCard = ({ data }) => {
  const [bgColors, setBgColors] = useState({ color1: "", color2: "" });

  useEffect(() => {
    setBgColors(getRandomColor());
  }, []);

  const handleClick = (e) => {
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    ripple.style.left = `${e.clientX - e.target.offsetLeft}px`;
    ripple.style.top = `${e.clientY - e.target.offsetTop}px`;
    e.target.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div
      className="card w-72 h-96 p-6 mb-4 rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      onClick={handleClick}
      style={{
        background: `linear-gradient(to left, ${bgColors.color1}, ${bgColors.color2})`,
      }}
    >
      <div className="max-h-44">
        {data.type === "image" ? (
          <img src={data.content} className="rounded-xl" alt="" />
        ) : (
          <video src={data.content} controls className="rounded-xl"></video>
        )}
      </div>
      <h1 className="pt-5 pb-5 font-bold text-xl">{data.creator}</h1>
      <div className="flex justify-evenly">
        <p className="font-semibold text-md">Highest Bid</p>
        <p className="font-semibold text-md">From {data.price} ETH</p>
      </div>
      <div className="flex">
        <p className="font-semibold text-xl">Creator: </p>
        <span className="font-semibold text-xl">{data.creator}</span>
      </div>
    </div>
  );
};

export default StyledCard;
