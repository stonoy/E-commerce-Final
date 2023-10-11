import React from "react";

const FormInput = ({ type, name, labelText, defaultValue, placeholder }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor="name" className="label">
        <span className="label-text "> {labelText || name}</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder || ""}
        defaultValue={defaultValue || ""}
        className="input input-bordered input-sm  rounded-sm w-full max-w-xs"
      />
    </div>
  );
};

export default FormInput;
