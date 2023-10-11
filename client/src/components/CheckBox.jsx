import React, { useState } from "react";

const CheckBox = ({ name, labelText, defaultValue, margin }) => {
  // console.log(defaultValue)
  const [isChecked, setIsChecked] = useState(defaultValue)
  return (
    <div className={`form-control ${margin || "mt-8"} w-full `}>
      <label className="label cursor-pointer sm:flex justify-around items-center" htmlFor={name}>
        <span className="label-text ">{labelText || name}</span>
        <input
          type="checkbox"
          name={name}
          id={name}
          value={true}
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="checkbox checkbox-sm checkbox-success"
        />
      </label>
    </div>
  );
};

export default CheckBox;
