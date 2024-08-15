import React, { useMemo, useState } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { IAcademicLevelView } from './academicLevel.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import { academicLevelAPI } from './api/academicLevelApi';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import { useAcademicLevelActions } from './hooks/useAcademicLevelAction';
import FormAdd from './components/modal-form-add/ModalAddForm';
import AlertModal from '@/backoffice/components/alert-modal';
import { ModalFormEdit } from '@/backoffice/modules/master-data/academic-level/components/modal-form-edit/ModalFormEdit';

const columnHelper = createColumnHelper<any>();

const AcademicLevelView: React.FC<IAcademicLevelView> = ({
  data,
  handleActionButtonRow,
  Filter,
  setFilter,
  isPopupOpen,
  setIsPopupOpen,
  fetchData,
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const {
    handleAddAcademicLevel,
    handleEditAcademicLevel,
    handleDeleteAcademicLevel,
  } = useAcademicLevelActions();

  const handleEdit = (id: string, rowData: any) => {
    setSelectedId(id);
    setSelectedRowData(rowData);
    setEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

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
            <div className="flex justify-end space-x-2">
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
                Hapus
              </button>
            </div>
          );
        },
      }),
    ],
    [fetchData, handleActionButtonRow],
  );

  return (
    <div>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={Filter} onChange={setFilter} />
        <AddButton
          onClick={() => setIsPopupOpen(true)}
          text="Add Academic Level"
        />
        <FormAdd
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleAddAcademicLevel}
        />
      </div>
      <DataTable
        data={data}
        columns={columns}
        sorting={[{ id: 'code', desc: false }]}
        filter={{ Filter, setFilter }}
      />
      <ModalFormEdit
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={async (updatedData) => {
          await handleActionButtonRow(selectedId!, 'edit', updatedData);
          setEditModalOpen(false);
        }}
        initialData={selectedRowData}
        id={selectedId!}
        title="Edit Academic Level"
        fields={[
          { name: 'code', label: 'Code' },
          { name: 'name', label: 'Academic Level Name' },
        ]}
        apiUpdate={academicLevelAPI.update}
      />

      <AlertModal
        openModal={deleteModalOpen}
        setOpenModal={setDeleteModalOpen}
        setIsConfirmed={async () => {
          await handleActionButtonRow(selectedId!, 'delete');
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default AcademicLevelView;