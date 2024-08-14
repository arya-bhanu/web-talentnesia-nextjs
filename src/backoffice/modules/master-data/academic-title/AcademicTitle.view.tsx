import React, { useMemo, useState } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { IAcademicTitleView } from './academicTitle.type';
import ModalAddAcademic from '@/backoffice/components/modal-form-add/ModalAddAcademic';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import SortArrow from '../../../../../public/icons/sort-arrow.svg';
import SortArrowUp from '../../../../../public/icons/sort-arrow-up.svg';
import { UniversalTable } from '@/backoffice/components/table';
import { academicTitleAPI } from './api/academicTitleApi';
import AlertModal from '@/backoffice/components/alert-modal';
import { Popover } from 'flowbite-react';
import { ModalFormEdit } from '@/backoffice/components/modal-form-edit/ModalFormEdit';
import MoreHoriz from '../../../../../public/icons/more_horiz.svg';

const columnHelper = createColumnHelper<any>();

const AcademicTitleView: React.FC<IAcademicTitleView> = ({
  data,
  openPopoverIndex,
  setOpenPopoverIndex,
  handleActionButtonRow,
  handleAddAcademicTitle,
  Filter,
  setFilter,
  isPopupOpen,
  setIsPopupOpen,
  fetchData,
}) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      columnHelper.accessor('code', {
        header: ({ column }) => (
          <div className="flex items-center w-[50px]">
            <p>Code</p>
            {!column.getIsSorted() ? (
              <SortArrow className="ml-2 cursor-pointer" onClick={() => column.toggleSorting()}/>
            ) : (
              <SortArrowUp
                className={`ml-2 cursor-pointer ${
                  column.getIsSorted() === 'desc' ? 'rotate-180' : ''
                }`}
                onClick={() => column.toggleSorting()}
              />
            )}
          </div>
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => (
          <div className="flex items-center w-[200px]"> 
            <p>Title Name</p>
            {!column.getIsSorted() ? (
              <SortArrow className="ml-2 transition-transform cursor-pointer" onClick={() => column.toggleSorting()}/>
            ) : (
              <SortArrowUp
                className={`ml-2 cursor-pointer ${
                  column.getIsSorted() === 'desc' ? 'rotate-180' : ''
                }`}
                onClick={() => column.toggleSorting()}
              />
            )}
          </div>
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('id', {
        id: 'action',
        header: ({ column }) => (
          <div className="flex items-center text-center w-[100px] ">
            <p>Action</p>
          </div>
        ),
        cell: (info) => {
          const [open, setOpen] = useState(false);
          const [openModal, setOpenModal] = useState(false);
          const [isEditOpen, setIsEditOpen] = useState(false);
          const [initialData, setInitialData] = useState({
            code: '',
            name: '',
          });

          const openEditModal = async () => {
            try {
              const academicTitle = await academicTitleAPI.getById(
                info.getValue() as string,
              );
              setInitialData({
                code: academicTitle.code,
                name: academicTitle.name,
              });
              setIsEditOpen(true);
            } catch (error) {
              console.error('Failed to fetch academic Title details', error);
            }
          };

          return (
            <div className="w-[100px] items-center text-center">
              <AlertModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                setIsConfirmed={async (confirmed) => {
                  if (confirmed) {
                    try {
                      await academicTitleAPI.delete(info.getValue() as string);
                      await fetchData();
                    } catch (error) {
                      console.error('Failed to delete academic Title', error);
                    }
                  }
                }}
              />
              <Popover
                open={open}
                onOpenChange={setOpen}
                aria-labelledby="academic-popover"
                content={
                  <div className="w-fit px-4 py-3 gap-4 flex flex-col text-sm text-gray-500 dark:text-gray-400">
                    <button
                      className="hover:text-blue-500 hover:underline"
                      onClick={openEditModal}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:text-red-500 hover:underline"
                      onClick={() => setOpenModal(true)}
                    >
                      Delete
                    </button>
                  </div>
                }
              >
                <button onClick={() => setOpen(true)}>
                  <MoreHoriz />
                </button>
              </Popover>
              <ModalFormEdit
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSave={async (updatedData) => {
                  handleActionButtonRow(info.getValue() as string, 'edit');
                  await fetchData();
                }}
                initialData={initialData}
                id={info.getValue() as string}
                title="Edit Academic Title"
                fields={[
                  { name: 'code', label: 'Code' },
                  { name: 'name', label: 'Academic Title Name' },
                ]}
                apiUpdate={academicTitleAPI.update}
              />
            </div>
          );
        },
      }),
    ],
    [handleActionButtonRow, openPopoverIndex, setOpenPopoverIndex, fetchData],
  );
  return (
    <div>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={Filter} onChange={setFilter} />
        <AddButton onClick={() => setIsPopupOpen(true)} text="Add Academic Title" />
        <ModalAddAcademic
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleAddAcademicTitle}
        />
      </div>
      <UniversalTable
      data={data}
      columns={columns}
      Sorting={[{ id: 'code', desc: false }]}
      filter={{ Filter, setFilter }}
      />
    </div>
  );
};

export default AcademicTitleView;