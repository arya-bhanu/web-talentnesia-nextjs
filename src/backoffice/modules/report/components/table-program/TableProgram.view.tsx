'use client'

import React, { useMemo, useState, useEffect } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import TableHeader from '../table-header/TableHeader';
import Dropdown from '../dropdown-type/DropdownType';
import { ITableProgramView } from './tableProgram.type';
import { useRouter } from 'next/navigation';

const columnHelper = createColumnHelper<any>();

const TableProgramView: React.FC<ITableProgramView> = ({
  data,
  Filter,
  setFilter,
}) => {
  const [selectedOption, setSelectedOption] = useState('Type');
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
      columnHelper.accessor('class', {
        header: ({ column }) => (
          <SortingTable column={column} title="Class" />
        ),
        cell: (info) => {
          const id = info.row.original.id; // Assuming 'id' is the course ID
          const className = info.getValue<string>();
          return (
            <a
              href={`/backoffice/report/${id}`}
              onClick={(e) => {
                e.preventDefault();
                router.push(`/backoffice/report/${id}`);
              }}
            >
              {className}
            </a>
          );
        },
      }),
      columnHelper.accessor('type', {
        header: ({ column }) => (
          <SortingTable column={column} title="Type" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('progress', {
        header: ({ column }) => (
          <SortingTable column={column} title="Progress" />
        ),
        cell: (info) => {
          const progress = info.getValue<number>();
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
                    width: `${progress}%`,
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
    ],
    [router]
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
          options={['Type', 'IICP', 'Bootcamp']}
          selectedOption={selectedOption}
          onSelect={handleSelect}
        />
      </div>
      <DataTable
        data={data}
        columns={columns}
        sorting={[{ id: 'no', desc: false }]}
        filter={{ Filter, setFilter }}
      />
    </div>
  );
};

export default TableProgramView;
