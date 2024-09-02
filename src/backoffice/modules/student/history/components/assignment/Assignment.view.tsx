import React, { useState } from 'react';  
import IconLeft from '@/../public/icons/btn-left.svg';
import IconRight from '@/../public/icons/btn-right.svg';
import SortArrow from '@/../public/icons/sort-arrow.svg'; 
import { AssignmentData } from './assignment.type';
import Search from '@/../public/icons/search-normal.svg';
import FilterMenu from '../filter/FilterMenu';
import UserIcon from '@/../public/icons/user.svg';


interface AssignmentViewProps {
  data: AssignmentData[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSort: (column: keyof AssignmentData) => void;
  sortColumn: keyof AssignmentData;
  sortDirection: 'asc' | 'desc';
}

const AssignmentView: React.FC<AssignmentViewProps> = ({
  data,
  totalItems,
  totalPages,
  currentPage,
  itemsPerPage,
  onNextPage,
  onPrevPage,
  onItemsPerPageChange,
  onSort,
  sortColumn,
  sortDirection,
}) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Attended':
        return 'bg-green-100 text-green-800';
      case 'Missed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderSortArrow = (column: keyof AssignmentData) => {
    if (sortColumn === column) {
      return (
        <SortArrow
          className={`ml-2 ${sortDirection === 'asc' ? '' : ''}`}  
          alt="Sort Arrow"
        />
      );
    }
    return (
      <SortArrow
        className="ml-2"
        alt="Sort Arrow"
      />
    );
  };

  const [statusFilter, setStatusFilter] = useState<string>('');  
  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  const applyFilterLogic = (data: AssignmentData[]) => {
    return data.filter((item) => {
      return statusFilter ? item.status === statusFilter : true;
    });
  };

  const filteredData = applyFilterLogic(data);  

  return (
    <div>
      <div className="flex justify-between items-center">
        <form className="flex items-center max-w-xs w-full">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search />
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="Search ..."
              required
            />
          </div>
        </form>
        <FilterMenu onFilterChange={handleFilterChange} />
      </div>

      <div className="overflow-x-auto max-h-[60vh] overflow-y-auto sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm font-semibold text-gray-700 mx-4">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 w-16 cursor-pointer"
                onClick={() => onSort('no')}
              >
                <div className="flex items-center">
                  <span>No</span>
                  {renderSortArrow('no')}
                </div>
              </th>
              <th
                scope="col"
                className="px-4 py-3 w-48 cursor-pointer"
                onClick={() => onSort('session')}
              >
                <div className="flex items-center">
                  <span>Assignment</span>
                  {renderSortArrow('session')}
                </div>
              </th>
              <th
                scope="col"
                className="px-4 py-3 w-48 cursor-pointer"
                onClick={() => onSort('course')}
              >
                <div className="flex items-center">
                  <span>Course</span>
                  {renderSortArrow('course')}
                </div>
              </th>
              <th
                scope="col"
                className="px-4 py-3 w-48 cursor-pointer"
                onClick={() => onSort('mentor')}
              >
                <div className="flex items-center">
                  <span>Mentor</span>
                  {renderSortArrow('mentor')}
                </div>
              </th>
              <th
                scope="col"
                className="px-4 py-3 w-48 cursor-pointer"
                onClick={() => onSort('date')}
              >
                <div className="flex items-center">
                  <span className="whitespace-nowrap">Due Date</span>
                  {renderSortArrow('date')}
                </div>
              </th>
              <th
                scope="col"
                className="px-4 py-3 w-48 cursor-pointer"
                onClick={() => onSort('submisionDate')}
              >
                <div className="flex items-center">
                  <span className="whitespace-nowrap">Submission Date</span>
                  {renderSortArrow('submisionDate')}
                </div>
              </th>
              <th
                scope="col"
                className="px-4 py-3 w-24 cursor-pointer"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center">
                  <span>Status</span>
                  {renderSortArrow('status')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => ( 
              <tr key={item.no} className="bg-white border-b">
                <td className="px-4 py-4 w-16">{item.no}</td>
                <td className="px-4 py-4 w-48">
                  <div className="font-semibold text-gray-800">{item.session}</div>
                  <div className="text-sm text-gray-600 whitespace-nowrap">{item.subsession}</div>
                </td>
                <td className="px-4 py-4 w-48 whitespace-nowrap">{item.course}</td>
                <td className="px-4 py-4 w-48 flex items-center">  
                  <UserIcon className="mr-2" />  
                  {item.mentor}
                </td>
                <td className="px-4 py-4 w-48">
                  <div className="font-semibold text-gray-800 whitespace-nowrap">{item.date.split(' ')[0]}</div>
                  <div className="text-sm text-gray-600">{item.date.split(' ')[1]}</div>
                </td>
                <td className="px-4 py-4 w-48">
                  <div className="font-semibold text-gray-800">{item.submisionDate.split(' ')[0]}</div>
                  <div className="text-sm text-gray-600">{item.submisionDate.split(' ')[1]}</div>
                </td>
                <td className="px-4 py-4 w-24">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-semibold ${getStatusStyle(
                      item.status,
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center w-full mt-5">
        <div className="flex items-center gap-2 text-[#667085]">
          <label htmlFor="pagination" className="block">Showing</label>
          <select
            id="pagination"
            className="bg-gray-50 border max-w-[5rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <p className="whitespace-nowrap">of {totalItems} Result</p>
        </div>
        <div className="flex gap-2 text-[#667085]">
          <button onClick={onPrevPage} disabled={currentPage === 1}>
            <IconLeft />
          </button>
          <button onClick={onNextPage} disabled={currentPage === totalPages}>
            <IconRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentView;
