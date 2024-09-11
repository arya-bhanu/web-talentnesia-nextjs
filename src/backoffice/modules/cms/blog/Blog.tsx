'use client';
import React, { useState } from 'react';
import BlogView from './Blog.view';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import Popover from '@/backoffice/components/popover/Popover';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';
import clsx from 'clsx';
import Link from 'next/dist/client/link';

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
              content={
                <div className="relative flex justify-center">
                  <div className="w-fit px-3 py-2 gap-1 flex flex-col text-sm text-gray-500 dark:text-gray-400">
                    <PermissionGranted rule="manage-modul.delete">
                      <button
                        className={clsx('hover:text-red-500 hover:underline')}
                      >
                        Detail
                      </button>
                    </PermissionGranted>
                    <PermissionGranted rule="manage-modul.edit">
                      <Link
                        href={`/backoffice/manage-modul/update?modulId=${id}`}
                        className={clsx('hover:text-blue-500 hover:underline')}
                      >
                        Edit
                      </Link>
                    </PermissionGranted>
                    <PermissionGranted rule="manage-modul.delete">
                      <button
                        className={clsx('hover:text-red-500 hover:underline')}
                      >
                        Delete
                      </button>
                    </PermissionGranted>
                  </div>
                </div>
              }
            />
          </div>
        );
      },
    }),
  ];
  return <BlogView filter={filter} setFilter={setFilter} columns={columns} />;
};

export default Blog;
