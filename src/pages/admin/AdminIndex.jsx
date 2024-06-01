import React from "react";
import { Route, Routes } from "react-router-dom";

export default function AdminIndex() {
  return (
    <Routes>
      <Route path="/" index element={""} />
    </Routes>
  );
}
