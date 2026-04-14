import React from "react";
import { Route, Routes } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import Login from "./Login";
import Register from "./Register";
import ResetPasswordConfirm from "./ResetPasswordConfirm";

export default function AuthIndex() {
  return (
    <Routes>
      <Route path="/" index element={""} />
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      {/* reset password */}
      <Route path="/reset_password" element={<ResetPassword />} />
      <Route
        path="/reset_password_confirm"
        element={<ResetPasswordConfirm />}
      />
    </Routes>
  );
}
