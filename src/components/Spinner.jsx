import React from "react";
import "./css/spinner_style.css";

export default function Spinner() {
  return (
    <div className="holder">
      <div className="spinner">
        <div className="dot1"></div>
        <div className="dot2"></div>
      </div>
    </div>
  );
}
