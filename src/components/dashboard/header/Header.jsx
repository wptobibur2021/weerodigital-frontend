import React, { useState } from "react";
import { FaUserAlt, FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { dealerLoggedOut } from "../../../feature/delears/dealerAuth";
import { camelCase } from "../../../utility/camelCase";
import { Link } from "react-router-dom";
import userPhoto from "../../../assets/images/user_01.jpg"
import { adminLoggedOut } from "../../../feature/admin/adminAuth";
function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const {dealer} = useSelector((state)=>state.dealerAuth);
  const {admin} = useSelector((state)=>state.adminAuth);
  console.log("Admin: ", admin)
  return (
    <div>
      <div>
        <div className="flex justify-between py-3 px-10">
          <div className="text-2xl text-white">
            <h2>Welcome to Mr. {camelCase(dealer.fullName ? dealer.fullName : admin.fullName)}</h2>
          </div>
          <div className="relative">
            <div onClick={()=>setOpenMenu(!openMenu)}>
              <img className="w-10 cursor-pointer h-10 rounded-full border" src={dealer.photo ? dealer.photo : userPhoto} alt="Tobibur Rohman" />
            </div>
            <div className={`absolute transition-all ease-in-out duration-700 w-32 bg-gray-950 right-0 py-1 px-5 ${
                openMenu === true ? "top-12 z-50 opacity-1 block" : "hidden top-16"
              }`}>
              <ul className="divide-y divide-dashed text-gray-700 divide-gray-800">
                {
                  dealer?.fullName ? (
                    <li onClick={()=>dispatch(dealerLoggedOut())} className="group py-2 cursor-pointer">
                      <div className="flex items-center ease-in-out duration-500 group-hover:text-white">
                        <FaPowerOff className="mr-2" /> LogOut
                      </div>
                    </li>
                  ):(
                    <li onClick={()=>dispatch(adminLoggedOut())} className="group py-2 cursor-pointer">
                    <div className="flex items-center ease-in-out duration-500 group-hover:text-white">
                      <FaPowerOff className="mr-2" /> LogOut
                    </div>
                  </li>
                  ) 
                }

              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Header;
