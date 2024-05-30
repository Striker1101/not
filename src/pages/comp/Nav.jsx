import React, { useEffect, useState } from "react";
import Links from "./Links";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

import SVGHolder from "../../components/vendor/svg/SVGHolder";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference in local storage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-transparent backdrop-blur-md text-dark fixed top-0 w-screen ">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Logo />
        <button
          onClick={toggleDarkMode}
          className="focus:outline-none px-3 py-2 rounded-md"
        >
          {darkMode ? (
            // <FontAwesomeIcon icon={faLightbulb} />
            <SVGHolder name={"light"} color={"white"} />
          ) : (
            <SVGHolder name={"dark"} color={"black"} />
          )}
        </button>
        <Links toggle={true} />
        <div id="google_translate_element"></div>
        <div className="lg:hidden flex items-center space-x-2">
          {/* Language selection dropdown */}
          <button onClick={toggleSidebar} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* side bar        */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-background-light dark:bg-background-dark   transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={toggleSidebar} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <Links toggle={false} />
      </div>
    </nav>
  );
};

export default Nav;
