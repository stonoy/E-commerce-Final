import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

const ButtonParams = ({ params }) => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(search);
  let queries = [];

  searchParams.forEach((value, key) => {
    if (value !== "" && key !== "page") {
      queries.push(value);
    }
  });

  const deleteSearchParams = (givenValue) => {
    searchParams.forEach((value, key) => {
      if (value === givenValue) {
        searchParams.delete(key);
        navigate(`${pathname}?${searchParams}`);
      }
    });
  };

  // console.log(queries)

  return (
    <div className="flex overflow-x-auto w-fit mx-auto pt-4 gap-4 ">
      {queries.map((query) => {
        return (
          <button
            key={query}
            className="btn btn-sm bg-base text-base-content  hover:text-base-content"
          >
            {query} <ImCancelCircle onClick={() => deleteSearchParams(query)} />
          </button>
        );
      })}
    </div>
  );
};

export default ButtonParams;
