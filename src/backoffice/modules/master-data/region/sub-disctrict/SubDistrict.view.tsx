import React, { useMemo, useState, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { ISubDistrictView } from './subDistrict.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import AlertModal from '@/backoffice/components/alert-delete-modal';
import ModalForm from './components/modal-form-sub-district';
import { useSubDistrictActions } from './hooks/useSubDistrictAction';
import { Popover } from 'flowbite-react';
import MoreHoriz from '../../../../../../public/icons/more_horiz.svg';
import { useRouter } from 'next/navigation';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';

const columnHelper = createColumnHelper<any>();

const SubDistrictView: React.FC<ISubDistrictView> = ({
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
    setSelectedId(null);
    setIsPopupOpen(true);
    // router.push(
    //   '/backoffice/master-data/region/sub-district/add-sub-district/',
    // );
  };

  const {
    handleAddSubDistrict,
    handleEditSubDistrict,
    handleDeleteSubDistrict,
  } = useSubDistrictActions();

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

  const handleAddOrEditSubDistrict = useCallback(
    async (id: string | undefined, data: { name: string }) => {
      if (id) {
        await handleEditSubDistrict(id, data.name);
      } else {
        await handleAddSubDistrict(data.name);
      }
      fetchData();
      setSelectedId(null);
      setSelectedRowData(null);
    },
    [handleEditSubDistrict, handleAddSubDistrict, fetchData],
  );
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('code', {
        header: ({ column }) => (
          <SortingTable column={column} title="Sub-District Code" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => (
          <SortingTable column={column} title="Sub-District Name" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('city', {
        header: ({ column }) => <SortingTable column={column} title="City" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('province', {
        header: ({ column }) => (
          <SortingTable column={column} title="Province" />
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
                    role="master-data.region.subDistrict.edit"
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
                    role="master-data.region.subDistrict.read"
                  >
                    <button className="hover:text-blue-700 hover:underline">
                      Open
                    </button>
                  </PermissionGranted>
                  <PermissionGranted
                    roleable
                    role="master-data.region.subDistrict.delete"
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
        <PermissionGranted role="master-data.region.subDistrict.add" roleable>
          <AddButton onClick={openDocumentEditor} text="Add SubDistrict" />
        </PermissionGranted>
      </div>
      <PermissionGranted role="master-data.region.subDistrict.read" roleable>
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
        onSave={handleAddOrEditSubDistrict}
        initialData={selectedRowData}
        id={selectedId || undefined}
        title={selectedId ? 'Edit SubDistrict' : 'Add SubDistrict'}
      />

      <AlertModal
        openModal={deleteModalOpen}
        setOpenModal={setDeleteModalOpen}
        setIsConfirmed={async () => {
          await handleDeleteSubDistrict(selectedId!);
          fetchData();
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default SubDistrictView;
