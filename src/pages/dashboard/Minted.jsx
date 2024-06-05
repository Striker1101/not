import React from "react";
import { datas } from "../../utility/mintedData";
import NFTS from "./comp/NFTS";
const Minted = () => {
  return (
    <NFTS
      datas={datas}
      placeholder={"Search Creators Name"}
      card_holder={"Highest Bid"}
      title={"Minted NFT"}
      path="minted"
    />
  );
};

export default Minted;
