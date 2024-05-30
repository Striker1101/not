import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Links({ toggle }) {
  return (
    <div className=" text-background-dark  dark:text-background-light  bg-background-light  dark:bg-background-dark">
      {toggle ? (
        <div className="hidden lg:flex space-x-4">
          <Link
            to={"/home"}
            className="hover:bg-primary-light  dark:hover:bg-primary-dark px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to={"/explore"}
            className="hover:bg-primary-light dark:hover:bg-primary-dark px-3 py-2 rounded-md"
          >
            Explore
          </Link>
          <Link
            to={"/about"}
            className="hover:bg-primary-light dark:hover:bg-primary-dark px-3 py-2 rounded-md"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="hover:bg-primary-light dark:hover:bg-primary-dark px-3 py-2 rounded-md"
          >
            Contact
          </Link>
          <Link
            to={"Login"}
            className="hover:bg-primary-light dark:hover:bg-primary-dark px-3 py-2 rounded-md"
          >
            Login
          </Link>
          <Link
            to={"Register"}
            className="hover:bg-primary-light dark:hover:bg-primary-dark px-3 py-2 rounded-md"
          >
            Register
          </Link>
        </div>
      ) : (
        <div className=" container px-3 space-y-2 h-screen">
          <Logo />
          <Link
            to={"/home"}
            className="block px-4 py-2 hover:bg-primary-light dark:hover:bg-primary-dark   rounded-md"
          >
            Home
          </Link>
          <Link
            to={"/explore"}
            className="block px-4 py-2 hover:bg-primary-light dark:hover:bg-primary-dark rounded-md"
          >
            Explore
          </Link>
          <Link
            to={"/about"}
            className="block px-4 py-2 hover:bg-primary-light dark:hover:bg-primary-dark rounded-md"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="block px-4 py-2 hover:bg-primary-light dark:hover:bg-primary-dark rounded-md"
          >
            Contact
          </Link>
          <Link
            to={"Login"}
            className="block px-4 py-2 bg-blue-400 text-white rounded-md w-100 h-30 "
          >
            Login
          </Link>
          <Link
            to={"Register"}
            className="block px-4 py-2 text-dark border-2 border-blue-400 rounded-md "
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
