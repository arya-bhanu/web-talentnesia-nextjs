import React, { useMemo, useState, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { IAcademicLevelView } from './academicLevel.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import AlertModal from '@/backoffice/components/alert-delete-modal';
import ModalForm from './components/modal-form-level/ModalForm';
import { useAcademicLevelActions } from './hooks/useAcademicLevelAction';
import { Popover } from 'flowbite-react';
import MoreHoriz from '../../../../../public/icons/more_horiz.svg';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';

const columnHelper = createColumnHelper<any>();

const AcademicLevelView: React.FC<IAcademicLevelView> = ({
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
    handleAddAcademicLevel,
    handleEditAcademicLevel,
    handleDeleteAcademicLevel,
  } = useAcademicLevelActions();

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

  const handleAddOrEditAcademicLevel = useCallback(
    async (id: string | undefined, data: { name: string }) => {
      if (id) {
        await handleEditAcademicLevel(id, data);
      } else {
        await handleAddAcademicLevel(data.name);
      }
      fetchData();
      setSelectedId(null);
      setSelectedRowData(null);
    },
    [handleEditAcademicLevel, handleAddAcademicLevel, fetchData],
  );

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('code', {
        header: ({ column }) => <SortingTable column={column} title="Code" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => (
          <SortingTable column={column} title="Level Name" />
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
                    role="master-data.academicLevel.edit"
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
                    role="master-data.academicLevel.delete"
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
        <PermissionGranted role="master-data.academicLevel.add" roleable>
          <AddButton
            onClick={() => {
              setSelectedId(null);
              setSelectedRowData(null);
              setIsPopupOpen(true);
            }}
            text="Add Academic Level"
          />
        </PermissionGranted>
      </div>
      <PermissionGranted role="master-data.academicLevel.read" roleable>
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
        onSave={handleAddOrEditAcademicLevel}
        initialData={selectedRowData}
        id={selectedId || undefined}
        title={selectedId ? 'Edit Academic Level' : 'Add Academic Level'}
      />

      <AlertModal
        openModal={deleteModalOpen}
        setOpenModal={setDeleteModalOpen}
        setIsConfirmed={async () => {
          await handleDeleteAcademicLevel(selectedId!);
          fetchData();
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default AcademicLevelView;
