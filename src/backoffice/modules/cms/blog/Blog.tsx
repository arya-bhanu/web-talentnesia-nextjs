import React, { useState } from 'react';
import BlogView from './Blog.view';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import Popover from '@/backoffice/components/popover/Popover';

const columnHelper = createColumnHelper<any>();

const Blog = () => {
  const [filter, setFilter] = useState('');
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);
  const columns: ColumnDef<any>[] = [
    columnHelper.accessor('title', {
      header: ({ column }) => (
        <SortingTable column={column} title="Judul Blog" />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('category', {
      header: ({ column }) => <SortingTable column={column} title="Category" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: ({ column }) => <SortingTable column={column} title="Nama" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: ({ column }) => <SortingTable column={column} title="Status" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('id', {
      id: 'action',
      header: 'Action',
      cell: (info) => {
        const id = info.getValue() as string;
        const index = info.row.index;

        return (
          <div className="items-center">
            <Popover
              handleActionButtonRow={() => {}}
              id={id}
              index={index}
              openPopoverIndex={openPopoverIndex}
              setOpenPopoverIndex={setOpenPopoverIndex}
            />
          </div>
        );
      },
    }),
  ];
  return <BlogView filter={filter} setFilter={setFilter} columns={columns} />;
};

export default Blog;
