import React from "react";
import { Link, Outlet } from "react-router-dom";


function Header() {
  return (
    <div className="w-full h-auto bg-slate-800 fixed top-0 left-0 right-0 z-40">
      <Link
        style={{ display: "block", margin: "1rem 0" }}
        to={`/`}
      >
        <div className="text-2xl font-bold m-5 text-white">
          Home
        </div>
      </Link>
    </div>
  )
}
export default Header;