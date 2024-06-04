import React from "react";
import { datas } from "../../utility/buyData";
import NFTS from "./comp/NFTS";

export default function Buy() {
  return (
    <NFTS
      datas={datas}
      placeholder={"Search Creators Name"}
      card_holder={"Current Bid"}
      title={"Buy"}
    />
  );
}
