import React from "react";
import HeaderCard from "./vendor/Card/HeaderCard";
import header1 from "../resources/images/homepage/header1.png";
export default function AutoCard({ name }) {
  const header_card = [{ content: header1, type: "image" }];
  if (name === "home_header") {
    return (
      <div>
        <HeaderCard items={header_card} />
      </div>
    );
  }
}
