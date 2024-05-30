import React from "react";
import "./css/spinner_style.css";

export default function Spinner() {
  return (
    <div className="holder">
      <div class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
      </div>
    </div>
  );
}
