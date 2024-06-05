import React from "react";
import HeaderCard from "./vendor/Card/HeaderCard";
import AuctionCard from "./vendor/Card/AuctionCard";
import CreatorCard from "./vendor/Card/CreatorCard";
import {
  header_card,
  auction,
  creators,
  creations,
  artwork,
  explores,
} from "../utility/homepageData";
import CreationCard from "./CreationCard";

export default function AutoCard({ name }) {
  if (name === "home_header") {
    return (
      <div className="flex-3">
        <HeaderCard items={header_card} />
      </div>
    );
  }

  if (name === "auction") {
    return (
      <ul className="overflow-y-auto flex ">
        {auction.map((item, index) => (
          <li className="m-5">
            <AuctionCard
              key={index}
              item={item}
              title={item.title}
              bid={item.bid}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (name === "creators") {
    return (
      <div className="min-h-screen p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <CreatorCard
              key={index}
              imgSrc={creator.content}
              title={creator.title}
              price={creator.price}
            />
          ))}
        </div>
      </div>
    );
  }

  if (name === "creation") {
    return (
      <div className="min-h-screen p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creations.map((creation, index) => (
            <CreationCard
              name={creation.name}
              imgSrc1={creation.img1}
              imgSrc2={creation.img2}
              title={creation.title}
            />
          ))}
        </div>
      </div>
    );
  }

  if (name === "artwork") {
    return (
      <ul className=" flex flex-wrap ">
        {artwork.map((item, index) => (
          <li className="m-3">
            <AuctionCard
              key={index}
              item={item}
              title={item.title}
              bid={item.bid}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (name === "explore") {
    return (
      <ul className=" flex flex-wrap ">
        {explores.map((item, index) => (
          <li className="m-3">
            <AuctionCard
              key={index}
              item={item}
              title={item.title}
              bid={item.bid}
            />
          </li>
        ))}
      </ul>
    );
  }
}
