import React, { useMemo, useState, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { IPartnerView } from './partner.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import AlertModal from '@/backoffice/components/alert-delete-modal';
import ModalForm from './components/modal-form-partner';
import { usePartnerActions } from './hooks/usePartnerAction';
import { Popover } from 'flowbite-react';
import MoreHoriz from '../../../../../public/icons/more_horiz.svg';
import { BadgeStatus } from '@/backoffice/components/badge-status';
import { useRouter } from 'next/navigation';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';
import Image from 'next/image';


const columnHelper = createColumnHelper<any>();

const PartnersView: React.FC<IPartnerView> = ({
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

  const router = useRouter();

  const openDocumentEditor = () => {
    router.push('/backoffice/master-data/partner/add-partner/');
  };

  const {
    handleAddPartner,
    handleEditPartner,
    handleDeletePartner,
  } = usePartnerActions();

  const handleEdit = useCallback((id: string, rowData: string) => {
    setSelectedId(id);
    setSelectedRowData(rowData);
    setIsPopupOpen(true);
  }, [setIsPopupOpen]);

  const handleDelete = useCallback((id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  }, []);

  const handleAddOrEditPartner = useCallback(
    async (id: string | undefined, data: { name: string, address: string, logo: string, description: string }) => {
      if (id) {
        await handleEditPartner(id, data);
      } else {
        await handleAddPartner(data.name, data.address, data.logo, data.description);
      }
      fetchData();
      setSelectedId(null);
      setSelectedRowData(null);
    },
    [handleEditPartner, handleAddPartner, fetchData],
  );

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('name', {
        header: ({ column }) => <SortingTable column={column} title="Name" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('address', {
        header: ({ column }) => (
          <SortingTable column={column} title="Address" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('logo', {
        header: ({ column }) => (
          <SortingTable column={column} title="Logo" />
        ),
        cell: (info) => {
          const logoURL = info.getValue() as string;
          return(
            <Image 
            src={logoURL}  
            alt='Logo'
            width={100}
            height={100}
            />
          
          )
        },
      }),
      columnHelper.accessor('description', {
        header: ({ column }) => (
          <SortingTable column={column} title="Description" />
        ),
        cell: (info) => info.getValue(),
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
                  <PermissionGranted roleable role="master-data.partner.edit">
                    <button
                      onClick={() => handleEdit(id, rowData)}
                      className="hover:text-blue-700 hover:underline"
                    >
                      Edit
                    </button>
                  </PermissionGranted>
                  <PermissionGranted roleable role="master-data.partner.read">
                    <button className="hover:text-blue-700 hover:underline">
                      Open
                    </button>
                  </PermissionGranted>
                  <PermissionGranted roleable role="master-data.partner.delete">
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
    [handleEdit, handleDelete]
  );

  return (
    <div>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={Filter} onChange={setFilter} />
        <PermissionGranted role="master-data.partner.add" roleable>
          <AddButton onClick={openDocumentEditor} text="Add Partner" />
        </PermissionGranted>
      </div>
      <PermissionGranted role="master-data.partner.read" roleable>
        <DataTable
          data={data}
          columns={columns}
          sorting={[{ id: 'name', desc: false }]}
          filter={{ Filter, setFilter }}
        />
      </PermissionGranted>
      <ModalForm
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setSelectedId(null);
          setSelectedRowData(null);
        }}
        onSave={handleAddOrEditPartner}
        initialData={selectedRowData}
        id={selectedId || undefined}
        title={selectedId ? 'Edit Partner' : 'Add Partner'}
      />

      <AlertModal
        openModal={deleteModalOpen}
        setOpenModal={setDeleteModalOpen}
        setIsConfirmed={async () => {
          await handleDeletePartner(selectedId!);
          fetchData();
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default PartnersView;