"use client"
import React, { useState } from 'react';
import CampaignView from './Campaign.view';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import Popover from '@/backoffice/components/popover/Popover';
const columnHelper = createColumnHelper<any>();

const Campaign = () => {
  const [filter, setFilter] = useState('');
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);
  const columns: ColumnDef<any>[] = [
    columnHelper.accessor('title', {
      header: ({ column }) => (
        <SortingTable column={column} title="Campaign Title" />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('discount', {
      header: ({ column }) => (
        <SortingTable column={column} title="Discount Name" />
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('date', {
      header: ({ column }) => (
        <SortingTable column={column} title="Start Date → End Date" />
      ),
      cell: (info) => (
        <p>
          {(info.getValue() as any).dateStart} →{' '}
          {(info.getValue() as any).dateEnd}
        </p>
      ),
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
  return (
    <CampaignView filter={filter} setFilter={setFilter} columns={columns} />
  );
};

export default Campaign;
