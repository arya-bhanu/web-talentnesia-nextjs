import React, { useMemo, useState, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { IDiscountView } from './discount.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import AlertModal from '@/backoffice/components/alert-modal';
import ModalForm from './components/modal-form-discount';
import { useDiscountActions } from './hooks/useDiscountAction';

const columnHelper = createColumnHelper<any>();

const DiscountView: React.FC<IDiscountView> = ({
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
    handleAddDiscount,
    handleEditDiscount,
    handleDeleteDiscount,
  } = useDiscountActions();

  const handleEdit = useCallback((id: string, rowData: any) => {
    setSelectedId(id);
    setSelectedRowData(rowData);
    setIsPopupOpen(true);
  }, [setIsPopupOpen]);

  const handleDelete = useCallback((id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  }, []);

  const handleAddOrEditDiscount = useCallback(
    async (id: string | undefined, data: { name: string }) => {
      if (id) {
        await handleEditDiscount(id, data);
      } else {
        await handleAddDiscount(data.name);
      }
      fetchData();
      setSelectedId(null);
      setSelectedRowData(null);
    },
    [handleEditDiscount, handleAddDiscount, fetchData],
  );

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('code', {
        header: ({ column }) => <SortingTable column={column} title="Code" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('discount-name', {
        header: ({ column }) => (
          <SortingTable column={column} title="Discount Name" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('start-date-end-date', {
        header: ({ column }) => (
          <SortingTable column={column} title="Start Date -> End Date" />
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
          text="Add Discount"
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
        onSave={handleAddOrEditDiscount}
        initialData={selectedRowData}
        id={selectedId || undefined}
        title={selectedId ? 'Edit Discount' : 'Add Discount'}
      />

      <AlertModal
        openModal={deleteModalOpen}
        setOpenModal={setDeleteModalOpen}
        setIsConfirmed={async () => {
          await handleDeleteDiscount(selectedId!);
          fetchData();
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default DiscountView;
