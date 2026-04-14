import React from "react";
import NFTS from "./comp/NFTS";
import { useAppState } from "../../AppStateContext";

export default function UserNFT() {
  const { islogged } = useAppState();

  let nft = [];
  if (islogged.userData.nfts.length > 0) {
    nft = islogged.userData.nfts[0].regions;
  }

  return (
    <NFTS
      datas={nft}
      placeholder={"Search By Product Name"}
      card_holder={"Current Bid"}
      title={"Users NFT"}
      path="user_nft"
    />
  );
}
