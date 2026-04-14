import React from "react";
import { Route, Routes } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import Login from "./Login";
import Register from "./Register";
import ResetPasswordConfirm from "./ResetPasswordConfirm";

export default function AuthIndex() {
  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 w-full px-4">
        <Routes>
          <Route path="/" index element={""} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/reset_password_confirm" element={<ResetPasswordConfirm />} />
        </Routes>
      </div>
    </div>
  );
}
