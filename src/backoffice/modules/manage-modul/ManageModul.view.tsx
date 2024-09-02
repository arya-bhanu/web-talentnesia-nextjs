'use client';
import React from 'react';
import Link from 'next/link';
import { IManageModulView } from './manageModul.type';
import Loading from '@/components/loading';

import { ColumnDef } from '@tanstack/react-table';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';

const ManageModulView: React.FC<
  IManageModulView & { columns: ColumnDef<any>[] }
> = ({
  data,
  isLoading,
  Filter,
  setFilter,
  columns,
}) => {
  return (
    <Loading isLoading={isLoading}>
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
          sorting={[]}
          filter={{ Filter, setFilter }}
        />
      </div>
    </Loading>
  );
};

export default ManageModulView;
