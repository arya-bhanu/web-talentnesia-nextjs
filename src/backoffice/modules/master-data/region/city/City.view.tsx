import React, { useMemo, useState, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { ICityView } from './city.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import AlertModal from '@/backoffice/components/alert-modal';
import ModalForm from './components/modal-form-city';
import { useCityActions } from './hooks/useCityAction';
import { Popover } from 'flowbite-react';
import MoreHoriz from '../../../../../../public/icons/more_horiz.svg';

const columnHelper = createColumnHelper<any>();

const CityView: React.FC<ICityView> = ({
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

  const { handleAddCity, handleEditCity, handleDeleteCity } = useCityActions();

  const handleEdit = useCallback(
    (id: string, rowData: any) => {
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

  const handleAddOrEditCity = useCallback(
    async (id: string | undefined, data: { name: string }) => {
      if (id) {
        await handleEditCity(id, data);
      } else {
        await handleAddCity(data.name);
      }
      fetchData();
      setSelectedId(null);
      setSelectedRowData(null);
    },
    [handleEditCity, handleAddCity, fetchData],
  );

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('code', {
        header: ({ column }) => <SortingTable column={column} title="City Code" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('City-name', {
        header: ({ column }) => (
          <SortingTable column={column} title="City Name" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('province', {
        header: ({ column }) => <SortingTable column={column} title="Province" />,
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
    [handleEdit, handleDelete],
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
          text="Add City"
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
        onSave={handleAddOrEditCity}
        initialData={selectedRowData}
        id={selectedId || undefined}
        title={selectedId ? 'Edit City' : 'Add City'}
      />

      <AlertModal
        openModal={deleteModalOpen}
        setOpenModal={setDeleteModalOpen}
        setIsConfirmed={async () => {
          await handleDeleteCity(selectedId!);
          fetchData();
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default CityView;
