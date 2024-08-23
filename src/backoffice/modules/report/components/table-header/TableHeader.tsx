import React from 'react';

interface TableHeaderProps {
  title: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between mb-4 font-poppins">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
};

export default TableHeader;
