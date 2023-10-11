import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Pagination = ({ numOfPages, page }) => {
  const pagesArray = Array.from({ length: numOfPages }, (_, i) => i + 1);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handelPageChange = (page) => {
    let searchParams = new URLSearchParams(search);
    searchParams.set("page", page);
    console.log(searchParams);
    navigate(`${pathname}?${searchParams}`);
  };

  const advancePagination = () => {
    if (numOfPages < 5) {
      return pagesArray.map((page) => {
        return (
          <button
            className="join-item btn "
            key={page}
            onClick={() => handelPageChange(page)}
          >
            {page}
          </button>
        );
      });
    }
    if (page === 1 || page === numOfPages) {
      return (
        <>
          <button
            className="join-item btn "
            onClick={() => handelPageChange(1)}
          >
            {1}
          </button>
          <button
            className="join-item btn "
            onClick={() => handelPageChange(2)}
          >
            {2}
          </button>
          <button className="join-item btn ">...</button>
          <button
            className="join-item btn "
            onClick={() => handelPageChange(numOfPages)}
          >
            {numOfPages}
          </button>
        </>
      );
    }
    if (page === 2) {
      return (
        <>
          <button
            className="join-item btn "
            onClick={() => handelPageChange(1)}
          >
            {1}
          </button>
          <button
            className="join-item btn "
            onClick={() => handelPageChange(2)}
          >
            {2}
          </button>
          <button
            className="join-item btn "
            onClick={() => handelPageChange(3)}
          >
            {3}
          </button>
          <button className="join-item btn ">...</button>
          <button
            className="join-item btn "
            onClick={() => handelPageChange(numOfPages)}
          >
            {numOfPages}
          </button>
        </>
      );
    }
    if (page === numOfPages - 1) {
      return (
        <>
          <button
            className="join-item btn "
            onClick={() => handelPageChange(1)}
          >
            {1}
          </button>
          <button className="join-item btn ">...</button>
          <button onClick={() => handelPageChange(numOfPages - 2)}>
            {numOfPages - 2}
          </button>
          <button
            className="join-item btn "
            onClick={() => handelPageChange(numOfPages - 1)}
          >
            {numOfPages - 1}
          </button>

          <button
            className="join-item btn "
            onClick={() => handelPageChange(numOfPages)}
          >
            {numOfPages}
          </button>
        </>
      );
    }

    return (
      <>
        <button className="join-item btn " onClick={() => handelPageChange(1)}>
          {1}
        </button>
        <button className="join-item btn ">...</button>
        <button
          className="join-item btn "
          onClick={() => handelPageChange(page - 1)}
        >
          {page - 1}
        </button>
        <button
          className="join-item btn "
          onClick={() => handelPageChange(page)}
        >
          {page}
        </button>
        <button
          className="join-item btn "
          onClick={() => handelPageChange(page + 1)}
        >
          {page + 1}
        </button>
        <button className="join-item btn ">...</button>
        <button
          className="join-item btn "
          onClick={() => handelPageChange(numOfPages)}
        >
          {numOfPages}
        </button>
      </>
    );
  };

  return (
    <div className=" mt-6 ml-auto">
      <button
        className="join-item btn "
        onClick={() => {
          if (page === 1) {
            handelPageChange(numOfPages);
            return;
          }
          handelPageChange(page - 1);
        }}
      >
        Prev
      </button>
      {advancePagination()}
      <button
        className="join-item btn "
        onClick={() => {
          if (page === numOfPages) {
            handelPageChange(1);
            return;
          }
          handelPageChange(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
