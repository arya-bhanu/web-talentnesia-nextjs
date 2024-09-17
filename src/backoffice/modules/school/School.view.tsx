import React, { useMemo, useState, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { ISchoolView } from './school.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import AlertModal from '@/backoffice/components/alert-delete-modal';
import { useSchoolActions } from './hooks/useSchoolAction';
import { Popover } from 'flowbite-react';
import MoreHoriz from '@/../public/icons/more_horiz.svg';
import Link from 'next/link';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';

const columnHelper = createColumnHelper<any>();

const SchoolView: React.FC<ISchoolView> = ({
  data,
  Filter,
  setFilter,
  fetchData,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);

  const { handleDeleteSchool } = useSchoolActions();

  const handleDelete = useCallback((id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  }, []);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('code', {
        header: ({ column }) => <SortingTable column={column} title="Code" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => (
          <SortingTable column={column} title="Sekolah" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('pic', {
        header: ({ column }) => <SortingTable column={column} title="PIC" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('phone', {
        header: ({ column }) => (
          <SortingTable column={column} title="Telephone" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('id', {
        id: 'action',
        header: 'Action',
        cell: (info) => {
          const id = info.getValue() as string;

          return (
            <Popover
              content={
                <div className="w-fit px-4 py-3 gap-4 flex flex-col text-sm text-gray-500 dark:text-gray-400">
                  <PermissionGranted roleable role="school.detail.read">
                    <Link
                      href={`/backoffice/school/detail-school?schoolId=${id}`}
                    >
                      <button className="hover:text-green-500 hover:underline">
                        Detail
                      </button>
                    </Link>
                  </PermissionGranted>
                  <PermissionGranted roleable role="school.edit">
                    <Link
                      href={`/backoffice/school/edit-school?schoolId=${id}`}
                    >
                      <button className="hover:text-blue-700 hover:underline">
                        Edit
                      </button>
                    </Link>
                  </PermissionGranted>
                  <PermissionGranted roleable role="school.delete">
                    <button
                      onClick={() => handleDelete(id)}
                      className="hover:text-red-700 hover:underline"
                    >
                      Delete
                    </button>
                  </PermissionGranted>
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
    [handleDelete],
  );

  return (
    <div>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={Filter} onChange={setFilter} />
        <PermissionGranted roleable role="school.add">
          <Link href="/backoffice/school/add-school" className="p-0 m-0 block">
            <AddButton
              onClick={() => {
                setSelectedId(null);
                setSelectedRowData(null);
              }}
              text="Add Course"
            />
          </Link>
        </PermissionGranted>
      </div>
      <PermissionGranted roleable role="school.read">
        <DataTable
          data={data}
          columns={columns}
          sorting={[{ id: 'code', desc: false }]}
          filter={{ Filter, setFilter }}
        />
      </PermissionGranted>

      <AlertModal
        openModal={deleteModalOpen}
        setOpenModal={setDeleteModalOpen}
        setIsConfirmed={async () => {
          await handleDeleteSchool(selectedId!);
          fetchData();
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default SchoolView;
