import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/landing/Homepage";
import Explore from "./pages/landing/Explore";

export default function RouterIndex() {
  return (
    <Routes>
      <Route path="/" index element={<Homepage />} />
      <Route path="/explore" index element={<Explore />} />
    </Routes>
  );
}
