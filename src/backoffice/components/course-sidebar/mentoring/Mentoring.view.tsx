import React, { useState } from 'react';
import { DataTable } from '@/backoffice/components/data-table';
import Search from '@/../public/icons/iconamoon_search-bold.svg';
import Image from 'next/image';
import { AttendanceData, attendanceData, columns } from './mentoring.data';

const Mentoring = () => {
  const [filter, setFilter] = useState('');

  const data = attendanceData;

  const renderContent = () => {
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Presence</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-md bg-white text-black"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />
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
      <div className="bg-[#323232] rounded-lg px-8 py-[100px] text-white mb-8 flex flex-col items-center">
        <h1 className="text-xl font-bold mb-2 text-center">Join Mentoring</h1>
        <h3 className="text-sm mb-10 text-center">Mentoring available on March 23, 2024 at 15.00</h3>
        <div className="flex space-x-4 justify-center">
          <button className="px-4 py-2 rounded-md border border-[#B9BDC7] text-[#B9BDC7]">
            Input Presence
          </button>
          <button className="px-4 py-2 rounded-md bg-[#B9BDC7] text-white">
            Join Now
          </button>
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default Mentoring;
