import React, { useMemo } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { IListTableStudentView } from './listTableStudent.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';

const columnHelper = createColumnHelper<any>();

const ListTableStudentView: React.FC<IListTableStudentView> = ({
  data,
  Filter,
  setFilter,
}) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('no', {
        header: ({ column }) => <SortingTable column={column} title="No" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => <SortingTable column={column} title="Name" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('email', {
        header: ({ column }) => <SortingTable column={column} title="Email" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('noHp', {
        header: ({ column }) => <SortingTable column={column} title="No. Hp" />,
        cell: (info) => info.getValue(),
      }),
    ],
    [],
  );

  return (
    <div>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={Filter} onChange={setFilter} />
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

export default ListTableStudentView;
