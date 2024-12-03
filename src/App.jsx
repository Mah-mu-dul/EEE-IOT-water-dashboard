import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// Import pages
const Dashboard = React.lazy(() => import('./components/dashboard/Graphs'));
const FishManagement = React.lazy(() => import('./components/fish/FishManagement')); 
const PlantManagement = React.lazy(() => import('./components/plant/PlantManagement'));
const WaterQuality = React.lazy(() => import('./components/water/WaterQuality'));
const Maintenance = React.lazy(() => import('./components/maintenance/Maintenance'));
const Settings = React.lazy(() => import('./components/settings/Settings'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-mono">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <React.Suspense fallback={
            <div className="flex justify-center items-center h-[80vh]">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
            </div>
          }>
            <AnimatePresence mode='wait'>
              <Routes>
                <Route path="/" element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Dashboard />
                  </motion.div>
                } />
                <Route path="/fish-management" element={<FishManagement />} />
                <Route path="/plant-management" element={<PlantManagement />} />
                <Route path="/water-quality" element={<WaterQuality />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </AnimatePresence>
          </React.Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
