'use client';

import React, { useState, useCallback } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import TanstackTable from '@/backoffice/components/tanstack-table';
import { Popover } from 'flowbite-react';
import MoreHoriz from '@/../public/icons/more_horiz.svg';
import { AddButton } from '@/backoffice/components/add-button-table';
import AlertModal from '@/backoffice/components/alert-delete-modal';
import ModalForm from './components/modal-form-example/ModalForm';
import { exampleAPI } from './api/example.api';
import Link from 'next/link';

export default function Example() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [apiUrl] = useState('/v1/example');

  const handleRefresh = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  const handleEdit = useCallback((id: string, rowData: any) => {
    setSelectedId(id);
    setSelectedRowData(rowData);
    setIsPopupOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  }, []);

  const handleAddOrEditExample = useCallback(
    async (id: string | undefined, data: { name: string }) => {
      try {
        if (id) {
          await exampleAPI.update(id, { ...data, active: 1 });
        } else {
          await exampleAPI.add({ ...data, active: 1, createdBy: '' });
        }
        setIsPopupOpen(false);
        setSelectedId(null);
        setSelectedRowData(null);
        handleRefresh();
      } catch (error) {
        console.error('Failed to save example', error);
      }
    },
    [handleRefresh],
  );

  const handleDeleteExample = useCallback(async () => {
    if (selectedId) {
      try {
        await exampleAPI.delete(selectedId);
        setDeleteModalOpen(false);
        handleRefresh();
      } catch (error) {
        console.error('Failed to delete example', error);
      }
    }
  }, [selectedId, handleRefresh]);

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'code', header: 'Code' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'active', header: 'Active' },
      {
        id: 'actions',
        header: 'Actions',
        cell: (info) => {
          const id = info.row.original.id;
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
      },
    ],
    [handleEdit, handleDelete],
  );

  return (
    <>
      <TanstackTable 
        key={refreshKey}
        apiUrl={apiUrl} 
        columns={columns}
        onRefresh={handleRefresh}
      >
        <Link href="#" className="block">
          <AddButton
            onClick={() => {
              setSelectedId(null);
              setSelectedRowData(null);
              setIsPopupOpen(true);
            }}
            text="Add Example"
          />
        </Link>
      </TanstackTable>

      <ModalForm
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setSelectedId(null);
          setSelectedRowData(null);
        }}
        onSave={handleAddOrEditExample}
        initialData={selectedRowData}
        id={selectedId || undefined}
        title={selectedId ? 'Edit Example' : 'Add Example'}
      />

      <AlertModal
        openModal={deleteModalOpen}
        setOpenModal={setDeleteModalOpen}
        setIsConfirmed={handleDeleteExample}
      />
    </>
  );
}
