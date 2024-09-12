import React, { useMemo, useState } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/backoffice/components/data-table';
import { useTableStudentStore } from './tableStudents.store';
import { IAPIStudentProgram } from './tableStudents.type';
import RedTrash from '@/../public/icons/red-trash.svg';
import Search from '@/../public/icons/iconamoon_search-bold.svg';
import Add from '@/../public/icons/add.svg';
import { SearchTable } from '@/backoffice/components/search-table';

interface TableStudentsViewProps {
  setOpenModalBrowser: (open: boolean) => void;
  className?: string;
}

const columnHelper = createColumnHelper<IAPIStudentProgram>();

const TableStudentsView: React.FC<TableStudentsViewProps> = ({
  setOpenModalBrowser,
  className,
}) => {
  const { dataStudentsJoined } = useTableStudentStore();
  const [filter, setFilter] = useState('');

  const columns = useMemo<ColumnDef<IAPIStudentProgram, any>[]>(
    () => [
      columnHelper.display({
        id: 'no',
        header: 'No',
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('nis', {
        header: 'NIS',
        cell: (info) => info.getValue() ?? '-',
      }),
      columnHelper.display({
        id: 'action',
        header: 'Action',
        cell: () => (
          <button>
            <RedTrash />
          </button>
        ),
      }),
    ],
    [],
  );

  return (
    <div className={className}>
      <div className="flex justify-between">
        <SearchTable value={filter} onChange={setFilter} />
        <button
          onClick={() => setOpenModalBrowser(true)}
          className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          <Add />
          <span className="text-black"> Browse All</span>
        </button>
      </div>
      <DataTable
        data={dataStudentsJoined ?? []}
        columns={columns}
        filter={{ Filter: filter, setFilter: setFilter }}
      />
    </div>
  );
};

export default TableStudentsView;
