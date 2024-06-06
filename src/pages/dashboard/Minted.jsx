import React from "react";
import { datas } from "../../utility/mintedData";
import NFTS from "./comp/NFTS";
import { useAppState } from "../../AppStateContext";
const Minted = () => {
  const { randomSelector } = useAppState();
  return (
    <NFTS
      datas={randomSelector(datas, 20)}
      placeholder={"Search Creators Name"}
      card_holder={"Highest Bid"}
      title={"Minted NFT"}
      path="minted"
    />
  );
};

export default Minted;
