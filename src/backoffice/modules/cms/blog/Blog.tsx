'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Popover from '@/backoffice/components/popover/Popover';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';
import clsx from 'clsx';
import Link from 'next/dist/client/link';
import { cmsApi } from '../Api/cmsApi';
import { useStatusModalStore } from '@/lib/store';
import { userAPI } from '../../user/api/userApi';
import BlogView from './Blog.view';

const AuthorCell: React.FC<{ authorId: string }> = ({ authorId }) => {
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

  return <>{authorName}</>;
};

const Blog = () => {
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const { openModal } = useStatusModalStore();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

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
          handleRefresh();
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

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: 'title', header: 'Judul Blog' },
      { 
        accessorKey: 'categoryName', 
        header: 'Category',
        cell: (info) => info.getValue() || 'N/A'
      },
      {
        accessorKey: 'authorId',
        header: 'Author',
        cell: ({ getValue }) => {
          const authorId = getValue() as string;
          return <AuthorCell authorId={authorId} />;
        },
      },
      { 
        accessorKey: 'status', 
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          if (status === 1) {
            return (
              <h1 className="bg-green-100 text-green-600 text-sm text-center font-semibold py-1 px-2 rounded-lg inline-block">
              Published
            </h1>
            );
          } else {
            return (
              <h1 className="bg-gray-100 text-gray-700 text-sm text-center font-semibold py-1 px-2 rounded-lg inline-block">
                Draft
              </h1>
            );
          }
        }
      },
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
                <div className="relative flex justify-start">
                  <div className="w-fit px-3 py-2 gap-1 flex flex-col text-sm text-gray-500 dark:text-gray-400">
                    {/* <PermissionGranted roleable role="manage-modul.delete">
                      <button className={clsx('hover:text-red-500 hover:underline')}>
                        Detail
                      </button>
                    </PermissionGranted> */}
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
    <BlogView 
      columns={columns}
      refreshKey={refreshKey}
      handleRefresh={handleRefresh}
      showAlertModal={showAlertModal}
      setShowAlertModal={setShowAlertModal}
      confirmDelete={confirmDelete}
    />
  );
};

export default Blog;
