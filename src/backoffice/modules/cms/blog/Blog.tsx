'use client';
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import TanstackTable from '@/backoffice/components/tanstack-table';
import Popover from '@/backoffice/components/popover/Popover';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';
import clsx from 'clsx';
import Link from 'next/dist/client/link';
import { AddButton } from '@/backoffice/components/add-button-table';
import { SearchTable } from '@/backoffice/components/search-table/SearchTable';
import { cmsApi } from '../Api/cmsApi';
import AlertModal from '@/backoffice/components/alert-modal/AlertModal';
import { useStatusModalStore } from '@/lib/store';
import { userAPI } from '../../user/api/userApi';

const Blog = () => {
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);
  const [filter, setFilter] = useState('');
  const [apiUrl, setApiUrl] = useState('/v1/blog');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const { openModal } = useStatusModalStore();

  useEffect(() => {
    setApiUrl(`/v1/blog?search=${filter}`);
  }, [filter]);

  const handleDelete = (id: string) => {
    setBlogToDelete(id);
    setShowAlertModal(true);
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      try {
        const response = await cmsApi.delete(blogToDelete);
        if (response && response.success) {
          openModal({
            status: 'success',
            action: 'delete',
            message: 'Blog post deleted successfully',
          });
          // Refresh the table data here
        } else {
          throw new Error(response?.message || 'Failed to delete blog post');
        }
      } catch (error) {
        openModal({
          status: 'error',
          message: `Failed to delete blog post: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`,
        });
      }
      setShowAlertModal(false);
      setBlogToDelete(null);
    }
  };

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: 'title', header: 'Judul Blog' },
      { accessorKey: 'category', header: 'Category' },
      {
        accessorKey: 'authorId',
        header: 'Author',
        cell: ({ getValue }) => {
          const authorId = getValue() as string;
          const [authorName, setAuthorName] = React.useState<string>('');

          React.useEffect(() => {
            const fetchAuthorName = async () => {
              const response = await userAPI.show(authorId);
              if (response && response.data) {
                setAuthorName(response.data.name);
              }
            };
            fetchAuthorName();
          }, [authorId]);

          return authorName;
        },
      },
      { accessorKey: 'status', header: 'Status' },
      {
        id: 'actions',
        header: 'Action',
        cell: (info) => {
          const id = info.row.original.id;
          const index = info.row.index;

          return (
            <Popover
              handleActionButtonRow={() => {}}
              id={id}
              index={index}
              openPopoverIndex={openPopoverIndex}
              setOpenPopoverIndex={setOpenPopoverIndex}
              content={
                <div className="relative flex justify-center">
                  <div className="w-fit px-3 py-2 gap-1 flex flex-col text-sm text-gray-500 dark:text-gray-400">
                    <PermissionGranted roleable role="manage-modul.delete">
                      <button className={clsx('hover:text-red-500 hover:underline')}>
                        Detail
                      </button>
                    </PermissionGranted>
                    <PermissionGranted roleable role="manage-modul.edit">
                      <Link
                        href={`/backoffice/cms/edit-blog?Id=${id}`}
                        className={clsx('hover:text-blue-500 hover:underline')}
                      >
                        Edit
                      </Link>
                    </PermissionGranted>
                    <PermissionGranted roleable role="manage-modul.delete">
                      <button 
                        className={clsx('hover:text-red-500 hover:underline')}
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </PermissionGranted>
                  </div>
                </div>
              }
            />
          );
        },
      },
    ],
    [openPopoverIndex]
  );

  return (
    <>
      <div className="flex justify-between items-center font-poppins">
        <SearchTable value={filter} onChange={setFilter} />
        <Link href="/backoffice/cms/add-blog" className="block">
          <AddButton onClick={() => {}} text="Add Blog" />
        </Link>
      </div>
      <TanstackTable apiUrl={apiUrl} columns={columns} />
      <AlertModal
        openModal={showAlertModal}
        setOpenModal={setShowAlertModal}
        setIsConfirmed={confirmDelete}
        messageText="Are you sure you want to delete this blog post?"
      />
    </>
  );
};

export default Blog;
