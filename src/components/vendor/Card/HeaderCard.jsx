import React, { useState, useEffect } from "react";

const HeaderCard = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 60000); // Stop animation after 1 minute

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 180000); // Change item every 3 minutes

    return () => {
      clearTimeout(animationTimer);
      clearInterval(intervalId);
    };
  }, [items.length]);

  const currentItem = items[currentIndex];

  return (
    <div
      className={`w-full flex-glow-2 max-w-sm mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden ${
        isAnimating ? "bounce compress" : ""
      } `}
    >
      {currentItem.type === "image" && (
        <img
          src={currentItem.content}
          alt="Card content"
          className={` object-cover `}
        />
      )}
      {currentItem.type === "video" && (
        <video className={` object-cover ]`} autoPlay loop muted>
          <source
            src={currentItem.content}
            type="video/mp4"
            autoFocus
            autoPlay
          />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default HeaderCard;
