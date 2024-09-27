import React, { useMemo, useState, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { IDistrictView } from './district.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import AlertModal from '@/backoffice/components/alert-delete-modal';
import ModalForm from './components/modal-form-city';
import { useDistrictActions } from './hooks/useDistrictAction';
import { Popover } from 'flowbite-react';
import MoreHoriz from '../../../../../../public/icons/more_horiz.svg';
import { useRouter } from 'next/navigation';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';

const columnHelper = createColumnHelper<any>();

const DistrictView: React.FC<IDistrictView> = ({
  data,
  Filter,
  setFilter,
  isPopupOpen,
  setIsPopupOpen,
  fetchData,
  role,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);

  const router = useRouter();

  const openDocumentEditor = () => {
    setSelectedId(null);
    setIsPopupOpen(true);
    // router.push('/backoffice/master-data/region/district/add-district/');
  };

  const { handleAddDistrict, handleEditDistrict, handleDeleteDistrict } =
    useDistrictActions();

  const handleEdit = useCallback(
    (id: string, rowData: string) => {
      setSelectedId(id);
      setSelectedRowData(rowData);
      setIsPopupOpen(true);
    },
    [setIsPopupOpen],
  );

  const handleDelete = useCallback((id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  }, []);

  const handleAddOrEditDistrict = useCallback(
    async (id: string | undefined, data: { name: string }) => {
      if (id) {
        await handleEditDistrict(id, data);
      } else {
        await handleAddDistrict(data.name);
      }
      fetchData();
      setSelectedId(null);
      setSelectedRowData(null);
    },
    [handleEditDistrict, handleAddDistrict, fetchData],
  );

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: ({ column }) => (
          <SortingTable column={column} title="District Code" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => (
          <SortingTable column={column} title="District Name" />
        ),
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
                  <PermissionGranted
                    roleable
                    role="master-data.region.district.edit"
                  >
                    <button
                      onClick={() => handleEdit(id, rowData)}
                      className="hover:text-blue-700 hover:underline"
                    >
                      Edit
                    </button>
                  </PermissionGranted>
                  <PermissionGranted
                    roleable
                    role="master-data.region.district.read"
                  >
                    <button className="hover:text-blue-700 hover:underline">
                      Open
                    </button>
                  </PermissionGranted>
                  <PermissionGranted
                    roleable
                    role="master-data.region.district.delete"
                  >
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
    [handleEdit, handleDelete],
  );

  return (
    <div>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={Filter} onChange={setFilter} />
        <PermissionGranted role="master-data.region.district.add" roleable>
          <AddButton onClick={openDocumentEditor} text="Add District" />
        </PermissionGranted>
      </div>
      <PermissionGranted role="master-data.region.district.read" roleable>
        <DataTable
          data={data}
          columns={columns}
          sorting={[{ id: 'code', desc: false }]}
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
        onSave={handleAddOrEditDistrict}
        initialData={selectedRowData}
        id={selectedId || undefined}
        title={selectedId ? 'Edit District' : 'Add District'}
      />

      <AlertModal
        openModal={deleteModalOpen}
        setOpenModal={setDeleteModalOpen}
        setIsConfirmed={async () => {
          await handleDeleteDistrict(selectedId!);
          fetchData();
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default DistrictView;
