import React from 'react';

interface CardProps {
  icon: React.ReactNode;
  bgColor: string;
  title: string;
  count: number;
}

const Card: React.FC<CardProps> = ({ icon, bgColor, title, count }) => {
  return (
    <div
      className={`flex-1 bg-white border rounded-lg p-4 font-lato space-y-2 ${bgColor}`}
    >
      <div className="flex space-x-2">
        <div className={`p-3 items-center rounded-full ${bgColor}`}>{icon}</div>
      </div>
      <p className="text-[#667085] text-md pt-2">{title}</p>
      <div className="flex space-x-2 ">
        <p className="text-[#2B2F38] text-2xl font-semibold">{count}</p>
        <p className="text-[#2B2F38] text-lg pt-1">Scheduled</p>
      </div>
    </div>
  );
};

export default Card;
