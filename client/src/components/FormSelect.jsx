import React from "react";

const FormSelect = ({ name, labelText, list,defaultValue }) => {
  return (
    <div className="form-control w-full ">
      <label className="label" htmlFor={name}>
        <span className="label-text">{labelText || name}</span>
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="select select-sm border-base-300"
      >
        {list.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
