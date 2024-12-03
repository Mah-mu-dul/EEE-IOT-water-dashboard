import React from 'react';
import Graphs from './Graphs';

const Overview = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Overview Dashboard</h1>
      </div>
      <Graphs />
    </div>
  );
};

export default Overview; 