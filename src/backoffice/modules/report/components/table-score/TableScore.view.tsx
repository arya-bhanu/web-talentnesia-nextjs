import React, { useMemo, useState, useEffect } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import { ITableScoreView } from './tableScore.type';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { SearchTable } from '@/backoffice/components/search-table';

const columnHelper = createColumnHelper<any>();

const statusColors: Record<string, string> = {
  'On Time': 'bg-green-100 text-green-800',
  Late: 'bg-yellow-100 text-yellow-800',
  Missed: 'bg-red-100 text-red-800',
};

const TableScoreView: React.FC<ITableScoreView> = ({
  setFilter,
  Filter,
  data,
}) => {
  const router = useRouter();

  useEffect(() => {
    setFilter('');
  }, [setFilter]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.display({
        id: 'no',
        header: ({ column }) => <SortingTable column={column} title="No" />,
        cell: (info) => info.row.index + 1,
        size: 20,
      }),
      columnHelper.accessor('studentName', {
        header: ({ column }) => (
          <SortingTable column={column} title="Student Name" />
        ),
        cell: (info) => info.getValue(),
        size: 300,
      }),
      columnHelper.accessor('deadline', {
        header: ({ column }) => (
          <SortingTable column={column} title="Deadline" />
        ),
        cell: (info) =>
          format(new Date(info.getValue() as string), 'dd MMMM yyyy HH:mm'),
        size: 10,
      }),
      columnHelper.accessor('submitDate', {
        header: ({ column }) => (
          <SortingTable column={column} title="Submit Date" />
        ),
        cell: (info) =>
          format(new Date(info.getValue() as string), 'dd MMMM yyyy HH:mm'),
        size: 10,
      }),
      columnHelper.accessor('status', {
        header: ({ column }) => <SortingTable column={column} title="Status" />,
        cell: (info) => {
          const status = info.getValue() as keyof typeof statusColors;
          const colorClass =
            statusColors[status] || 'bg-gray-100 text-gray-800';
          return (
            <div className="flex justify-center">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${colorClass}`}
              >
                {status}
              </span>
            </div>
          );
        },
        size: 100,
      }),
      columnHelper.accessor('score', {
        header: ({ column }) => <SortingTable column={column} title="Score" />,
        cell: (info) => `${info.getValue()}/100`,
        size: 100,
      }),
    ],
    [router],
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className='text-2xl font-semibold font-poppins'>Score</h1>
        <SearchTable onChange={setFilter} value={Filter} />
      </div>
      <div className="overflow-x-auto">
        <DataTable
          data={data}
          columns={columns}
          sorting={[{ id: 'no', desc: false }]}
          filter={{ Filter, setFilter }}
        />
      </div>
    </div>
  );
};

export default TableScoreView;