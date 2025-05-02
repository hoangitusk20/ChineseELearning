import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuthStatus } from "../services/authService";

const PrivateRoute = ({ children }) => {
  const { accessToken, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated || !checkAuthStatus(accessToken)) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoute;
