import React from "react";

const AuctionCard = ({ item, title, bid }) => {
  return (
    <div className="w-60 px-6 z-1 m  mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg dark:shadow-white">
      {item.type === "image" && (
        <img
          src={item.content}
          alt={title}
          className="w-full h-40 object-cover rounded-lg"
        />
      )}
      {item.type === "video" && (
        <video className="w-full h-40 object-cover rounded-lg" autoPlay loop>
          <source src={item.content} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="p-4 w-full">
        <button className=" flex p-5 items-center justify-center align-middle bg-gray-400 hover:bg-blue-500 font-bold rounded-xl transition-colors duration-300 min-w-full">
          <p className="text-xs  text-nowrap ">Current Bid: {bid}</p>
        </button>
      </div>
    </div>
  );
};

export default AuctionCard;
