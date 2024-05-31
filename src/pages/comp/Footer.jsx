import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import img1 from "../../resources/images/footer/img1.jpeg";
import img2 from "../../resources/images/footer/img2.jpeg";
import img3 from "../../resources/images/footer/img3.jpeg";
import img4 from "../../resources/images/footer/img4.jpeg";
import FormTag from "../../components/vendor/form/FormTag";
import InputText from "../../components/vendor/form/InputText";
import InputSubmit from "../../components/vendor/form/InputSubmit";
export default function Footer() {
  return (
    <div
      className="bg-gradient-to-r from-blue-200 to-green-200 p-10 flex flex-col gap-4 md:flex-row justify-evenly  text-background-dark"
      style={{ borderTop: "3px solid gray" }}
    >
      <div className="flex-3 flex flex-col justify-evenly">
        <div>
          <Logo />
          <p>
            Created with the collaboration of over 60 of the world's best Nuron
            Artists.
          </p>
        </div>
        <div className="m-4 text-2xl font-bold">
          <h1>Tranding ArtWork</h1>
          <div className="flex  gap-4">
            <img
              className="rounded-xl"
              src={img1}
              alt=""
              width={50}
              height={50}
            />
            <img
              className="rounded-xl"
              src={img2}
              alt=""
              width={50}
              height={50}
            />
            <img
              className="rounded-xl"
              src={img3}
              alt=""
              width={50}
              height={50}
            />
            <img
              className="rounded-xl"
              src={img4}
              alt=""
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>

      <div className="flex-3 flex flex-col">
        <h1 className="m-4 text-xl font-bold">
          Receive Latest Updates for Free
        </h1>
        <FormTag>
          <InputText />
          <InputSubmit />
        </FormTag>
        <div className="flex justify-between">
          <div className="m-3">
            <h1 className="font-bold text-xl">Navigation</h1>
            <ul>
              <li className="hover:text-blue-500 font-bold m-3">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="hover:text-blue-500 font-bold m-3">
                <Link to={"/explore"}>Explore</Link>
              </li>
              <li className="hover:text-blue-500 font-bold m-3">
                <Link to={"/about"}> About</Link>
              </li>
              <li className="hover:text-blue-500 font-bold m-3">
                <Link to={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>
          <div className="m-3">
            <h1 className="font-bold text-xl">Explore</h1>
            <ul>
              <li className="text-blue-400 font-bold m-3">
                <Link to={"/explore/explore_artworks"}> Explore Artworks</Link>
              </li>
              <li className="text-blue-400 font-bold m-3">
                <Link to={"/explore/single_artworks"}>Single Artworks</Link>
              </li>
              <li className="text-blue-400 font-bold m-3">
                <Link to={"/explore/explore_creators"}>Explore Creators</Link>
              </li>
              <li className="text-blue-400 font-bold m-3">
                <Link to={"/explore/single_creators"}>Single Creators</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className=" flex flex-col absolute bottom-0 m-7">
        Copyright © 2021 All rights reserved.
      </p>
    </div>
  );
}
