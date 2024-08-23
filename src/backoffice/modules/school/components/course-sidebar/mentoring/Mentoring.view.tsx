import React, { useState } from 'react';
import { DataTable } from '@/backoffice/components/data-table';
import Search from '@/../public/icons/iconamoon_search-bold.svg';
import Image from 'next/image';
import { AttendanceData, attendanceData, columns } from './mentoring.data';

const Mentoring: React.FC = () => {
  const [filter, setFilter] = useState('');

  const data = attendanceData;

  const renderContent = () => {
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Attendance</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-md bg-white text-black"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 border-none"/>
          </div>
        </div>
        {data.length === 0 ? (
          <div className="flex flex-col items-center mt-8">
            <Image src="/img/course-sidebar/No results.svg" alt="No results" width={80} height={80} />
            <p className="mt-4 text-gray-500">No attendance has been entered yet</p>
          </div>
        ) : (
          <DataTable 
            columns={columns} 
            data={data} 
            filter={{ Filter: filter, setFilter: setFilter }}
          />
        )}
      </>
    );
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default Mentoring;
