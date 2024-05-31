import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/landing/Homepage";
import Explore from "./pages/landing/Explore";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";
import Index from "./pages/landing/Auth/Index";

export default function RouterIndex() {
  return (
    <Routes>
      <Route path="/" index element={<Homepage />} />
      <Route path="/explore" index element={<Explore />} />
      <Route path="/about" index element={<About />} />
      <Route path="/contact" index element={<Contact />} />
      <Route path="/auth" index element={<Index />} />
    </Routes>
  );
}
