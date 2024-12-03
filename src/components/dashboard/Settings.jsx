import React, { useState } from 'react';
import { FaSave, FaBell, FaChartLine, FaServer } from 'react-icons/fa';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    dataInterval: 5,
    alertThresholds: {
      pH: { min: 6.5, max: 7.5 },
      temperature: { min: 18, max: 23 },
      oxygen: { min: 7.0, max: 8.5 },
    },
    darkMode: false,
  });

  const handleSave = () => {
    // Implement save functionality
    console.log('Settings saved:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <FaSave /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-4">
            <FaBell className="text-blue-600" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Enable Notifications</span>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) =>
                  setSettings({ ...settings, notifications: e.target.checked })
                }
                className="toggle toggle-primary"
              />
            </div>
          </div>
        </div>

        {/* Data Collection Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-4">
            <FaChartLine className="text-blue-600" />
            <h2 className="text-xl font-semibold">Data Collection</h2>
          </div>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Data Collection Interval (minutes)</span>
              </label>
              <input
                type="number"
                value={settings.dataInterval}
                onChange={(e) =>
                  setSettings({ ...settings, dataInterval: parseInt(e.target.value) })
                }
                className="input input-bordered"
              />
            </div>
          </div>
        </div>

        {/* Threshold Settings */}
        <div className="bg-white p-6 rounded-lg shadow col-span-full">
          <div className="flex items-center gap-2 mb-4">
            <FaServer className="text-blue-600" />
            <h2 className="text-xl font-semibold">Alert Thresholds</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(settings.alertThresholds).map(([key, value]) => (
              <div key={key} className="form-control">
                <label className="label">
                  <span className="label-text">{key}</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={value.min}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        alertThresholds: {
                          ...settings.alertThresholds,
                          [key]: { ...value, min: parseInt(e.target.value) },
                        },
                      })
                    }
                    className="input input-bordered"
                  />
                  <input
                    type="number"
                    value={value.max}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        alertThresholds: {
                          ...settings.alertThresholds,
                          [key]: { ...value, max: parseInt(e.target.value) },
                        },
                      })
                    }
                    className="input input-bordered"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 