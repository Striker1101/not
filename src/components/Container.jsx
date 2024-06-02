import React from "react";
import { Helmet } from "react-helmet";
import { general } from "../utility/general";
export default function Container({ children, title }) {
  return (
    <div className="">
      <Helmet>
        <title>{general.name + " -> " + title}</title>
      </Helmet>
      {children}
    </div>
  );
}
