import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { isDealer } = useSelector((state) => state.dealerAuth);
  if (!isDealer) {
    return <Navigate to="/" state={{ path: pathname }} />;
  }
  return children;
};
export default PrivateRoute;
