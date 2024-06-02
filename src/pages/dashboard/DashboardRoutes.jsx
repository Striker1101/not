import React from "react";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./indexPage";
import Upload from "./Upload";
import Minted from "./Minted";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Buy from "./Buy";
import Profile from "./Profile";
export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" index element={<IndexPage />} />
      <Route path="/upload" index element={<Upload />} />
      <Route path="/minted" index element={<Minted />} />
      <Route path="/deposit" index element={<Deposit />} />
      <Route path="/withdraw" index element={<Withdraw />} />
      <Route path="/buy" index element={<Buy />} />
      <Route path="/profile" index element={<Profile />} />
    </Routes>
  );
}
