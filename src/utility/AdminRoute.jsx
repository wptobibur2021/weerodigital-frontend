import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { isAdmin } = useSelector((state)=> state.adminAuth);
  if(!isAdmin){
    return <Navigate to="/admin/login" state={{ path: pathname }} />;
  }
  return children;
};
export default AdminRoute;
