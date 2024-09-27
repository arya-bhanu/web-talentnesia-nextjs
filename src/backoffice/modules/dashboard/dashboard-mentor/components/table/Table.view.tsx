import React, { useMemo } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { DashboardProgressItem } from '../../dashboardMentor.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';

interface ITableViewProps {
  data: DashboardProgressItem[];
  selectedType: string;
  onTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: ({ column }) => <SortingTable column={column} title="No" />,
        cell: (info) => info.row.index + 1,
        size: 50,
        meta: { className: 'w-16' },
      }),
      columnHelper.accessor('name', {
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
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
          Class Progress
        </h1>
        <div className="flex items-center gap-2">
          <select
            value={selectedType}
            onChange={onTypeChange}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="">All Types</option>
            <option value="iicp">IICP</option>
            <option value="bootcamp">Bootcamp</option>
            <option value="course">Course</option>
          </select>
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
