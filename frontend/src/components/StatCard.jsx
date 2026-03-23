import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`glass-card p-6 flex items-center justify-between border ${color} glass-card-hover transition-all duration-300`}>
      <div>
        <p className="text-sm text-gray-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
