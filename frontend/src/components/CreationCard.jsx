import React from "react";

const CreationCard = ({ name, imgSrc1, imgSrc2, title }) => {
  return (
    <div className="max-w-sm mx-auto rounded-lg overflow-hidden p-4">
      <div
        id="imgholder"
        className="relative flex align-middle items-center justify-center"
      >
        <div
          id="holder2"
          className="absolute left-50  w-3/5 h-full bg-gray-200 z-0 rounded-xl "
          style={{ height: "110%", bottom: "-30px" }}
        ></div>
        <div
          id="holder1"
          className="absolute  left-50 w-4/5 z-1 h-full bg-gray-500 rounded-2xl"
          style={{ height: "110%" }}
        ></div>

        <img
          id="img1"
          src={imgSrc1}
          alt={name}
          className="relative z-1 w-60 h-full object-cover rounded-xl"
        />
        <img
          id="img2"
          src={imgSrc2}
          alt="Overlay"
          style={{ bottom: "-40px", border: "3px solid white" }}
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-12 h-12"
        />
      </div>
      <h2 className="text-2xl text-center pt-9 font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {name}
      </h2>
      <div className="text-lg text-center text-gray-700 dark:text-gray-300">
        Collection by {title}
      </div>
    </div>
  );
};

export default CreationCard;
