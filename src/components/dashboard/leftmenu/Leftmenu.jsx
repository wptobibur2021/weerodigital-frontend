import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Leftmenu() {
  const {isAdmin} = useSelector((state)=>state.adminAuth);
  console.log("Is Admin: ", isAdmin) 
  return (
    <div className="h-full bg-gray-900 text-white font-semibold text-lg shadow">
      <div className="px-5 py-4 border-b border-gray-700 border-dashed">
        <h2 className="text-2xl font-bold">COMPANY LOGO</h2>
      </div>
      <div className="px-5 mt-10">
       {
        isAdmin ? (
          <ul className="flex flex-col space-y-3">
            <l1 className="hover:underline hover:text-blue-700 ease-in-out transition-all duration-700"><Link to="/dashboard/add-products">Add Product</Link></l1>
            <l1 className="hover:underline hover:text-blue-700 ease-in-out transition-all duration-700"><Link to="/dashboard/all-products">View Product</Link></l1>
            <l1 className="hover:underline hover:text-blue-700 ease-in-out transition-all duration-700"><Link to="/dashboard/add-dealers">Add Dealers</Link></l1>
            <l1 className="hover:underline hover:text-blue-700 ease-in-out transition-all duration-700"><Link to="/dashboard/all-dealers">View Dealers</Link></l1>
            <l1 className="hover:underline hover:text-blue-700 ease-in-out transition-all duration-700"><Link to="/dashboard/all-invoice">View Invoice</Link></l1>
        </ul>
        ):(
          <ul className="flex flex-col space-y-3">
            <l1 className="hover:underline hover:text-blue-700 ease-in-out transition-all duration-700"><Link to="/dashboard/user/add-products">Add Product</Link></l1>
            <l1 className="hover:underline hover:text-blue-700 ease-in-out transition-all duration-700"><Link to="/dashboard/user/all-products">View Product</Link></l1>
            <l1 className="hover:underline hover:text-blue-700 ease-in-out transition-all duration-700"><Link to="/dashboard/user/all-invoice">View Invoice</Link></l1>
          </ul>
        )
       }
      </div>
    </div>
  );
}

export default Leftmenu;
