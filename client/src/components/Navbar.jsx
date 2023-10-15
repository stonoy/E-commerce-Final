import React, { useState } from "react";
import { Links } from "../utils/all";
import Navlinks from "./Navlinks";
import { FaShoppingCart } from "react-icons/fa";
import { FiAlignLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { homeContextProvider } from "../pages/HomeLayOut";

const Navbar = () => {
  const [hideDropDown, setHideDropDown] = useState(false);
  const {cartData:{numItemsInCart}} = homeContextProvider()

  return (
    <nav className="bg-base-300 p-3 ">
      <div className="align-element text-base-content flex justify-between item-center">
        <button className=" hidden md:inline-block h-auto min-h-0  btn text-2xl bg-primary text-primary-content">
          <Link to="/">E</Link>
        </button>
        {/* DROPDOWN */}

        <div className="dropdown dropdown-bottom md:hidden">
          <label
            tabIndex={0}
            className="btn text-2xl"
            onClick={() => setHideDropDown(false)}
          >
            <FiAlignLeft />
          </label>
          <ul
            tabIndex={0}
            className={
              hideDropDown
                ? "hidden dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                : "dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            }
            onClick={() => setHideDropDown(true)}
          >
            <Navlinks />
          </ul>
        </div>

        <ul className="hidden md:menu-horizontal mt-2">
          <Navlinks />
        </ul>
        <Link to='/cart' className="text-2xl mt-2 relative">
          <FaShoppingCart />
          <div className="badge badge-primary badge-md absolute bottom-[30px] left-[12px] md:bottom-[20px]">{numItemsInCart}</div>
          {/* {console.log(numItemsInCart)} */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
