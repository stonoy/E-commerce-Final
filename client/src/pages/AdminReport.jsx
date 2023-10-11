import React from "react";
import { customFetch } from "../utils/all";
import { useLoaderData } from "react-router-dom";
import { Pagination, ReportList } from "../components";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params);
  try {
    const { data } = await customFetch.get("/review/getallreportedreview", {
      params,
    });
    return data;
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return null;
  }
};

const AdminReport = () => {
  const data = useLoaderData();
  // console.log(data);

  return (
    <div className="flex flex-col">
      <ReportList />;
      <Pagination numOfPages={data?.numOfPages || 1} page={data?.page || 1} />
    </div>
  );
};

export default AdminReport;
