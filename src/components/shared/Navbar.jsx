import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaChartLine,
  FaCog,
  FaClipboardList,
  FaFlask,
  FaFish,
  FaLeaf,
  FaBars,
  FaTimes,
  FaBell,
} from "react-icons/fa";
import { Popover, Transition } from '@headlessui/react';

export default function Navbar() {
    
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navItems = [
    { path: "/", name: "Dashboard", icon: <FaHome /> },
    { path: "/fish-management", name: "Fish Management", icon: <FaFish /> },
    { path: "/plant-management", name: "Plant Management", icon: <FaLeaf /> },
    { path: "/water-quality", name: "Water Quality", icon: <FaFlask /> },
    { path: "/maintenance", name: "Maintenance", icon: <FaClipboardList /> },
    { path: "/settings", name: "Settings", icon: <FaCog /> },
  ];

  const notifications = [
    { id: 1, message: "New fish stock arrival", read: false },
    { id: 2, message: "Water quality alert", read: true },
    { id: 3, message: "Filter maintenance due", read: false },
  ];

  return (
    <>
      <nav className="bg-white shadow-md text-black font-mono fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "bg-green-300 text-gray-700"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              {/* Notification Icon */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle hover:bg-gray-100">
                  <div className="indicator">
                    <FaBell className="h-5 w-5 text-gray-600" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="badge badge-sm indicator-item bg-red-500 text-white border-none px-2">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow-lg menu dropdown-content bg-white rounded-xl w-80 border border-gray-100">
                  <li className="menu-title px-4 py-2 border-b border-gray-100">
                    <span className="text-lg font-semibold text-gray-800">Notifications</span>
                  </li>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <li key={notification.id} className="border-b border-gray-50 last:border-none">
                        <a className={`px-4 py-3 hover:bg-gray-50 transition-colors duration-200 ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}>
                          <div className="flex justify-between items-center w-full">
                            <span className={`${!notification.read ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                              {notification.message}
                            </span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                console.log(`Mark as ${notification.read ? 'unread' : 'read'}: ${notification.id}`);
                              }}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium ml-2"
                            >
                              {notification.read ? 'Mark unread' : 'Mark read'}
                            </button>
                          </div>
                        </a>
                      </li>
                    ))
                  ) : (
                    <li className="text-center py-4 text-gray-500">No notifications</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center justify-between w-full">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-black hover:text-gray-600 focus:outline-none ml-4"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
              <div className="flex items-center w-1/2">
                <Link to="/" className="flex items-center">
                  <img
                    src="https://e7.pngegg.com/pngimages/462/79/png-clipart-aquaponics-hydroponics-water-raft-logo-leaf-logo.png"
                    alt="Logo"
                    className="h-8 w-8 mr-2"
                  />
                  <span className="text-xl font-bold text-green-600">
                    AquaFlow
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="h-16 flex items-center justify-between px-4 border-b">
                <span className="text-xl font-bold text-green-600">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-black hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Sidebar Links */}
              <div className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "bg-green-300 text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Popup */}
      <AnimatePresence>
        {isNotificationOpen && (
          <Popover as="div" className="relative">
            <Popover.Panel as={Transition}>
              <div className="absolute top-16 right-4 w-80 bg-white shadow-xl rounded-xl overflow-hidden z-50 border border-gray-100">
                <div className="p-4 border-b bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <button
                      onClick={() => setIsNotificationOpen(false)}
                      className="text-white hover:text-gray-200 transition-colors duration-200"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors duration-200 ${
                          notification.read ? 'bg-white' : 'bg-blue-50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`flex-1 ${!notification.read ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                            {notification.message}
                          </span>
                          <button
                            onClick={() => console.log(`Mark as read: ${notification.id}`)}
                            className={`ml-2 text-sm font-medium ${
                              notification.read
                                ? 'text-gray-500 hover:text-gray-700'
                                : 'text-blue-600 hover:text-blue-800'
                            } transition-colors duration-200`}
                          >
                            {notification.read ? 'Mark unread' : 'Mark read'}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Popover>
        )}
      </AnimatePresence>

      {/* Content Spacer */}
      <div className="h-16"></div>
    </>
  );
}
