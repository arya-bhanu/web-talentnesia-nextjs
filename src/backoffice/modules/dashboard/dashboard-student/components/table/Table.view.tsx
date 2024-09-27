import React, { useMemo, useState, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { APIResponseManageModul } from './table.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';

interface ITableViewProps {
  data: APIResponseManageModul[];
  selectedType: string;
  onTypeChange: (type: string) => void;
  Filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const columnHelper = createColumnHelper<any>();

const TableView: React.FC<ITableViewProps> = ({
  data,
  selectedType,
  onTypeChange,
  Filter,
  setFilter,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleOptionClick = useCallback(
    (type: string) => {
      setIsDropdownOpen(false);
      onTypeChange(type);
    },
    [onTypeChange],
  );

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: ({ column }) => <SortingTable column={column} title="No" />,
        cell: (info) => info.row.index + 1,
        size: 50,
        meta: { className: 'w-16' },
      }),
      columnHelper.accessor('class', {
        header: ({ column }) => <SortingTable column={column} title="Class" />,
        cell: (info) => info.getValue(),
        size: 200,
        meta: { className: 'w-1/3' },
      }),
      columnHelper.accessor('type', {
        header: ({ column }) => <SortingTable column={column} title="Type" />,
        cell: (info) => info.getValue(),
        size: 200,
        meta: { className: 'w-1/4' },
      }),
      columnHelper.accessor('progress', {
        header: ({ column }) => (
          <SortingTable column={column} title="Progress" />
        ),
        cell: (info) => (
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 flex-grow">
                <div
                  className="bg-[#219EBC] h-2.5 rounded-full"
                  style={{ width: `${info.getValue() || 0}%` }}
                ></div>
              </div>
              <span className="ml-2 text-xs md:text-sm text-gray-900">
                {(info.getValue() as React.ReactNode) || 0}%{' '}
              </span>
              <span className="ml-1 text-xs md:text-sm text-gray-900">
                {' '}
                Selesai
              </span>
            </div>
          </div>
        ),
        size: 250,
        meta: { className: 'w-1/3' },
      }),
    ],
    [],
  );

  return (
    <div className="bg-white rounded-lg p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
          Class Progress
        </h1>
        <div className="flex items-center gap-2 text-[#667085] relative">
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            className="text-black border bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            {selectedType || 'All Types'}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div
              id="dropdown"
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-2 top-full"
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <button
                    onClick={() => handleOptionClick('')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    All Types
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOptionClick('IICP')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    IICP
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOptionClick('BootCamp')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    BootCamp
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOptionClick('Course')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Course
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <DataTable
        data={data}
        columns={columns}
        sorting={[]}
        filter={{ Filter, setFilter }}
      />
    </div>
  );
};

export default TableView;
