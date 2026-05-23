// ProtectedDashboard.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "./Dashboard"; // adjust the path as needed

const ProtectedDashboard = () => {
  const token = localStorage.getItem("token"); // check if user is logged in
  if (!token) return <Navigate to="/login" replace />; // redirect guests
  return <Dashboard />; // render Dashboard for logged-in users
};

export default ProtectedDashboard;
