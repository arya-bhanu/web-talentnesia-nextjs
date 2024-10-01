'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Popover from '@/backoffice/components/popover/Popover';
import PermissionGranted from '@/backoffice/components/permission-granted/PermissionGranted';
import clsx from 'clsx';
import Link from 'next/dist/client/link';
import { cmsApi } from '../Api/cmsApi';
import { useStatusModalStore } from '@/lib/store';
import CampaignView from './Campaign.view';

const Campaign = () => {
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);
  const [filter, setFilter] = useState('');
  const [apiUrl, setApiUrl] = useState('/v1/campaign');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);
  const { openModal } = useStatusModalStore();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    setApiUrl(`/v1/campaign?search=${filter}`);
  }, [filter]);

  const handleDelete = (id: string) => {
    setCampaignToDelete(id);
    setShowAlertModal(true);
  };

  const confirmDelete = async () => {
    if (campaignToDelete) {
      try {
        const response = await cmsApi.deleteCampaign(campaignToDelete);
        if (response && response.success) {
          openModal({
            status: 'success',
            action: 'delete',
            message: 'Campaign deleted successfully',
          });
          handleRefresh();
        } else {
          throw new Error(response?.message || 'Failed to delete campaign');
        }
      } catch (error) {
        openModal({
          status: 'error',
          message: `Failed to delete campaign: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`,
        });
      }
      setShowAlertModal(false);
      setCampaignToDelete(null);
    }
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      { accessorKey: 'title', header: 'Campaign Title' },
      { accessorKey: 'discountName', header: 'Discount' },
      {
        accessorKey: 'date',
        header: 'Start Date → End Date',
        cell: (info) => (
          <p>
            {new Date(info.row.original.startDate).toLocaleDateString()} →{' '}
            {new Date(info.row.original.endDate).toLocaleDateString()}
          </p>
        ),
      },
      { 
        accessorKey: 'status', 
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          if (status === 0) {
            return <span className="bg-gray-100 text-gray-700 text-sm text-center font-semibold py-1 px-2 rounded-lg inline-block">Not Started</span>;
          } else if (status === 1) {
            return <span className="bg-green-100 text-green-600 text-sm text-center font-semibold py-1 px-2 rounded-lg inline-block">On Going</span>;
          } else {
            return <span className="bg-red-100 text-red-600 text-sm text-center font-semibold py-1 px-2 rounded-lg inline-block">Finished</span>;
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
                        href={`/backoffice/cms/edit-campaign?Id=${id}`}
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
    <CampaignView
      columns={columns}
      apiUrl={apiUrl}
      filter={filter}
      setFilter={setFilter}
      showAlertModal={showAlertModal}
      setShowAlertModal={setShowAlertModal}
      confirmDelete={confirmDelete}
      refreshKey={refreshKey}
      handleRefresh={handleRefresh}
    />
  );
};

export default Campaign;
