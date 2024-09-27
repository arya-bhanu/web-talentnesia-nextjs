import React, { useMemo } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { CourseViewProps } from './course.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import { Popover } from 'flowbite-react';
import MoreHoriz from '../../../../../public/icons/more_horiz.svg';
import Link from 'next/link';
import {
  calculateDuration,
  formatNumericDateToEng,
} from '@/helpers/formatter.helper';
import ProgressBar from '@/backoffice/components/progress-bar/ProgressBar';
import { BadgeStatus } from '@/backoffice/components/badge-status';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';
import { useTabStoreFormProgram } from '../form-program/formProgramStore';

const columnHelper = createColumnHelper<any>();

const CourseView: React.FC<CourseViewProps> = ({
  data,
  Filter,
  setFilter,
  handleActionButtonRow,
}) => {
  const setActiveTab = useTabStoreFormProgram((state) => state.setActiveTab);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('no', {
        header: ({ column }) => <SortingTable column={column} title="No" />,
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => (
          <SortingTable column={column} title="Bootcamp Name" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('startDate', {
        id: 'duration',
        header: ({ column }) => (
          <SortingTable column={column} title="Duration" />
        ),
        cell: (info) => {
          const row = info.row.original;
          const startDate = row.startDate;
          const endDate = row.endDate;
          const duration = calculateDuration(startDate, endDate);
          return (
            <div className="font-lato">
              <p className="font-semibold">{duration}</p>
              <p className="text-xs">
                {formatNumericDateToEng(startDate)} →{' '}
                {formatNumericDateToEng(endDate)}
              </p>
            </div>
          );
        },
      }),
      columnHelper.accessor('progress', {
        header: ({ column }) => (
          <SortingTable column={column} title="Progress" />
        ),
        cell: (info) => {
          const progress = info.getValue() || 0;
          return (
            <div className="flex items-center gap-4">
              <ProgressBar progress={progress as number} />
              <p className="w-max">{progress as number}% Selesai</p>
            </div>
          );
        },
      }),
      columnHelper.accessor('active', {
        header: ({ column }) => <SortingTable column={column} title="Status" />,
        cell: (info) => <BadgeStatus status={info.getValue() as number} />,
      }),
      columnHelper.accessor('id', {
        id: 'action',
        header: 'Action',
        cell: (info) => {
          const row = info.row.original;
          const id = row.id;
          const institutionId = row.institutionId;
          return (
            <Popover
              content={
                <div className="w-fit px-4 py-3 gap-4 flex flex-col text-sm text-gray-500 dark:text-gray-400">
                  <Link
                    href={`/backoffice/manage-program/update-program?programId=${id}&schoolId=${institutionId}`}
                    className="hover:text-blue-700 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleActionButtonRow(id, 'delete')}
                    className="hover:text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              }
            >
              <button type="button">
                <MoreHoriz />
              </button>
            </Popover>
          );
        },
      }),
    ],
    [handleActionButtonRow],
  );

  return (
    <div>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={Filter} onChange={setFilter} />
        <PermissionGranted roleable role="manage-program.iicp.add">
          <Link
            href="/backoffice/manage-program/add-program"
            onClick={() => setActiveTab('detail')}
          >
            <AddButton text="Add New Program" />
          </Link>
        </PermissionGranted>
      </div>
      <DataTable
        data={data}
        columns={columns}
        sorting={[]}
        filter={{ Filter, setFilter }}
      />
    </div>
  );
};

export default CourseView;
