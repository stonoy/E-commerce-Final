import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { customFetch } from "../utils/all";
import { BiSolidUserMinus, BiNoEntry } from "react-icons/bi";

const ReportList = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  console.log(data);

  if (!data) {
    return (
      <h1 className=" bg-error text-error-content p-6">
        Error, in fetching orders list
      </h1>
    );
  }

  if (data.reportedReviews.length < 0) {
    return (
      <h1 className=" bg-warning text-warning-content p-6">No items found</h1>
    );
  }

  const { reportedReviews } = data;

  const handelDelReview = async (reviewId) => {
    try {
      await customFetch.delete(`/review/${reviewId}`);
      console.log("review deleted");
      navigate(".");
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  };

  const handelDelUser = async (deleteUserId) => {
    try {
      await customFetch.delete(`/user/deleteuser/${deleteUserId}`);
      console.log("user deleted");
      navigate(".");
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  };

  return (
    <div className=" overflow-x-auto my-2">
      <div className="my-6 flex justify-between items-center">
        <h1 className="text-2xl text-info-content ">Report Details</h1>
      </div>
      <table className="min-w-full">
        <thead className="bg-neutral">
          <tr>
            <th className="px-6 py-3 bg-base-200 text-left text-xs leading-4 font-medium text-base-content uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 bg-base-200 text-left text-xs leading-4 font-medium text-base-content uppercase tracking-wider">
              Updated
            </th>
            <th className="px-6 py-3 bg-base-200 text-left text-xs leading-4 font-medium text-base-content uppercase tracking-wider">
              PostBy
            </th>
            <th className="px-6 py-3 bg-base-200 text-left text-xs leading-4 font-medium text-base-content uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 bg-base-200 text-left text-xs leading-4 font-medium text-base-content uppercase tracking-wider">
              Comment
            </th>
            <th className="px-6 py-3 bg-base-200 text-left text-xs leading-4 font-medium text-base-content uppercase tracking-wider">
              ReportBy
            </th>
            <th className="px-6 py-3 bg-base-200 text-left text-xs leading-4 font-medium text-base-content uppercase tracking-wider">
              Delete review
            </th>
            <th className="px-6 py-3 bg-base-200 text-left text-xs leading-4 font-medium text-base-content uppercase tracking-wider">
              Delete User
            </th>
          </tr>
        </thead>
        <tbody className="bg-base divide-y divide-gray-200">
          {reportedReviews.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-base-content">
                  {item.createdAt.slice(0, 10)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-base-content">
                  {item.updatedAt.slice(0, 10)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-base-content">
                  {item.user.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-base-content">
                  {item.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-base-content">
                  {item.comment}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-base-content">
                  {item.reportCount}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-base-content ">
                  <BiNoEntry
                    className="text-2xl text-error-content"
                    onClick={() => handelDelReview(item._id)}
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-base-content">
                  <BiSolidUserMinus
                    className="text-2xl text-error"
                    onClick={() => handelDelUser(item.user._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportList;
