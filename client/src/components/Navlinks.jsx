import React from "react";
import { Links } from "../utils/all";
import { NavLink } from "react-router-dom";
import { homeContextProvider } from "../pages/HomeLayOut";

const Navlinks = () => {
  const { Role } = homeContextProvider();

  return (
    <>
      {Links.map((link) => {
        const { id, title, path } = link;
        if (Role !== "admin" && id === 5) {
          return;
        }
        return (
          <li key={id}>
            <NavLink
              to={path}
              className="p-2 rounded-md mr-2  hover:bg-neutral-500"
            >
              {title}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default Navlinks;
