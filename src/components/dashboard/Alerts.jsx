import React from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaBell } from 'react-icons/fa';

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'pH levels above normal threshold',
      timestamp: '2024-03-20 14:30:00',
      value: '7.8',
      threshold: '7.5',
    },
    {
      id: 2,
      type: 'critical',
      message: 'Dissolved Oxygen below critical level',
      timestamp: '2024-03-20 14:25:00',
      value: '6.5',
      threshold: '7.0',
    },
    // Add more alerts as needed
  ];

  const getAlertStyle = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'critical':
        return 'bg-red-100 border-red-500 text-red-700';
      default:
        return 'bg-green-100 border-green-500 text-green-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">System Alerts</h1>
        <div className="flex items-center gap-4">
          <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full">
            2 Critical
          </span>
          <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full">
            3 Warnings
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 border-l-4 rounded-r-lg ${getAlertStyle(
              alert.type
            )}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle />
                <div>
                  <h3 className="font-semibold">{alert.message}</h3>
                  <p className="text-sm">
                    Current: {alert.value} | Threshold: {alert.threshold}
                  </p>
                </div>
              </div>
              <span className="text-sm">{alert.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts; 