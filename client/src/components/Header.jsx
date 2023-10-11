import React, { useState } from "react";
import { homeContextProvider } from "../pages/HomeLayOut";
import { Link, useNavigate } from "react-router-dom";
import {IoMdArrowDropdown} from 'react-icons/io'
import { BsSunFill, BsSun } from "react-icons/bs";

const Header = () => {
  const { Name, Role, logout,getTheme } = homeContextProvider();
  const [theme, setTheme] = useState(getTheme())
  const navigate = useNavigate();

  const toggleThemeBtn = theme !== "winter" ? <BsSunFill /> : <BsSun />;

  const toggleTheme = () => {
    const newTheme = theme === 'winter' ? 'dracula' : 'winter'

    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const handelClick = () => {
    if (Name) {
      logout();
      return;
    }
    navigate("/login");
  };

  return (
    <header className="  py-2 bg-neutral text-neutral-content">
      <div className="align-element flex justify-end items-center">
      <button onClick={toggleTheme} className="btn btn-sm btn-neutral">
            {toggleThemeBtn}
          </button>
        <h2>
          Hello, <span className="capitalize">{Name || "user"}</span>
        </h2>
        {/* {DROPDOWN START} */}
        {Name && <div className="dropdown ">
  <label tabIndex={0} className="btn btn-xs p-0 bg-neutral border-neutral"><IoMdArrowDropdown className="text-xl text-neutral-content hover:text-base-content"/></label>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 text-base-content rounded-box w-52">
    
    <li><Link to='./orders'>My Orders</Link></li>
  </ul>
</div>}


        {/* {DROPDOWN END} */}
        <button
          className=" btn btn-outline btn-accent ml-4 h-auto min-h-0"
          onClick={handelClick}
        >
          {Name ? "Logout" : "Login/Register"}
        </button>
      </div>
    </header>
  );
};

export default Header;
