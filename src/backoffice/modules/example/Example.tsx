'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Popover } from 'flowbite-react';
import TanstackTable from '@/backoffice/components/tanstack-table';

export default function Example() {
  type Example = {
    id: string;
    code: number;
    name: string;
    description: string | null;
    active: number;
  };

  const columns = React.useMemo<ColumnDef<Example>[]>(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'code', header: 'Code' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'description', header: 'Description' },
      { accessorKey: 'active', header: 'Active' },
      {
        id: 'actions',
        header: 'Actions',
        cell: (info) => {
          return (
            <Popover
              content={
                <div className="w-fit px-4 py-3 gap-4 flex flex-col text-sm text-gray-500 dark:text-gray-400">
                  <button
                    onClick={(info) => {
                      console.log('Edit', info);
                    }}
                    className="hover:text-blue-700 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      console.log('Delete', info);
                    }}
                    className="hover:text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              }
            >
              <button type="button">...</button>
            </Popover>
          );
        },
      },
    ],
    [],
  );

  return (
    <div>
      <TanstackTable apiUrl="/v1/example" columns={columns} />
    </div>
  );
}
