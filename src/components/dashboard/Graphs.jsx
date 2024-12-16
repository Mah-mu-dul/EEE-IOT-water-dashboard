import React, { useEffect, useState } from "react";
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

export default function Graphs() {
  const [data, setData] = useState([
    {
      title: "pH",
      yAxisData: [0],
      bgcolor: "bg-green-300", // Updated to a softer green
      lineChartColor: "#A5D6A7", // Softer green color
      color: "text-green-700", // Adjusted to a darker green for better contrast
      icon: <FaWater />,
    },
    {
      title: "Turbidity (NTU)",
      yAxisData: [0],
      bgcolor: "bg-blue-300", // Updated to a softer blue
      lineChartColor: "#90CAF9", // Softer blue color
      color: "text-blue-700", // Adjusted to a darker blue for better contrast
      icon: <FaCloudRain />, // Changed to a cloud rain icon from react-icons
    },
    {
      title: "TDS (PPM)",
      yAxisData: [0],
      bgcolor: "bg-pink-500", // Updated to a softer pink
      lineChartColor: "#F48FB1", // Softer pink color
      color: "text-pink-700", // Adjusted to a darker pink for better contrast
      icon: <FaTint />, // Changed to a water droplet icon from react-icons
    },
    {
      title: "Dissolved Oxygen (mg/L)",
      yAxisData: [0],
      bgcolor: "bg-purple-300", // Updated to a softer purple
      lineChartColor: "#E1BEE7", // Softer purple color
      color: "text-purple-700", // Adjusted to a darker purple for better contrast
      icon: <SiOxygen />, // Changed to a wave square icon from react-icons
    },
    {
      title: "Water Temperature (°C)",
      yAxisData: [0],
      bgcolor: "bg-orange-300", // Updated to a softer orange
      lineChartColor: "#FFCC80", // Softer orange color
      color: "text-orange-700", // Adjusted to a darker orange for better contrast
      icon: <FaTemperatureHigh />, // Changed to a temperature high icon from react-icons
    },
    {
      title: "Humidity (%)",
      yAxisData: [0],
      bgcolor: "bg-teal-300", // Updated to a softer teal
      lineChartColor: "#80CBC4", // Softer teal color
      color: "text-teal-700", // Adjusted to a darker teal for better contrast
      icon: <WiHumidity />, // Changed to a humidity icon from react-icons
    },
    {
      title: "Air Temperature (°C)",
      yAxisData: [0],
      bgcolor: "bg-yellow-300", // Updated to a softer yellow
      lineChartColor: "#F00176", // Softer yellow color
      color: "text-yellow-700", // Adjusted to a darker yellow for better contrast
      icon: <FaTemperatureHigh />, // Changed to a temperature high icon from react-icons
    },
    // {
    //   title: "Air Heat Index (°C)",
    //   yAxisData: [0],
    //   bgcolor: "bg-indigo-300", // Updated to a softer indigo
    //   lineChartColor: "#BBDEFB", // Softer indigo color
    //   color: "text-indigo-700", // Adjusted to a darker indigo for better contrast
    //   icon: <FaFire />, // Changed to a fire icon from react-icons
    // },
    // {
    //   title: "Water Level",
    //   yAxisData: [0],
    //   bgcolor: "bg-gray-300", // Updated to a softer gray
    //   lineChartColor: "#B0BEC5", // Softer gray color
    //   color: "text-gray-700", // Adjusted to a darker gray for better contrast
    //   icon: <FaWaveSquare />, // Changed to a wave square icon from react-icons
    // },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://192.168.0.143:5000/get_sensor_data");
      const sensorData = await response.json();
      const updatedData = data.map((graphData) => {
        const newYAxisData = [...graphData.yAxisData];
        sensorData.forEach((item) => {
          switch (graphData.title) {
            case "TDS (PPM)":
              newYAxisData.push(item.TDS);
              break;
            case "Turbidity (NTU)":
              newYAxisData.push(item.Turbidity);
              break;
            case "pH":
              newYAxisData.push(item.pH);
              break;
            case "Water Temperature (°C)":
              newYAxisData.push(item.temp_tank);
              break;
            case "Humidity (%)":
              newYAxisData.push(item.Humidity);
              break;
            case "Air Temperature (°C)":
              newYAxisData.push(item.temp_pipe);
              break;
            case "Dissolved Oxygen (mg/L)":
              newYAxisData.push(item.DO);
              break;
            default:
              break;
          }
        });
        return { ...graphData, yAxisData: newYAxisData };
      });
      setData(updatedData);
      setActiveCard(updatedData[0]);
    };
    fetchData();
    // const interval = setInterval(fetchData, 60000); // Fetch data every 1 minute
    // return () => clearInterval(interval); // Cleanup function to stop the interval
  }, []);
  const [activeCard, setActiveCard] = useState(data[0]);
  const showComponent = (i) => {
    setActiveCard(data[i]);
    window.scrollTo(0, 0);
  };
  const downloadCSV = () => {
    const csvContent =
      Object.keys(activeCard).join(",") + "\n" +
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
    const csvContent = [
      Object.keys(data[0]).join(","),
      ...data.map((card) => Object.values(card).join(",")),
    ].join("\n");
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
