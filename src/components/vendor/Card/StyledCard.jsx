import React, { useState, useEffect } from "react";
import GradientDiv from "./GradientDiv";

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

const StyledCard = ({ data, card_holder }) => {
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
      className="card flex flex-col gap-3 w-72 min-h-[28em] p-6 mb-4 rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      onClick={handleClick}
      style={{
        background: `linear-gradient(to left, ${bgColors.color1}, ${bgColors.color2})`,
      }}
    >
      <div className="min-h-44">
        {data.type === "image" ? (
          <img src={data.content} className="rounded-xl min-h-44" alt="" />
        ) : (
          <video
            src={data.content}
            autoPlay
            className="rounded-xl min-h-44"
          ></video>
        )}
      </div>
      <h1 className="font-bold text-xl">{data.creator}</h1>
      <div className="rounded-2xl overflow-hidden">
        <GradientDiv col1="darkgray" col2="lightgreen" direction="to bottom">
          <div className="flex justify-evenly py-3 ">
            <p className="font-semibold text-md">{card_holder}</p>
            <p className="font-semibold text-md ">From {data.price} ETH</p>
          </div>
        </GradientDiv>
      </div>

      <div className="flex py-3">
        <p className="font-semibold text-xl ">Creator: </p>
        <span className="font-semibold text-xl">{data.creator}</span>
      </div>
    </div>
  );
};

export default StyledCard;
