import React, { useMemo, useState } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import { IAcademicLevelView } from './academicLevel.type';
import ModalAddAcademic from '@/backoffice/components/modal-form-add/ModalAddAcademic';
import { SearchTable } from '@/backoffice/components/search-table';
import { AddButton } from '@/backoffice/components/add-button-table';
import SortArrow from '../../../../../public/icons/sort-arrow.svg';
import SortArrowUp from '../../../../../public/icons/sort-arrow-up.svg';
import { UniversalTable } from '@/backoffice/components/table';
import { academicLevelAPI } from './api/academicLevelApi';
import ActionCell from '@/backoffice/components/action-cell/ActionCell';
import Link from 'next/link';

const columnHelper = createColumnHelper<any>();

const AcademicLevelView: React.FC<IAcademicLevelView> = ({
  data,
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
              <SortArrow
                className="ml-2 cursor-pointer"
                onClick={() => column.toggleSorting()}
              />
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
              <SortArrow
                className="ml-2 transition-transform cursor-pointer"
                onClick={() => column.toggleSorting()}
              />
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
          return (
            <ActionCell
              id={info.getValue() as string}
              fetchData={fetchData}
              apiGetById={academicLevelAPI.getById}
              apiDelete={academicLevelAPI.delete}
              apiUpdate={academicLevelAPI.update}
              fields={[
                { name: 'code', label: 'Code' },
                { name: 'name', label: 'Academic Level Name' },
              ]}
              title="Edit Academic Level"
              actions={[
                {
                  name: 'Edit',
                  render: (id) => (
                    <button
                      onClick={() => handleActionButtonRow(id, 'edit')}
                      className="hover:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  ),
                },
                {
                  name: 'Delete',
                  render: (id) => (
                    <button
                      onClick={() => handleActionButtonRow(id, 'delete')}
                      className="hover:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  ),
                },
                // Test action
                // {
                //   name: 'Update',
                //   render: (id) => (
                //     <Link
                //       href={`/backoffice/manage-modul/update?modulId=${id}`}
                //       className="hover:text-blue-500 hover:underline"
                //     >
                //       Update
                //     </Link>
                //   ),
                // },
              ]}
            />
          );
        },
      }),
    ],
    [fetchData],
  );

  return (
    <div>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={Filter} onChange={setFilter} />
        <AddButton
          onClick={() => setIsPopupOpen(true)}
          text="Add Academic Level"
        />
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
