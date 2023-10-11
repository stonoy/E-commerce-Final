import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FormRange = ({ name, labelText ,defaultValue}) => {
  // const location = useLocation()
  // const navigate = useNavigate()
  const step = 100;
  const maxPrice = 1500;
  const [selectedPrice, setSelectedPrice] = useState(defaultValue || maxPrice);

//   const handelSearch = ( e) => {
//     const newValue = e.target.value
//     setSelectedPrice(newValue)
//     const {pathname,search} = location
//     let searchParams = new URLSearchParams(search)
//     searchParams.set('price', newValue)
//     // console.log(searchParams.toString())
//     navigate(`${pathname}?${searchParams}`)
// }

  return (
    <div className="form-control w-full">
      <label htmlFor={name} className="label ">
        <span className="label-text capitalize">{labelText || name}</span>
        <span>{selectedPrice}</span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        step={step}
        className="range range-primary range-sm"
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
      />
      <label className="label">
        <span className="label-text-alt">0</span>
        <span className="label-text-alt">Max: {maxPrice}</span>
      </label>
    </div>
  );
};

export default FormRange;
