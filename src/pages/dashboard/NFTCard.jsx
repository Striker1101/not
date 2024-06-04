import React from "react";
import { useParams } from "react-router-dom";
import { datas } from "../../utility/mintedData";
import { ReactComponent as Alien } from "../../resources/images/dashboard/minted/reddit-alien.svg";

const NFTCard = () => {
  const { id } = useParams();
  const card = datas.find((item) => item.id === parseInt(id));

  if (!card) {
    return (
      <div className="flex justify-center align-middle items-center h-full g-5 flex-wrap">
        <Alien width={300} height={300} className="text-2xl" />
        <p className="font-bold text-xl ml-9">NO NFT Here For You</p>
      </div>
    );
  }

  return (
    <div className="card-detail p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{card.creator}</h1>
      <div className="max-h-44 mb-4">
        {card.type === "image" ? (
          <img src={card.content} className="rounded-xl" alt="" />
        ) : (
          <video src={card.content} controls></video>
        )}
      </div>
      <p className="text-lg">Highest Bid: {card.price} ETH</p>
      <p className="text-lg">Creator: {card.creator}</p>
    </div>
  );
};

export default NFTCard;
