import React, { useState } from 'react'
import { BsArrowBarLeft, BsArrowBarRight, BsChevronDown } from "react-icons/bs";
import { sortProducts } from "../utils/all";
import { useLocation, useNavigate } from 'react-router-dom';

const MoreFilters = ({products}) => {
    const [openBtnName, setOpenBtnName] = useState("");
    const location = useLocation()
    const navigate = useNavigate()

    // console.log(location)

    const handelSearch = (query, value) => {
        const {pathname,search} = location
        let searchParams = new URLSearchParams(search)
        searchParams.set(query, value)
        // console.log(searchParams.toString())
        navigate(`${pathname}?${searchParams}`)
    }

    const handelClick = (input) => {
        if (openBtnName) {
          setOpenBtnName((prevState) => {
            
    
            return prevState === input ? "" : input;
          });
          return;
        }
        setOpenBtnName(input);
      };

      const categories = sortProducts(products, "category");
  const companies = sortProducts(products, "company");

  return (
    <>
        <div>
            <button
              className="btn btn-wide btn-sm"
              onClick={() => handelClick("category")}
            >
              Category <BsChevronDown />
            </button>
            <ul
              className={`${
                openBtnName === "category" ? "flex" : "hidden"
              } flex-col gap-1 text-center mt-2 `}
            >
              {categories.map((item) => {
                return (
                  <li
                    key={item}
                    className="bg-base-100 rounded-md capitalize cursor-pointer hover:bg-slate-300 duration-300"
                    onClick={() => handelSearch('category', item)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <button
              className="btn btn-wide btn-sm"
              onClick={() => handelClick("company")}
            >
              Company <BsChevronDown />
            </button>
            <ul
              className={`${
                openBtnName === "company" ? "flex" : "hidden"
              } flex-col gap-1 text-center mt-2 `}
            >
              {companies.map((item) => {
                return (
                  <li
                    key={item}
                    className="bg-base-100 rounded-md capitalize cursor-pointer hover:bg-slate-300 duration-300"
                    onClick={() => handelSearch('company', item)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
    </>
  )
}

export default MoreFilters