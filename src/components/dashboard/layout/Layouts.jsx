import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Leftmenu from "../leftmenu/Leftmenu";

function Layouts() {
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-9">
          <div className="col-span-2">
            <Leftmenu />
          </div>
          <div className="md:col-span-7 h-full">
            <div className="shadow bg-gray-800">
              <Header />
            </div>
            <div className="p-10">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 p-5 text-center text-white">
        <p>
          Design & Development by
          {" "}
          <a href="www.tobibur.me" className="underline text-blue-500">Tobibur</a>
        </p>
      </div>
    </div>
  );
}

export default Layouts;
