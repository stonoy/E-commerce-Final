import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const BarChartContainer = ({ data }) => {

    console.log(data)

    const chartOfCount = data.map(item => {
        const {date, count} = item
        return {date, count}
    })

    const chartOfPrice = data.map(item => {
        const {date, income} = item
        return {date, income}
    })

  return (
    <div className="flex flex-col gap-4">
        <div>
        <h2 className="text-2xl ">Monthly Sold Product Count</h2>
      <div className="my-6 w-full border-b-2 border-primary-content"></div>
        </div>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={300}
        height={200}
        data={chartOfCount}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="count" fill="#8884d8" barSize={50} />
      </BarChart>
    </ResponsiveContainer>
    <div>
        <h2 className="text-2xl ">Monthly Sold Product Price</h2>
      <div className="my-6 w-full border-b-2 border-primary-content"></div>
        </div>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={300}
        height={200}
        data={chartOfPrice}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="income" fill="#8884d8" barSize={50} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};