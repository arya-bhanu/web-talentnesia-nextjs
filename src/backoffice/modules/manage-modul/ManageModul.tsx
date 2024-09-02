'use client';
import React, { useState, useMemo } from 'react';
import ManageModulView from './ManageModul.view';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteModule, fetchModules } from './api/manageModelApi';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import MoreHoriz from '@/../public/icons/more_horiz.svg';
import Popover from '@/backoffice/components/popover';

const columnHelper = createColumnHelper<any>();

const ManageModul = () => {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['modules'], queryFn: fetchModules });
  const { mutateAsync: deleteModuleAsync } = useMutation({
    mutationFn: deleteModule,
  });
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);
  const [Filter, setFilter] = useState('');

  const handleActionButtonRow = async (
    id: string,
    action: 'delete' | 'edit',
  ) => {
    switch (action) {
      case 'delete':
        await deleteModuleAsync(id);
        break;
      default:
        break;
    }
    queryClient.invalidateQueries({ queryKey: ['modules'] });
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: ({ column }) => <SortingTable column={column} title="No" />,
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => <SortingTable column={column} title="Modul" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('active', {
        header: ({ column }) => <SortingTable column={column} title="Status" />,
        cell: (info) => (info.getValue() === 0 ? 'Inactive' : 'Active'),
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
                handleActionButtonRow={handleActionButtonRow}
                id={id}
                index={index}
                openPopoverIndex={openPopoverIndex}
                setOpenPopoverIndex={setOpenPopoverIndex}
              />
            </div>
          );
        },
      }),
    ],
    [handleActionButtonRow, openPopoverIndex, setOpenPopoverIndex],
  );

  return (
    <ManageModulView
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      data={query.data?.data?.items}
      handleActionButtonRow={handleActionButtonRow}
      Filter={Filter}
      setFilter={setFilter}
      columns={columns} // Pass the columns as a prop
    />
  );
};

export default ManageModul;
