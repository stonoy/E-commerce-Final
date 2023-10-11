import React from "react";
import { customFetch } from "../utils/all";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { CheckBox, FormInput } from "../components";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const { data } = await customFetch.get(`/product/${id}`);
    return data;
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return null;
  }
};

export const action = async ({ params, request }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  //   console.log(formData);
  try {
    await customFetch.patch(`/product/${id}`, data);
    return redirect("/admin");
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return null;
  }
};

const AdminEditProduct = () => {
  const res = useLoaderData();
  const navigate = useNavigate();
  console.log(res);

  const {
    name,
    price,
    description,
    category,
    company,
    inventory,
    featured,
    freeShipping,
  } = res?.product;

  return (
    <>
      <h2 className="text-2xl ">Update a Product</h2>
      <div className="my-6 w-full border-b-2 border-primary-content"></div>
      <Form
        className="grid grid-cols-2 gap-x-4 md:grid-cols-3"
        method="post"
        // encType="multipart/form-data"
      >
        {/* <div className="form-control w-full max-w-xs">
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
        </div> */}
        <FormInput
          type="text"
          name="name"
          labelText="Name"
          defaultValue={name}
        />
        <FormInput
          type="number"
          name="price"
          labelText="Price"
          defaultValue={price}
        />
        <FormInput
          type="text"
          name="description"
          labelText="Description"
          defaultValue={description}
        />
        <FormInput
          type="text"
          name="category"
          labelText="Category"
          defaultValue={category}
        />
        <FormInput
          type="text"
          name="company"
          labelText="Company"
          defaultValue={company}
        />
        <FormInput
          type="number"
          name="inventory"
          labelText="Inventory"
          defaultValue={inventory}
        />
        <CheckBox
          name="featured"
          labelText="Is Featured"
          defaultValue={featured}
        />
        <CheckBox
          name="freeShipping"
          labelText="Free Shipping"
          defaultValue={freeShipping}
        />
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
    </>
  );
};

export default AdminEditProduct;
