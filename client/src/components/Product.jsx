import React, { useState } from "react";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import {BsThreeDotsVertical} from 'react-icons/bs'
import Sidebar from "./Sidebar";
import Gallery from "./Gallery";
import FormInput from "./FormInput";
import ButtonParams from "./ButtonParams";

const Product = () => {
  const submit = useSubmit();
  const response = useLoaderData();
  const [openSidebar, setOpenSideBar] = useState(false)
  // console.log(response)
  if (!response) {
    return <h1>Error , in loading products</h1>;
  }

  const {
    data: { products },
    params,
  } = response;

  const { name, order, price, freeShipping } = params;

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1500);
    };
  };

  return (
    <div>
      <ButtonParams params={params} />
      <div className="pt-2 flex justify-between items-center">
        <Form
          onChange={debounce((form) => {
            submit(form);
          })}
        >
          <FormInput
            type="search"
            name="name"
            labelText=" "
            defaultValue={name}
            placeholder="Search by name"
          />
        </Form>
        <button className="btn btn-sm md:hidden" onClick={() => setOpenSideBar(prev => !prev)}><BsThreeDotsVertical/></button>
      </div>
      <div className="my-6 w-full border-b-2 border-primary-content"></div>
      <div className= {` grid grid-cols-[auto_1fr] gap-6 `}>
        <Sidebar products={products} params={params} openSidebar={openSidebar} setOpenSideBar={setOpenSideBar}/>
        <Gallery products={products} openSidebar={openSidebar}/>
      </div>
    </div>
  );
};

export default Product;
