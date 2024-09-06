import { AddButton } from '@/backoffice/components/add-button-table/AddButtonTable';
import { DataTable } from '@/backoffice/components/data-table/DataTable';
import { SearchTable } from '@/backoffice/components/search-table/SearchTable';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/dist/client/link';
import React, { Dispatch, SetStateAction } from 'react';

export interface IBlogView {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  columns: ColumnDef<any>[];
}

const dataBlog = [
  {
    id: '1',
    title: 'blog title',
    category: 'Development',
    name: 'Administration',
    status: 'Published',
  },
];

const BlogView: React.FC<IBlogView> = ({ filter, setFilter, columns }) => {
  return (
    <>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={filter} onChange={setFilter} />
        <Link href="/backoffice/manage-modul/create" className="block">
          <AddButton onClick={() => {}} text="Add Module" />
        </Link>
      </div>
      <DataTable
        data={dataBlog}
        columns={columns}
        sorting={[]}
        filter={{ Filter: filter, setFilter }}
      />
    </>
  );
};

export default BlogView;
