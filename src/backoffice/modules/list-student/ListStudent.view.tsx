import React, { useMemo, useState, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { IListStudentView } from './listStudent.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import AlertModal from '@/backoffice/components/alert-delete-modal';
import ModalForm from './components/modal-form-list-student/ModalForm';
import { Popover } from 'flowbite-react';
import MoreHoriz from '@/../public/icons/more_horiz.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter
import { ButtonImport } from './components/button-import/ButtonImport';
import { ModalImport } from './components/modal-import/ModalImport';

const columnHelper = createColumnHelper<any>();

const ListStudentView: React.FC<IListStudentView> = ({
  data,
  Filter,
  setFilter,
  isPopupOpen,
  setIsPopupOpen,
  isPopoverOpen,
  setIsPopoverOpen,
  fetchData,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const router = useRouter(); // Initialize useRouter

  const handleImportSubmit = (file: File) => {
    // Handle the file import logic here
    console.log('Importing file:', file.name);
    // You might want to send this file to your backend or process it
  };

  const handleEdit = useCallback(
    (id: string, rowData: any) => {
      setSelectedId(id);
      setSelectedRowData(rowData);
      setIsPopupOpen(true);
    },
    [setIsPopupOpen],
  );

  const handleDetail = useCallback(
    (id: string) => {
      router.push(`/operator/student/${id}`); // Navigate to the detail page
    },
    [router],
  );

  const handleDelete = useCallback((id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  }, []);

  const handleAddOrEditListStudent = useCallback(
    async (id: string | undefined, data: { name: string }) => {
      if (id) {
        // await handleEditListStudent(id, data);
      } else {
        // await handleAddListStudent(data.name);
      }
      fetchData();
      setSelectedId(null);
      setSelectedRowData(null);
    },
    [fetchData],
  );

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.display({
        id: 'no',
        header: ({ column }) => <SortingTable column={column} title="No" />,
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => <SortingTable column={column} title="Name" />,
        cell: (info) => (
          <div className="flex items-center">
            <Image
              src={info.row.original.photo || ''}
              alt={(info.getValue() as string) || 'Profile'}
              width={32}
              height={32}
              className="rounded-full mr-2"
            />
            <span>{info.getValue() as string}</span>
          </div>
        ),
      }),
      columnHelper.accessor('email', {
        header: ({ column }) => <SortingTable column={column} title="Email" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('noHp', {
        header: ({ column }) => <SortingTable column={column} title="No Hp" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('id', {
        id: 'action',
        header: 'Action',
        cell: (info) => {
          const id = info.getValue() as string;
          const rowData = info.row.original;

          return (
            <Popover
              content={
                <div className="w-fit px-4 py-3 gap-4 flex flex-col text-sm text-gray-500 dark:text-gray-400">
                  <button
                    onClick={() => handleDetail(id)}
                    className="hover:text-green-500 hover:underline"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => handleEdit(id, rowData)}
                    className="hover:text-blue-700 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
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
    [handleEdit, handleDelete, handleDetail],
  );

  return (
    <div>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={Filter} onChange={setFilter} />
        <div className="flex">
          <ButtonImport onClick={() => setIsPopoverOpen(true)} />
          <AddButton
            onClick={() => {
              setSelectedId(null);
              router.push(`/operator/student/add-student`);
            }}
            text="Add Student"
          />
        </div>
      </div>
      <DataTable
        data={data}
        columns={columns}
        sorting={[{ id: 'no', desc: false }]}
        filter={{ Filter, setFilter }}
      />

      <ModalImport
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        onSubmit={handleImportSubmit}
      />

      <ModalForm
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setSelectedId(null);
          setSelectedRowData(null);
        }}
        onSave={handleAddOrEditListStudent}
        initialData={selectedRowData}
        id={selectedId || undefined}
        title={selectedId ? 'Edit Student' : 'Add Student'}
      />

      <AlertModal
        openModal={deleteModalOpen}
        setOpenModal={setDeleteModalOpen}
        setIsConfirmed={async () => {
          // await handleDeleteListStudent(selectedId!);
          fetchData();
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default ListStudentView;
