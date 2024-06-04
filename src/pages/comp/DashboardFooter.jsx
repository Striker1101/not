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
import { logout } from "../../firebase/auth";

export default function DashboardFooter() {
  return (
    <div className="fixed w-screen bottom-0 left-0 py-4 bg-inherit">
      <div className=" flex flex-row justify-evenly align-middle px-3 ">
        <Link
          to="/dashboard/"
          className=" px-1 max-h-2  flex flex-row gap-3 items-center md:justify-center"
          title="Home"
        >
          <HomeImg className="w-6 h-auto" />
        </Link>
        <Link
          to={"/dashboard/upload"}
          className="px-1 max-h-2  flex flex-row gap-3 items-center md:justify-center"
          title="Upload NFT"
        >
          <UploadImg className="w-6 h-auto" />
        </Link>
        <Link
          to={"/dashboard/minted"}
          className="px-1 max-h-2  flex flex-row gap-3 items-center md:justify-center"
          title="Minted NFTs"
        >
          <MintedImg className="w-6 h-auto" />
        </Link>
        <Link
          to={"/dashboard/deposit"}
          className="px-1 max-h-2 flex flex-row gap-3 items-center md:justify-center"
          title="Deposit"
        >
          <DepositImg className="w-6 h-auto" />
        </Link>
        <Link
          to={"/dashboard/withdraw"}
          className="px-1 max-h-2  flex flex-row gap-3 items-center md:justify-center"
          title="Withdraw"
        >
          <WithdrawImg className="w-6 h-auto" />
        </Link>
        <Link
          to={"/dashboard/buy"}
          className="px-1 max-h-2  flex flex-row gap-3 items-center md:justify-center"
          title="Buy NFT"
        >
          <BuyImg className="w-6 h-auto" />
        </Link>
        <Link
          to={"/dashboard/profile"}
          className="px-1 max-h-2  flex flex-row gap-3 items-center md:justify-center"
          title="My Profile"
        >
          <ProfileImg className="w-6 h-auto" />
        </Link>
        <button
          onClick={logout}
          className="px-1 max-h-2  flex flex-row gap-3 items-center md:justify-center"
          title="Log Out"
        >
          <LogoutImg className="w-6 h-auto" />
        </button>
      </div>
    </div>
  );
}
