import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useLocation } from "react-router-dom";

export default function Links({ toggle, toggleSidebar }) {
  const location = useLocation();
  const [containsAuth, setContainsAuth] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("auth")) {
      setContainsAuth(true);
    } else {
      setContainsAuth(false);
    }
  }, [location.pathname]);
  const offDisplay = { display: containsAuth ? "none" : "block" };
  return (
    <div className=" border-r-4 border-blue-300 text-background-dark  dark:text-background-light  ">
      {toggle ? (
        <div className="hidden lg:flex space-x-4">
          <Link
            to={"/"}
            style={offDisplay}
            onClick={toggleSidebar}
            className="hover:bg-primary-light font-bold  dark:hover:bg-primary-dark px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to={"/explore"}
            style={offDisplay}
            onClick={toggleSidebar}
            className="hover:bg-primary-light font-bold dark:hover:bg-primary-dark px-3 py-2 rounded-md"
          >
            Explore
          </Link>
          <Link
            to={"/about"}
            style={offDisplay}
            onClick={toggleSidebar}
            className="hover:bg-primary-light font-bold dark:hover:bg-primary-dark px-3 py-2 rounded-md"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            style={offDisplay}
            onClick={toggleSidebar}
            className="hover:bg-primary-light font-bold dark:hover:bg-primary-dark px-3 py-2 rounded-md"
          >
            Contact
          </Link>
          <Link
            to={"/auth/login"}
            onClick={toggleSidebar}
            className="hover:bg-primary-light font-bold dark:hover:bg-primary-dark px-3 py-2 rounded-md"
          >
            Login
          </Link>
          <Link
            to={"/auth/register"}
            onClick={toggleSidebar}
            className="hover:bg-primary-light font-bold dark:hover:bg-primary-dark px-3 py-2 rounded-md"
          >
            Register
          </Link>
        </div>
      ) : (
        // side bar
        <div className=" container px-3 space-y-2 h-screen bg-background-light  dark:bg-background-dark">
          <Logo />
          <Link
            to={"/"}
            onClick={toggleSidebar}
            className="block px-4 py-2 hover:bg-primary-light font-bold dark:hover:bg-primary-dark   rounded-md"
          >
            Home
          </Link>
          <Link
            to={"/explore"}
            onClick={toggleSidebar}
            className="block px-4 py-2 hover:bg-primary-light font-bold dark:hover:bg-primary-dark rounded-md"
          >
            Explore
          </Link>
          <Link
            to={"/about"}
            onClick={toggleSidebar}
            className="block px-4 py-2 hover:bg-primary-light font-bold dark:hover:bg-primary-dark rounded-md"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            onClick={toggleSidebar}
            className="block px-4 py-2 hover:bg-primary-light font-bold dark:hover:bg-primary-dark rounded-md"
          >
            Contact
          </Link>
          <Link
            to={"/auth/login"}
            onClick={toggleSidebar}
            className="block px-4 py-2 bg-blue-400 text-white rounded-md w-100 h-30 "
          >
            Login
          </Link>
          <Link
            to={"/auth/register"}
            onClick={toggleSidebar}
            className="block px-4 py-2 text-dark border-2 border-blue-400 rounded-md "
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
