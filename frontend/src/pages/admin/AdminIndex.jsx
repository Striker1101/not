import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import Users from "./Users";

export default function AdminIndex() {
  return (
    <AdminLayout>
        <Routes>
            <Route path="/" index element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
        </Routes>
    </AdminLayout>
  );
}
