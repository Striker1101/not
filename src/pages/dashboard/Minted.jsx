import React from "react";
import { datas } from "../../utility/mintedData";
import NFTS from "./comp/NFTS";
import { useAppState } from "../../AppStateContext";

const Minted = () => {
  let nft = [];
  const { randomSelector } = useAppState();
  const { islogged } = useAppState();

  if (islogged.userData.nfts.length > 0) {
    nft = islogged.userData.nfts[0].regions;
  }

  // Filter the nft array for objects where status is true
  const filteredNft = nft.filter((item) => item.status === true);

  // Combine the filtered nft array with the result of randomSelector
  const combinedData = [...filteredNft, ...randomSelector(datas, 20)];

  return (
    <NFTS
      datas={combinedData}
      placeholder={"Search Creators Name"}
      card_holder={"Highest Bid"}
      title={"Minted NFT"}
      path="minted"
    />
  );
};

export default Minted;
