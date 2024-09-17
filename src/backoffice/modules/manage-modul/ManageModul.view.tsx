'use client';
import React from 'react';
import Link from 'next/link';
import { IManageModulView } from './manageModul.type';
import Loading from '@/components/loading';

import { ColumnDef } from '@tanstack/react-table';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';

const ManageModulView: React.FC<
  IManageModulView & { columns: ColumnDef<any>[] }
> = ({ data, isLoading, Filter, setFilter, columns }) => {
  return (
    <Loading isLoading={isLoading}>
      <div>
        <div className="flex justify-between items-center font-poppins">
          <SearchTable value={Filter} onChange={setFilter} />
          <PermissionGranted roleable role="manage-module.createModule">
            <Link href="/backoffice/manage-modul/create" className="block">
              <AddButton text="Add Module" />
            </Link>
          </PermissionGranted>
        </div>
        <PermissionGranted roleable role='manage-module.read'>
          <DataTable
            data={data}
            columns={columns}
            sorting={[]}
            filter={{ Filter, setFilter }}
          />
        </PermissionGranted>
      </div>
    </Loading>
  );
};

export default ManageModulView;
