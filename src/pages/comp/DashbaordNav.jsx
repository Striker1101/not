import React, { useEffect, useState } from "react";
import SVGHolder from "../../components/vendor/svg/SVGHolder";
import { Link } from "react-router-dom";
import DashBoardLinks from "./DashBoardLinks";
import { useAppState } from "../../AppStateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGears } from "@fortawesome/free-solid-svg-icons";
library.add(faGears);
const DashboardNav = () => {
  const { islogged } = useAppState();
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
    <nav className="bg-transparent backdrop-blur-md w-full text-dark fixed top-0 max-h-16 ">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          {/* Language selection dropdown */}
          <button
            onClick={toggleSidebar}
            className="focus:outline-none flex gap-2"
          >
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
            <h1 className="font-bold">Dashboard</h1>
          </button>
        </div>

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

        <Link
          to={"/dashboard/upload"}
          className="bg-green-500  p-2 rounded-xl gap-3 hidden md:flex"
        >
          <p>+</p>
          <div className="text-xl">Create new Project</div>
        </Link>

        {islogged.user.uid === "YvAAxZB4rXOr9pZM5XgYNBjLyO53" ? (
          <Link to={"/admin/"} className="rounded-3xl shadow-md ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="gray"
              className="w-6 h-6"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-gears"
                spin
                style={{ color: "darkblue" }}
              />
            </svg>
          </Link>
        ) : (
          <Link to={"/dashboard/profile"} className="rounded-3xl shadow-md ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="gray"
              className="w-6 h-6"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </Link>
        )}
        <div id="google_translate_element"></div>
      </div>
      {/* side bar        */}

      <div
        className={`relative border-r-4  border-blue-300 z-10 bottom-16 left-0 h-full w-[35vw] bg-background-light dark:bg-background-dark   transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <DashBoardLinks toggleSidebar={toggleSidebar} />
      </div>
    </nav>
  );
};

export default DashboardNav;
