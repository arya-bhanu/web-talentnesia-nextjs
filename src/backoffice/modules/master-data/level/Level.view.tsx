import React, { useMemo, useState, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { ILevelView } from './level.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import AlertModal from '@/backoffice/components/alert-modal';
import ModalForm from './components/modal-form-level';
import { useLevelActions } from './hooks/useLevelAction';

const columnHelper = createColumnHelper<any>();

const LevelView: React.FC<ILevelView> = ({
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
    handleAddLevel,
    handleEditLevel,
    handleDeleteLevel,
  } = useLevelActions();

  const handleEdit = useCallback((id: string, rowData: any) => {
    setSelectedId(id);
    setSelectedRowData(rowData);
    setIsPopupOpen(true);
  }, [setIsPopupOpen]);

  const handleDelete = useCallback((id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  }, []);

  const handleAddOrEditLevel = useCallback(
    async (id: string | undefined, data: { name: string }) => {
      if (id) {
        await handleEditLevel(id, data);
      } else {
        await handleAddLevel(data.name);
      }
      fetchData();
      setSelectedId(null);
      setSelectedRowData(null);
    },
    [handleEditLevel, handleAddLevel, fetchData],
  );

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('code', {
        header: ({ column }) => <SortingTable column={column} title="Code" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('level-name', {
        header: ({ column }) => (
          <SortingTable column={column} title="Level Name" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('status', {
        header: ({ column }) => (
          <SortingTable column={column} title="Status" />
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
                Delete
              </button>
            </div>
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
          text="Add Level"
        />
      </div>
      <DataTable
        data={data}
        columns={columns}
        sorting={[{ id: 'code', desc: false }]}
        filter={{ Filter, setFilter }}
      />
      <ModalForm
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setSelectedId(null); 
          setSelectedRowData(null); 
        }}
        onSave={handleAddOrEditLevel}
        initialData={selectedRowData}
        id={selectedId || undefined}
        title={selectedId ? 'Edit Level' : 'Add Level'}
      />

      <AlertModal
        openModal={deleteModalOpen}
        setOpenModal={setDeleteModalOpen}
        setIsConfirmed={async () => {
          await handleDeleteLevel(selectedId!);
          fetchData();
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default LevelView;
