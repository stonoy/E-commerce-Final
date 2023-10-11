import React, { useEffect } from "react";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { customFetch } from "../utils/all";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let err = "";
  if (data.password.length < 6) {
    err = "password should be at least six characters long";
    return err;
  }

  try {
    await customFetch.post("/auth/login", data);
    console.log("login successful");
    return redirect("/");
  } catch (error) {
    console.log(error?.response?.data?.msg);
    err = error?.response?.data?.msg;
    return err;
  }
};

const Login = ({getTheme}) => {

  useEffect(() => {
    getTheme()
  },[])

  const err = useActionData();
  return (
    <main className="hero min-h-screen bg-base-200">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <Form className="card-body" method="post">
          <h2 className="text-lg w-fit mx-auto">Login Here</h2>
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="input input-bordered"
            />
            <label className="label mt-4">
              New Here ...
              <Link
                to="/register"
                className="text-primary-content-500 border-b-2"
              >
                Register
              </Link>
            </label>
          </div>
          <div className="form-control mt-4">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
          {err && <p className="text-error w-fit mx-auto font-bold">{err}</p>}
        </Form>
      </div>
    </main>
  );
};

export default Login;