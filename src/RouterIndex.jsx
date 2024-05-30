import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/landing/Homepage";

export default function RouterIndex() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
    </Routes>
  );
}
