import React from "react";
import { CheckBox, FormInput, Pagination, ProductItems } from "../components";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { customFetch } from "../utils/all";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/product", {
      params,
    });
    return { data, params };
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return null;
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  // const data = Object.fromEntries(formData);
  console.log(formData);
  try {
    await customFetch.post("/product", formData);
    return redirect("/admin");
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return null;
  }
};

const AdminProduct = () => {
  const navigate = useNavigate();
  const response = useLoaderData();
  const submit = useSubmit();

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

  // console.log(response);
  const { name } = response?.params;
  const { page, numOfPages } = response?.data;

  console.log(page, numOfPages);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl ">Create a Product</h2>
      <div className="my-6 w-full border-b-2 border-primary-content"></div>
      <Form
        className="grid grid-cols-2 gap-x-4 md:grid-cols-3"
        method="post"
        encType="multipart/form-data"
      >
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="image">
            <span className="label-text ">Product Image</span>
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="file-input file-input-bordered file-input-sm rounded-sm  w-full max-w-xs"
          />
        </div>
        <FormInput type="text" name="name" labelText="Name" />
        <FormInput type="number" name="price" labelText="Price" />
        <FormInput type="text" name="description" labelText="Description" />
        <FormInput type="text" name="category" labelText="Category" />
        <FormInput type="text" name="company" labelText="Company" />
        <FormInput type="number" name="inventory" labelText="Inventory" />
        <CheckBox name="featured" labelText="Is Featured" />
        <CheckBox name="freeShipping" labelText="Free Shipping" />
        <button
          type="submit"
          className="btn bg-neutral text-neutral-content col-span-full mt-8 hover:text-base-content md:col-span-2"
        >
          Submit
        </button>
        <button
          type="button"
          className="btn bg-neutral text-neutral-content col-span-full mt-8 hover:text-base-content md:col-span-1"
          onClick={() => navigate(0)}
        >
          Reset
        </button>
      </Form>
      {response.data && (
        <>
          <h2 className="text-2xl  mt-8">Number of Products</h2>
          <div className="my-4 w-full border-b-2 border-primary-content"></div>
          <h2 className="py-4 ">Number of Products: {response.data.count}</h2>
          <div className="my-4 flex justify-between items-center">
            <h2 className=" ">Product Details</h2>
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
          </div>
          <ProductItems {...response.data} />
        </>
      )}
      <Pagination numOfPages={numOfPages} page={page} />
    </div>
  );
};

export default AdminProduct;
