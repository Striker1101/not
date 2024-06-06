import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./Index";

export default function AdminIndex() {
  return (
    <Routes>
      <Route path="/" index element={<Index />} />
    </Routes>
  );
}
