import React, { useState, useEffect } from "react"; // Added useState and useEffect
import { Chart } from "react-google-charts";
import { motion } from "framer-motion"; // Import motion from framer-motion

export default function Card({ data }) {
  const chartData = [
    ["Day", "Value"],
    ...data?.yAxisData?.map((value, index) => {
      return [index + 1, value];
    }),
  ];

  const options = {
    title: "Last 20 data",
    legend: { position: "bottom" },
    series: [{ color: data.lineChartColor }],
    curveType: "function",
  };

  return (
    <motion.div
      className="relative  flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden"
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.04 }}
    >
      <div className="p-5  relative flex flex-col h-fit bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="flex justify-between gap-3 text-center">
          <span className={`${data.color} text-3xl`}>{data.icon}</span>
          <p className="font-semibold text-2xl ">{data.title}</p>
          <h4 className="text-3xl font-semibold font-mono">
            {data.yAxisData[data.yAxisData.length - 1]}
          </h4>
        </div>
      </div>
      {/* Render Chart Here */}
      <Chart
        chartType="LineChart"
        width="100%"
        height="100%"
        data={chartData}
        options={options}
      />
    </motion.div>
  );
}
