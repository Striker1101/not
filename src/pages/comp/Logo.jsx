import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to={"/"}
      className="flex items-center text-sm text-blue-400 font-bold md:text-xl"
    >
      <img src="/favicon.ico" alt="" />
      <h1 className="text-wrap md:text-nowrap">Block Art Nft</h1>
    </Link>
  );
}
