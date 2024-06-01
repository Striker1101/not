import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/landing/Homepage";
import Explore from "./pages/landing/Explore";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";
import AuthIndex from "./pages/landing/Auth/AuthIndex";
import ProtecteDashboard from "./pages/dashboard/ProtecteDashboard";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import AdminIndex from "./pages/admin/AdminIndex";
import ProtecteAdmin from "./pages/admin/ProtecteAdmin";

export default function RouterIndex() {
  return (
    <Routes>
      <Route path="/" index element={<Homepage />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth/*" element={<AuthIndex />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtecteDashboard>
            <DashboardIndex />
          </ProtecteDashboard>
        }
      />
      <Route
        path="/admin/*"
        element={
          <ProtecteAdmin>
            <AdminIndex />
          </ProtecteAdmin>
        }
      />
    </Routes>
  );
}
