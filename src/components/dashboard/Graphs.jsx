import React, { useState } from "react";
import Card from "../dashboard/Card"; // Adjust the path as necessary
import {
  FaTemperatureHigh,
  FaWater,
  FaCloudRain,
  FaFire,
  FaTint,
  FaWaveSquare,
  FaDownload,
} from "react-icons/fa"; // Import icons from react-icons
import { WiHumidity } from "react-icons/wi";
import { SiOxygen } from "react-icons/si";

const data = [
  {
    title: "pH",
    yAxisData: [
      6.5, 7.0, 7.2, 6.8, 7.1, 6.9, 7.0, 6.7, 7.3, 6.8, 7.0, 6.9, 7.1, 6.8, 7.0,
      6.9, 7.2, 6.7, 7.1, 6.8,
    ],
    bgcolor: "bg-green-300", // Updated to a softer green
    lineChartColor: "#A5D6A7", // Softer green color
    color: "text-green-700", // Adjusted to a darker green for better contrast
    icon: <FaWater />,
  },
  {
    title: "Turbidity (NTU)",
    yAxisData: [
      1.2, 1.5, 1.0, 1.8, 1.3, 1.4, 1.1, 1.6, 1.2, 1.5, 1.3, 1.4, 1.1, 1.2, 1.3,
      1.5, 1.4, 1.1, 1.2, 1.3,
    ],
    bgcolor: "bg-blue-300", // Updated to a softer blue
    lineChartColor: "#90CAF9", // Softer blue color
    color: "text-blue-700", // Adjusted to a darker blue for better contrast
    icon: <FaCloudRain />, // Changed to a cloud rain icon from react-icons
  },
  {
    title: "TDS (PPM)",
    yAxisData: [
      150, 160, 140, 155, 145, 150, 160, 155, 150, 145, 140, 150, 155, 160, 145,
      150, 140, 155, 150, 160,
    ],
    bgcolor: "bg-pink-500", // Updated to a softer pink
    lineChartColor: "#F48FB1", // Softer pink color
    color: "text-pink-700", // Adjusted to a darker pink for better contrast
    icon: <FaTint />, // Changed to a water droplet icon from react-icons
  },
  {
    title: "Dissolved Oxygen (mg/L)",
    yAxisData: [
      8.0, 7.5, 8.2, 7.8, 8.1, 7.9, 8.0, 7.6, 8.3, 7.7, 8.1, 7.8, 8.0, 7.5, 8.2,
      7.9, 8.1, 7.6, 8.0, 7.8,
    ],
    bgcolor: "bg-purple-300", // Updated to a softer purple
    lineChartColor: "#E1BEE7", // Softer purple color
    color: "text-purple-700", // Adjusted to a darker purple for better contrast
    icon: <SiOxygen />, // Changed to a wave square icon from react-icons
  },
  {
    title: "Water Temperature (°C)",
    yAxisData: [
      20, 21, 19, 22, 20, 21, 20, 19, 22, 21, 20, 19, 22, 21, 20, 19, 22, 21,
      20, 19,
    ],
    bgcolor: "bg-orange-300", // Updated to a softer orange
    lineChartColor: "#FFCC80", // Softer orange color
    color: "text-orange-700", // Adjusted to a darker orange for better contrast
    icon: <FaTemperatureHigh />, // Changed to a temperature high icon from react-icons
  },
  {
    title: "Humidity (%)",
    yAxisData: [
      60, 65, 62, 58, 61, 64, 63, 60, 65, 62, 61, 64, 63, 60, 65, 62, 61, 64,
      63, 60,
    ],
    bgcolor: "bg-teal-300", // Updated to a softer teal
    lineChartColor: "#80CBC4", // Softer teal color
    color: "text-teal-700", // Adjusted to a darker teal for better contrast
    icon: <WiHumidity />, // Changed to a humidity icon from react-icons
  },
  {
    title: "Air Temperature (°C)",
    yAxisData: [
      25, 26, 24, 27, 25, 26, 25, 24, 27, 26, 25, 24, 27, 26, 25, 24, 27, 26,
      25, 24,
    ],
    bgcolor: "bg-yellow-300", // Updated to a softer yellow
    lineChartColor: "#F00176", // Softer yellow color
    color: "text-yellow-700", // Adjusted to a darker yellow for better contrast
    icon: <FaTemperatureHigh />, // Changed to a temperature high icon from react-icons
  },
  {
    title: "Air Heat Index (°C)",
    yAxisData: [
      30, 31, 29, 32, 30, 31, 30, 29, 32, 31, 30, 29, 32, 31, 30, 29, 32, 31,
      30, 29,
    ],
    bgcolor: "bg-indigo-300", // Updated to a softer indigo
    lineChartColor: "#BBDEFB", // Softer indigo color
    color: "text-indigo-700", // Adjusted to a darker indigo for better contrast
    icon: <FaFire />, // Changed to a fire icon from react-icons
  },
  {
    title: "Water Level",
    yAxisData: [
      100, 102, 98, 101, 100, 99, 100, 102, 101, 100, 99, 100, 101, 102, 100,
      99, 100, 101, 102, 100,
    ],
    bgcolor: "bg-gray-300", // Updated to a softer gray
    lineChartColor: "#B0BEC5", // Softer gray color
    color: "text-gray-700", // Adjusted to a darker gray for better contrast
    icon: <FaWaveSquare />, // Changed to a wave square icon from react-icons
  },
];
export default function Graphs() {
  const [activeCard, setActiveCard] = useState(data[0]);
  const showComponent = (i) => {
    setActiveCard(data[i]);
    window.scrollTo(0, 0);
  };
  const downloadCSV = () => {
    const csvContent =
      Object.keys(activeCard).join(",") +
      "\n" +
      Object.values(activeCard).join(",");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${activeCard.title}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJSON = () => {
    const jsonContent = JSON.stringify(activeCard);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${activeCard.title}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllCSV = () => {
    const csvContent = data
      .map((card) => {
        return Object.values(card).join(",");
      })
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `allData.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div className="  flex flex-wrap text-black text-center font-mono w-full overflow-hidden">
        <div className="w-full lg:w-1/2  p-5 ">
          <div className="flex justify-end gap-3">
            <div className="flex-grow">
              <h1 className="text-4xl font-bold mb-5">IOT Dashboard</h1>
              <h2 className="text-2xl font-semibold mb-10">
                Current Conditions
              </h2>
            </div>
            <div className="flex-shrink-0 ">
              <button
                onClick={downloadAllCSV}
                className="btn bg-white mb-3 w-full hover:bg-white text-black focus:bg-white  font-semibold text-lg"
              >
                <FaDownload /> ALL
              </button>
              <br />
              <button
                onClick={downloadCSV}
                className="btn bg-white my-3 w-full hover:bg-white text-black focus:bg-white  font-semibold text-lg"
              >
                <FaDownload /> CSV
              </button>
            </div>
          </div>
          <Card data={activeCard} />
        </div>
        <div className="flex  gap-2 w-full  lg:w-1/2 justify-between flex-wrap p-5">
          <h2 className="text-3xl  font-semibold mt-5 w-full">
            Select a Condition
          </h2>
          {data.map((d, i) => {
            return (
              <div
                onClick={() => showComponent(i)}
                className={` flex-grow cursor-pointer  justify-between items-center w-fit flex gap-5 border mb-2 p-2 rounded-lg ${d.bgcolor} text-black`}
              >
                {d.icon}
                <p className="font-semibold text-lg ">{d.title}</p>
                <h4 className="text-3xl font-semibold font-mono">
                  {d.yAxisData[d.yAxisData.length - 1]}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
      <h2 className="text-3xl text-center  mt-10 font-semibold text-black border-t-2 pt-5 rounded-lg">
        Historical Data
      </h2>
      <div className="grid pb-10  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5  px-5">
        {data.map((d, i) => {
          return (
            <div>
              <Card index={i} data={d} />
            </div>
          );
        })}
      </div>
    </>
  );
}
