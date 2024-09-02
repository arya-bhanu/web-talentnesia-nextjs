import React, { useMemo, useState, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { ICertificateView } from './certificate.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import AlertModal from '@/backoffice/components/alert-delete-modal';
import ModalForm from './components/modal-form-certificate';
import { useCertificateActions } from './hooks/useCertificateAction';
import { Popover } from 'flowbite-react';
import MoreHoriz from '../../../../../public/icons/more_horiz.svg';
import { BadgeStatus } from '@/backoffice/components/badge-status';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<any>();

const CertificateView: React.FC<ICertificateView> = ({
  data,
  Filter,
  setFilter,  
  isPopupOpen,
  setIsPopupOpen,
  fetchData,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);

  const {
    handleAddCertificate,
    handleEditCertificate,
    handleDeleteCertificate,
  } = useCertificateActions();

  const handleEdit = useCallback((id: string, rowData: any) => {
    setSelectedId(id);
    setSelectedRowData(rowData);
    setIsPopupOpen(true);
  }, [setIsPopupOpen]);

  const handleDelete = useCallback((id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  }, []);
  const handleAddOrEditCertificate = useCallback(
    async (id: string | undefined, data: { name: string, file: string }) => {
      try {
        if (id) {
          await handleEditCertificate(id, data);
        } else {
          await handleAddCertificate(data.name, data.file);
        }
        fetchData();
        setSelectedId(null);
        setSelectedRowData(null);
      } catch (error) {
        console.error('Failed to add or edit certificate', error);
      }
    },
    [handleEditCertificate, handleAddCertificate, fetchData]
  );
   
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('name', {
        header: ({ column }) => <SortingTable column={column} title="Template Name" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('file', {
        header: ({ column }) => (
          <SortingTable column={column} title="Template" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('data-uploaded', {
        header: ({ column }) => (
          <SortingTable column={column} title="Date Uploaded" />
        ),
        cell: (info) => {
          const date = info.getValue() as string || new Date().toISOString();
          const parsedDate = new Date(date);

          const formattedDate = format(parsedDate, "MMMM do yyyy");
          const formattedTime = format(parsedDate, "HH:mm 'WIB'");

          return (
            <div>
              <div className='font-bold text-gray-900'>{formattedDate}</div>
              <div className='pl-6 text-start'>{formattedTime}</div>
            </div>
          );
        },
      }),      
      columnHelper.accessor('active', {
        header: ({ column }) => (
          <SortingTable column={column} title="Status" />
        ),
        cell: (info) => <BadgeStatus status={info.getValue() as number} type={1}/>,
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
    [handleEdit, handleDelete]
  );

  return (
    <div>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={Filter} onChange={setFilter} />
        <AddButton
          onClick={() => {
            setSelectedId(null);
            setIsPopupOpen(true);
          }}
          text="Add Certificate"
        />
      </div>
      <DataTable
        data={data}
        columns={columns}
        sorting={[{ id: 'name', desc: false }]}
        filter={{ Filter, setFilter }}
      />
      <ModalForm
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setSelectedId(null); 
          setSelectedRowData(null); 
        }}
        onSave={handleAddOrEditCertificate}
        initialData={selectedRowData}
        id={selectedId || undefined}
        title={selectedId ? 'Edit Certificate' : 'Add Certificate'}
      />

      <AlertModal
        openModal={deleteModalOpen}
        setOpenModal={setDeleteModalOpen}
        setIsConfirmed={async () => {
          await handleDeleteCertificate(selectedId!);
          fetchData();
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default CertificateView;
