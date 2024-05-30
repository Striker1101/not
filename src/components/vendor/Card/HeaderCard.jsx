import React, { useState, useEffect } from "react";

const HeaderCard = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  //   }, 180000); // 180000ms = 3 minutes

  //   return () => clearInterval(intervalId);
  // }, [items.length]);

  const currentItem = items[currentIndex];
  console.log(currentItem.type, currentIndex);
  return (
    <div className="w-full max-w-sm mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      this is the start
      {currentItem.type === "image" && (
        <img
          src={currentItem.src}
          alt="Card content"
          className="w-full h-64 object-cover"
        />
      )}
      {currentItem.type === "video" && (
        <video className="w-full h-64 object-cover" autoPlay>
          <source src={currentItem.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default HeaderCard;
