import React, { useMemo, useState, useCallback } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { APIResponseDiscount, IDiscountView } from './discount.type';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import { DataTable } from '@/backoffice/components/data-table';
import SortingTable from '@/backoffice/components/sorting-table/SortingTable';
import AlertModal from '@/backoffice/components/alert-delete-modal';
import ModalForm from './components/modal-form-discount';
import { useDiscountActions } from './hooks/useDiscountAction';
import { Popover } from 'flowbite-react';
import MoreHoriz from '@/../public/icons/more_horiz.svg';
import { BadgeStatus } from '@/backoffice/components/badge-status';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';
import { FormDataDisc } from './components/modal-form-discount/modalForm.type';

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

  const router = useRouter();

  const openDocumentEditor = () => {
    router.push('/backoffice/master-data/discount/add-discount/');
  };

  const { handleAddDiscount, handleEditDiscount, handleDeleteDiscount } =
    useDiscountActions();

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

  const handleAddOrEditDiscount = useCallback(
    async (id: string | undefined, data: FormDataDisc) => {
      if (id) {
        await handleEditDiscount(id, {
          name: data.name,
          code: data.code,
          persentage: data.persentage,
          startDate: data.startDate,
          endDate: data.endDate,
          active: data.active ?? 0,
        });
      } else {
        await handleAddDiscount(data.name);
      }
      fetchData();
      setSelectedId(null);
      setSelectedRowData(null);
    },    [handleEditDiscount, handleAddDiscount, fetchData],
  );

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('code', {
        header: ({ column }) => <SortingTable column={column} title="Code" />,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => (
          <SortingTable column={column} title="Discount Name" />
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('persentage', {
        header: ({ column }) => (
          <SortingTable column={column} title="Percentage" />
        ),
        cell: (info) => (
          <div className="w-full">{String(info.getValue())}%</div>
        ),
      }),
      columnHelper.accessor('startDate-endDate', {
        header: ({ column }) => (
          <SortingTable column={column} title="Start Date -> End Date" />
        ),
        cell: (info) => {
          const startDate = info.row.original.startDate as string;
          const endDate = info.row.original.endDate as string;
          const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return isNaN(date.getTime())
              ? 'Invalid Date'
              : format(date, 'MMM-dd-yyyy');
          };

          const formattedStartDate = formatDate(startDate);
          const formattedEndDate = formatDate(endDate);

          return `${formattedStartDate} -> ${formattedEndDate}`;
        },
      }),
      columnHelper.accessor('active', {
        header: ({ column }) => <SortingTable column={column} title="Status" />,
        cell: (info) => (
          <BadgeStatus status={info.getValue() as number} type={1} />
        ),
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
                  <PermissionGranted roleable role="master-data.discount.edit">
                    <button
                      onClick={() => handleEdit(id, rowData)}
                      className="hover:text-blue-700 hover:underline"
                    >
                      Edit
                    </button>
                  </PermissionGranted>
                  <PermissionGranted roleable role="master-data.discount.read">
                    <button className="hover:text-blue-700 hover:underline">
                      Open
                    </button>
                  </PermissionGranted>
                  <PermissionGranted
                    roleable
                    role="master-data.discount.delete"
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
        <PermissionGranted role="master-data.discount.add" roleable>
          <AddButton onClick={openDocumentEditor} text="Add Discount" />
        </PermissionGranted>
      </div>
      <PermissionGranted role="master-data.discount.read" roleable>
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
        onSave={handleAddOrEditDiscount}
        initialData={selectedRowData}
        id={selectedId || undefined}
        title={''}
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
};export default DiscountView;
