import React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Layouts from "../components/dashboard/layout/Layouts";
import AddDealers from "../components/dashboard/dealers/AddDealers";
import ViewDealers from "../components/dashboard/dealers/ViewDealers";
import ViewProducts from "../components/dashboard/products/ViewProducts";
import AddProducts from "../components/dashboard/products/AddProducts";
import LoginPage from "../page/frontend/Login";
import PrivateRoute from "../utility/PrivateRoute";
import ProfilePage from "../page/frontend/ProfilePage";
import InvoicePage from "../page/frontend/InvoicePage";
import AdminLoginPage from "../page/frontend/AdminLogin";
import AdminRoute from "../utility/AdminRoute";

const routes = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <Layouts />
      </AdminRoute>
    ),
    children: [
      {
        path: "/dashboard/add-dealers",
        element: <AddDealers />,
      },
      {
        path: "/dashboard/all-dealers",
        element: <ViewDealers />,
      },
      {
        path: "/dashboard/add-products",
        element: <AddProducts />,
      },
      {
        path: "/dashboard/user/profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard/all-products",
        element: <ViewProducts />,
      },
      {
        path: "/dashboard/all-invoice",
        element: <InvoicePage />,
      },
    ],

  },

  {
    path: "/dashboard/user",
    element: (
      <PrivateRoute>
        <Layouts />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/user/add-products",
        element: <AddProducts />,
      },
      {
        path: "/dashboard/user/all-products",
        element: <ViewProducts />,
      },
      {
        path: "/dashboard/user/all-invoice",
        element: <InvoicePage />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginPage/>
  },
  {
    path: "/admin/login",
    element: <AdminLoginPage/>
  }
]);

export default routes;
