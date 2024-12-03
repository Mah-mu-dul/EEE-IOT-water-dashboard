import React, { useState } from 'react';
import Card from '../dashboard/Card';
import { FaTemperatureHigh, FaWater, FaTint, FaFish } from 'react-icons/fa';
import { SiOxygen } from 'react-icons/si';

function FishManagement() {
  const [waterMotor, setWaterMotor] = useState(false);
  const [filterMotor, setFilterMotor] = useState(false);
  const [light, setLight] = useState(false);

  const fishData = [
    {
      title: "Water Temperature",
      currentValue: "25.3°C",
      icon: <FaTemperatureHigh className="text-red-500" />,
      textColor: "text-red-600"
    },
    {
      title: "pH Level",
      currentValue: "7.3",
      icon: <FaTint className="text-blue-500" />,
      textColor: "text-blue-600"
    },
    {
      title: "Dissolved Oxygen",
      currentValue: "7.1 mg/L",
      icon: <SiOxygen className="text-green-500" />,
      textColor: "text-green-600"
    }
  ];

  return (
    <div className="space-y-6 text-gray-700 p-6">
      <h1 className="text-3xl font-bold mb-8">Fish Management System</h1>
      
      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">System Controls</h2>
          <div className="space-y-4">
            {/* Switch-style buttons */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
              <span className="font-semibold">Water Motor</span>
              <button 
                onClick={() => setWaterMotor(!waterMotor)}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                style={{ backgroundColor: waterMotor ? '#2563eb' : '#cbd5e1' }}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    waterMotor ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
              <span className="font-semibold">Filter Motor</span>
              <button 
                onClick={() => setFilterMotor(!filterMotor)}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                style={{ backgroundColor: filterMotor ? '#16a34a' : '#cbd5e1' }}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    filterMotor ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
              <span className="font-semibold">Lights</span>
              <button 
                onClick={() => setLight(!light)}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                style={{ backgroundColor: light ? '#eab308' : '#cbd5e1' }}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    light ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Current Stats */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Current Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            {fishData.map((data, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  {data.icon}
                  <span className="font-semibold">{data.title}</span>
                </div>
                <div className={`text-2xl font-bold ${data.textColor}`}>
                  {data.currentValue}
                </div>
              </div>
            ))}
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <FaFish className="text-blue-500" />
                <span className="font-semibold">Fish Count</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">20</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FishManagement; 