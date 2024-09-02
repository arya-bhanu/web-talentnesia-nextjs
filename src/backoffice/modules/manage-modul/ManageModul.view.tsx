'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IManageModulView } from './manageModul.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import Link from 'next/link';

const ManageModulView: React.FC<IManageModulView & { columns: ColumnDef<any>[] }> = ({
  data,
  handleActionButtonRow,
  setOpenPopoverIndex,
  openPopoverIndex,
  Filter,
  setFilter,
  columns, // Receive the columns prop
}) => {
  return (
    <div>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={Filter} onChange={setFilter} />
        <Link href="/backoffice/manage-modul/create" className="block">
          <AddButton onClick={() => {}} text="Add Module" />
        </Link>
      </div>
      <DataTable
        data={data}
        columns={columns}
        sorting={[{ id: 'id', desc: false }]}
        filter={{ Filter, setFilter }}
      />
    </div>
  );
};

export default ManageModulView;
