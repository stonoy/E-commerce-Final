import React, { useState } from "react";
import { Form, Link, useLoaderData, useOutletContext } from "react-router-dom";
import { customFetch, ratingStar } from "../utils/all";
import FormInput from "./FormInput";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdReportProblem } from "react-icons/md";

const CommentSection = () => {
  const { reviews, reviewsCount } = useLoaderData();
  const [selectedReview, setSelectedReview] = useState(5);
  const {user} = useOutletContext()

  // console.log(user)

  const handelChange = (e) => {
    setSelectedReview(e.target.value);
  };

  const handelReport = async (reviewId) => {
    try {
      await customFetch.patch(`/review/reportreview`, { reviewId });
      console.log("ok");
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  };

  // console.log(reviews);

  return (
    <div className="flex py-8 flex-col gap-8 justify-center items-start md:flex-row ">
      <div className="">
        <Form method="post">
          <div className="rating rating-sm flex justify-between items-center">
            <h1>Give A Rating:</h1>
            <div>{ratingStar(5, selectedReview, handelChange)}</div>
          </div>
          <FormInput
            type="text"
            name="title"
            labelText="Title"
            placeholder="Write a title..."
          />
          <textarea
            placeholder="Write a review..."
            name="comment"
            className="textarea resize-none textarea-bordered textarea-sm my-4 w-full max-w-xs md:textarea-md lg:textarea-lg"
          ></textarea>
          {
            user ? 
            <button className="btn btn-sm md:btn-md" type="submit">
            Submit
          </button>
          :
          <Link to='/login' className="btn btn-sm md:btn-md">Login</Link>
          }
        </Form>
      </div>
      <div className="md:pt-10">
        {reviewsCount > 0 ? (
          reviews.map((review) => {
            const {
              rating,
              title,
              comment,
              _id,
              user: { name, _id: userId },
            } = review;

            return (
              <div className="flex gap-2 items-center" key={_id}>
                <div className="p-3 rounded-md bg-base-300 text-base-content mt-2">
                  <h1 className="font-bold capitalize">{name}</h1>
                  <div className="rating rating-xs">
                    {ratingStar(5, rating)}
                  </div>
                  <h2 className={`${!title && "hidden"} `}>{title}</h2>
                  <div className="my-1 w-full border-b-2 border-primary-content"></div>
                  <p className={`${!comment && "hidden"} `}>{comment}</p>
                </div>
                <div className="flex flex-col justify-between items-center gap-4">
                  <Form
                    method="post"
                    action={`/deleteReview/${_id}`}
                    className="tooltip"
                    data-tip="Delete"
                  >
                    <button className="btn   btn-sm  p-0 " type="submit">
                      <RiDeleteBin6Line className="text-base-content" />
                    </button>
                  </Form>
                  <div className="tooltip" data-tip="Report this">
                    <button
                      className="btn   btn-sm  p-0 "
                      onClick={() => handelReport(_id)}
                    >
                      <MdReportProblem />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-3 rounded-md bg-base-300 text-base-content">
            No Reviews yet!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
