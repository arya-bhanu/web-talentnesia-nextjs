import React, { useMemo } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { IAcademicLevelView } from './academicLevel.type';
import PopoverAcademic from '@/backoffice/components/popover-academic';
import ModalAddAcademic from '@/backoffice/components/modal-form-add/ModalAddAcademic';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import SortArrow from '../../../../../public/icons/sort-arrow.svg';
import SortArrowUp from '../../../../../public/icons/sort-arrow-up.svg';
import { UniversalTable } from '@/backoffice/components/table';

const columnHelper = createColumnHelper<any>();

const AcademicLevelView: React.FC<IAcademicLevelView> = ({
  data,
  openPopoverIndex,
  setOpenPopoverIndex,
  handleActionButtonRow,
  handleAddAcademicLevel,
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
            <p>Level Name</p>
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
        cell: (info) => (
          <div className="w-[100px] items-center text-center">
            <PopoverAcademic
              handleActionButtonRow={handleActionButtonRow}
              id={info.getValue() as string}
              index={info.row.index}
              openModalIndex={openPopoverIndex}
              setOpenModalIndex={setOpenPopoverIndex}
              onUpdate={fetchData}
              onDelete={fetchData}
            />
          </div>
        ),
      }),
    ],
    [handleActionButtonRow, openPopoverIndex, setOpenPopoverIndex, fetchData],
  );

  return (
    <div>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={Filter} onChange={setFilter} />
        <AddButton onClick={() => setIsPopupOpen(true)} text="Add Academic Level" />
        <ModalAddAcademic
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleAddAcademicLevel}
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

export default AcademicLevelView;