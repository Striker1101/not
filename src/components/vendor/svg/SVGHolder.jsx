import React from "react";

export default function SVGHolder({ name, color }) {
  if (name === "light") {
    return (
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          clipPath="url(#a)"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        >
          <path
            d="M5 12H1M23 12h-4M7.05 7.05 4.222 4.222M19.778 19.778 16.95 16.95M7.05 16.95l-2.828 2.828M19.778 4.222 16.95 7.05"
            strokeLinecap="round"
          />

          <path
            d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            fill="#000000"
            fillOpacity=".16"
          />

          <path d="M12 19v4M12 1v4" strokeLinecap="round" />
        </g>

        <defs>
          <clipPath id="a">
            <path fill="#ffffff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  if (name === "dark") {
    return (
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="nightModeIconTitle"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
        color="#000000"
      >
        {" "}
        <title id="nightModeIconTitle">Night Mode</title>{" "}
        <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />{" "}
        <path d="M15.899 12.899a4 4 0 0 1-4.797-4.797A4.002 4.002 0 0 0 12 16c1.9 0 3.49-1.325 3.899-3.101z" />{" "}
        <path d="M12 5V3M12 21v-2" />{" "}
        <path d="M5 12H2h3zM22 12h-3 3zM16.95 7.05L19.07 4.93 16.95 7.05zM4.929 19.071L7.05 16.95 4.93 19.07zM16.95 16.95l2.121 2.121-2.121-2.121zM4.929 4.929L7.05 7.05 4.93 4.93z" />{" "}
      </svg>
    );
  }
}
