import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Graphs from '../components/dashboard/Graphs';
import { 
  FaChartLine, 
  FaDesktop, 
  FaHistory, 
  FaCog, 
  FaBell,
  FaDownload
} from 'react-icons/fa';

// Ensure data is defined here or imported from a shared file
const data = [
  // Your data array here
];

const Sidebar = ({ activeTab, setActiveTab }) => (
  <div className="w-64 bg-gray-800 text-white h-screen fixed">
    <div className="p-4 border-b border-gray-700">
      <h2 className="text-2xl font-bold">IoT Dashboard</h2>
    </div>
    <ul className="mt-4">
      {[
        { name: 'Overview', icon: <FaChartLine />, id: 'overview' },
        { name: 'Historical Data', icon: <FaHistory />, id: 'historical' },
        { name: 'Alerts', icon: <FaBell />, id: 'alerts' },
        { name: 'Settings', icon: <FaCog />, id: 'settings' },
      ].map((item) => (
        <li
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`p-4 flex items-center gap-3 cursor-pointer transition-colors
            ${activeTab === item.id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
        >
          {item.icon}
          {item.name}
        </li>
      ))}
    </ul>
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Graphs />;
      case 'historical':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Historical Data</h2>
              <button className="btn bg-gray-800 text-white px-4 py-2 rounded flex items-center gap-2">
                <FaDownload /> Export Data
              </button>
            </div>
            <Graphs showHistoricalOnly={true} />
          </div>
        );
      // Add other cases as needed
      default:
        return <Graphs />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex bg-gray-100"
    >
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 ml-64 p-6">
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default Dashboard;
