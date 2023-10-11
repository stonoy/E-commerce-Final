import React, { useState } from "react";
import FormInput from "./FormInput";
import { Form, useNavigate } from "react-router-dom";
import { BsArrowBarLeft, BsArrowBarRight, BsChevronDown } from "react-icons/bs";

import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import CheckBox from "./CheckBox";
import MoreFilters from "./MoreFilters";

const Sidebar = ({ products,params, openSidebar,setOpenSideBar }) => {
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  
  const [showMoreFilters, setShowMoreFilters] = useState(Object.keys(params).length > 1 || false);

  const {name,order,price,freeShipping} = params

 

  const toggleButton = isSideBarOpen ? (
    <BsArrowBarLeft
      onClick={() => setIsSideBarOpen((prevState) => !prevState)}
    />
  ) : (
    <BsArrowBarRight
      onClick={() => setIsSideBarOpen((prevState) => !prevState)}
    />
  );

  // console.log(params)

  return (
    <div className={`${!openSidebar ? 'hidden' : 'bg-base-100'} absolute w-full py-4  left-0 top-15 h-fit min-h-screen  z-10 md:h-fit md:flex  flex-col gap-2 items-end pr-2 md:py-0 border-r-2 ml-auto md:relative`}>
      <button className="hidden md:btn md:btn-sm ">{toggleButton}</button>
      <div
        className={`${!openSidebar && 'hidden'}  md:${
          !isSideBarOpen ? "hidden" : "flex"
        }  flex-col items-center gap-4  `}
      >
        {/* {Main Filters} */}
        <Form className="flex flex-col gap-2 items-center">
        <FormInput
            type="search"
            name="name"
            labelText=" "
            defaultValue={name}
            placeholder="Search by name"
          />
          <FormSelect
            name="order"
            labelText="Sort by"
            defaultValue={order}
            list={[ "a-z", "z-a", "high", "low"]}
          />
          <FormRange name="price" labelText="Choose a Price" defaultValue={price}/>
          <CheckBox
            name="freeShipping"
            labelText="Free Shipping"
            defaultValue={freeShipping}
            margin="mt-0"
          />
          <button type="submit" className="btn btn-wide btn-sm mt-4 text-success-content " onClick={() => setIsSideBarOpen(false)}>
            Apply
          </button>
          <button
            className="btn btn-wide btn-sm text-error"
            onClick={() => navigate("/products")}
          >
            Reset
          </button>
        </Form>
        {/* {controlled checkbox} */}

        <div className={`form-control  w-full my-4`}>
          <label className="label cursor-pointer sm:flex justify-around items-center" htmlFor="showMoreFilters">
            <span className="label-text ">Show More Filters</span>
            <input
              type="checkbox"
              name="showMoreFilters"
              id="showMoreFilters"
              checked={showMoreFilters}
              onChange={(e) => setShowMoreFilters(e.target.checked)}
              className="checkbox checkbox-sm checkbox-success"
            />
          </label>
        </div>

        {/* {more filters} */}
        <div className={`${(!showMoreFilters ) ? "hidden" : ''}  flex flex-col items-center gap-2 `}>
          {/* {More filters} */}
          <MoreFilters products={products}/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
