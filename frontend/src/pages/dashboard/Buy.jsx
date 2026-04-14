import React from "react";
import { datas } from "../../utility/mintedData";
import NFTS from "./comp/NFTS";
import { useAppState } from "../../AppStateContext";

export default function Buy() {
  const { randomSelector } = useAppState();
  return (
    <NFTS
      datas={randomSelector(datas, 23)}
      placeholder={"Search Creators Name"}
      card_holder={"Current Bid"}
      title={"Buy"}
      path={"buy"}
    />
  );
}
