import React from "react";
import { Route, Routes } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import Login from "./Login";
import Register from "./Register";
import ResetPasswordConfirm from "./ResetPasswordConfirm";
import EmailVerification from "./EmailVerification";
import EmailVerificationConfirm from "./EmailVerificationConfirm";

export default function Index() {
  return (
    <Routes>
      <Route path="/" index element={""} />
      <Route path="/login" index element={<Login />} />

      <Route path="/register" index element={<Register />} />
      {/* reset password */}
      <Route path="/reset_password" index element={<ResetPassword />} />
      <Route
        path="/reset_password_confirm"
        index
        element={<ResetPasswordConfirm />}
      />
      {/* email verification */}
      <Route path="/email_verification" index element={<EmailVerification />} />
      <Route
        path="/email_verification_confirm"
        index
        element={<EmailVerificationConfirm />}
      />
    </Routes>
  );
}
