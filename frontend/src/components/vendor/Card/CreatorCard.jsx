import React from "react";

const CreatorCard = ({ imgSrc, title, price }) => {
  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <img
        src={imgSrc}
        alt={title}
        className="w-20 m-8 h-20 object-cover rounded-xl"
      />
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Price: {price}
        </p>
      </div>
    </div>
  );
};

export default CreatorCard;
