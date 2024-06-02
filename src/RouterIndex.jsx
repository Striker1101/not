import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/landing/Homepage";
import Explore from "./pages/landing/Explore";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";
import AuthIndex from "./pages/landing/Auth/AuthIndex";
import ProtecteDashboard from "./pages/dashboard/ProtecteDashboard";
import DashboardRoutes from "./pages/dashboard/DashboardRoutes";
import AdminIndex from "./pages/admin/AdminIndex";
import ProtecteAdmin from "./pages/admin/ProtecteAdmin";
import NotFound from "./NotFound";
import { useAppState } from "./AppStateContext";
import Alert from "./components/vendor/alert/Alert";

export default function RouterIndex() {
  const { message } = useAppState();
  const { islogged } = useAppState();
  return (
    <>
      <div>
        {message.content && (
          <Alert type={message.type} message={message.content} timer={false} />
        )}
      </div>
      <Routes>
        <Route path="/" index element={<Homepage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth/*" element={<AuthIndex />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtecteDashboard islogged={islogged}>
              <DashboardRoutes />
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
        {/* Define the catch-all route for 404 errors */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
