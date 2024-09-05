'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import TableHeader from '../table-header/TableHeader';
import Dropdown from '../dropdown-type/DropdownType';
import { ITableProgramView } from './tableProgram.type';
import { useRouter } from 'next/navigation';
import Popover from '@/backoffice/components/popover';
import Link from 'next/link';

const columnHelper = createColumnHelper<any>();

const TableProgramView: React.FC<ITableProgramView> = ({
  data,
  Filter,
  setFilter,
}) => {
  const [selectedOption, setSelectedOption] = useState('Type');
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    setFilter('');
  }, [setFilter]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.display({
        id: 'no',
        header: ({ column }) => <SortingTable column={column} title="No" />,
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => <SortingTable column={column} title="Class" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('type', {
        header: ({ column }) => <SortingTable column={column} title="Type" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('progress', {
        header: ({ column }) => (
          <SortingTable column={column} title="Progress" />
        ),
        cell: (info) => {
          const progress = info.getValue<string>();
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '100%',
                  backgroundColor: '#F0F1F3',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginRight: '8px',
                }}
              >
                <div
                  style={{
                    width: `${Number(progress)}%`,
                    backgroundColor: '#219EBC',
                    height: '10px',
                  }}
                />
              </div>
              <span>{progress}% Selesai</span>
            </div>
          );
        },
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
                    <div className="w-fit px-4 py-3 gap-4 flex flex-col text-sm text-gray-500 dark:text-gray-400">
                      <Link
                        href={`/backoffice/report/detail/?id=${id}`}
                        className="hover:text-blue-500 hover:underline"
                      >
                        Detail
                      </Link>
                    </div>
                  </div>
                }
              />
            </div>
          );
        },
      }),
    ],
    [router],
  );

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setFilter(option === 'Type' ? '' : option);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <TableHeader title="Program Progress" />
        <Dropdown
          options={
            data ? ['Type', ...new Set(data.map((el) => el.type))] : ['Type']
          }
          selectedOption={selectedOption}
          onSelect={handleSelect}
        />
      </div>
      {data && (
        <DataTable
          data={data}
          columns={columns}
          sorting={[{ id: 'no', desc: false }]}
          filter={{ Filter, setFilter }}
        />
      )}
    </div>
  );
};

export default TableProgramView;
