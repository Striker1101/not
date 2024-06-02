import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeImg } from "../../resources/images/dashboard/nav/house-solid.svg";
import logo from "../../resources/broken.svg";
import { general } from "../../utility/general";
import { ReactComponent as UploadImg } from "../../resources/images/dashboard/nav/file-export-solid.svg";
import { ReactComponent as MintedImg } from "../../resources/images/dashboard/nav/magnifying-glass-dollar-solid.svg";
import { ReactComponent as DepositImg } from "../../resources/images/dashboard/nav/money-bill-transfer-solid.svg";
import { ReactComponent as WithdrawImg } from "../../resources/images/dashboard/nav/house-flood-water-circle-arrow-right-solid.svg";
import { ReactComponent as BuyImg } from "../../resources/images/dashboard/nav/coins-solid.svg";
import { ReactComponent as ProfileImg } from "../../resources/images/dashboard/nav/user-pen-solid.svg";
import { ReactComponent as LogoutImg } from "../../resources/images/dashboard/nav/right-from-bracket-solid.svg";

export default function DashBoardLinks({ toggleSidebar, isOpen }) {
  function logout() {}
  return (
    <div className="flex flex-col justify-evenly rounded-xl align-middle px-3 h-screen z-10  ">
      <div className="flex gap-3 items-center max-h-2 ">
        <img src={logo} alt="logo" width={50} height={20} />
        <p className="text-blue-500 text-xl font-bold hidden md:block">
          {" "}
          {general.name}
        </p>
        <button
          onClick={toggleSidebar}
          className="focus:outline-none hidden md:block"
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <hr className="m-0 p-0" />
      <Link
        to="/dashboard/"
        className=" px-1 max-h-2 flex flex-row gap-3 items-center md:justify-center"
        title="Home"
      >
        <HomeImg className="w-6 h-auto" />
        <span className="hidden md:block text-xl">Dashboard</span>
      </Link>
      <Link
        to={"/dashboard/upload"}
        className="px-1 max-h-2 flex flex-row gap-3 items-center md:justify-center"
        title="Upload NFT"
      >
        <UploadImg className="w-6 h-auto" />
        <p className="hidden md:block">Upload NFTs</p>
      </Link>
      <Link
        to={"/dashboard/minted"}
        className="px-1 max-h-2 flex flex-row gap-3 items-center md:justify-center"
        title="Minted NFTs"
      >
        <MintedImg className="w-6 h-auto" />
        <p className="hidden md:block">Minted NFTs</p>
      </Link>
      <Link
        to={"/dashboard/deposit"}
        className="px-1 max-h-2 flex flex-row gap-3 items-center md:justify-center"
        title="Deposit"
      >
        <DepositImg className="w-6 h-auto" />
        <p className="hidden md:block">Deposit</p>
      </Link>
      <Link
        to={"/dashboard/withdraw"}
        className="px-1 max-h-2 flex flex-row gap-3 items-center md:justify-center"
        title="Withdraw"
      >
        <WithdrawImg className="w-6 h-auto" />
        <p className="hidden md:block">Withdraw</p>
      </Link>
      <Link
        to={"/dashboard/buy"}
        className="px-1 max-h-2 flex flex-row gap-3 items-center md:justify-center"
        title="Buy NFT"
      >
        <BuyImg className="w-6 h-auto" />
        <p className="hidden md:block">BUY NFT</p>
      </Link>
      <Link
        to={"/dashboard/profile"}
        className="px-1 max-h-2 flex flex-row gap-3 items-center md:justify-center"
        title="My Profile"
      >
        <ProfileImg className="w-6 h-auto" />
        <p className="hidden md:block">My Profile</p>
      </Link>
      <hr className="m-0 p-0" />
      <button
        onClick={logout}
        className="px-1 max-h-2 flex flex-row gap-3 items-center md:justify-center"
        title="Log Out"
      >
        <LogoutImg className="w-6 h-fit" />
        <p className="hidden md:block">Log Out</p>
      </button>
    </div>
  );
}
