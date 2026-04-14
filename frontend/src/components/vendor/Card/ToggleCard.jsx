import React from "react";

const ToggleCard = ({ img, title, desc, toggle = false, bg = "red" }) => {
  return (
    <div
      className={`flex ${
        toggle ? "flex-col-reverse" : "flex-col"
      } items-center bg-gray-300 shadow-md rounded-lg overflow-hidden w-72 h-60 m-5  `}
    >
      <div
        className={`flex items-center p-4 rounded-xl bg-background-dark dark:bg-background-light text-background-light dark:text-background-dark justify-between w-full`}
      >
        <div style={{ backgroundColor: bg }} className="p-5 rounded-xl">
          {img}
        </div>
        <h3 className="m-3 text-2xl text-nowrap font-semibold text-background-light dark:text-background-dark mt-4">
          {title}
        </h3>
      </div>
      <div className={`p-4 ${toggle ? "order-1" : ""}`}>
        <p className="text-lg text-gray-700 dark:text-background-dark">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default ToggleCard;
