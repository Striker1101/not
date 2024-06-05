import React from "react";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./indexPage";
import Upload from "./Upload";
import Minted from "./Minted";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Buy from "./Buy";
import Profile from "./Profile";
import NFTCard from "./NFTCard";
import Terms from "./Terms";
import Wallet from "./Wallet";
import UserNFT from "./UserNFT";
export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" index element={<IndexPage />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/minted" element={<Minted />} />
      <Route path="/nft/:id" element={<NFTCard />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/user_nft" element={<UserNFT />} />
    </Routes>
  );
}
