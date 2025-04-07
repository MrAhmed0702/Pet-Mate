import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;
  return user && user.isAdmin ? children : <Navigate to="/" state={{ error: "Admin access required" }}/>;
};

export default AdminRoute;
