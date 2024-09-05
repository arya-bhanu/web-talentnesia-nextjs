'use client';
import { Popover } from 'flowbite-react/components/Popover';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import MoreHoriz from '@/../public/icons/more_horiz.svg';
import { IPopover } from './popover.type';
import Link from 'next/link';
import AlertModal from '../alert-delete-modal';
import { IAccessRight } from '@/types/global.type';
import { usePathname } from 'next/navigation';
import { isGrantedPermission } from '@/helpers/access-permission';
import clsx from 'clsx';

const renderContent = (
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  id: string,
) => {
  const [accessRights, setAccessRights] = useState<IAccessRight[] | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    const accessString = window.localStorage.getItem('access');
    if (accessString) {
      const access = JSON.parse(accessString) as IAccessRight[];
      setAccessRights(access);
    }
  }, []);

  return (
    <div className="relative flex justify-center">
      <div className="w-fit px-4 py-3 gap-4 flex flex-col text-sm text-gray-500 dark:text-gray-400">
        <Link
          href={`/backoffice/manage-modul/update?modulId=${id}`}
          className={clsx(
            'hover:text-blue-500 hover:underline',
            !isGrantedPermission(
              pathname,
              '/manage-modul',
              'manage-modul.edit',
              accessRights,
            ) && 'hidden',
          )}
        >
          Edit
        </Link>
        <button
          className={clsx(
            'hover:text-red-500 hover:underline',
            !isGrantedPermission(
              pathname,
              '/manage-modul',
              'manage-modul.delete',
              accessRights,
            ) && 'hidden',
          )}
          onClick={() => setOpenModal(true)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const PopoverView: React.FC<IPopover> = ({
  index,
  openPopoverIndex,
  handleActionButtonRow,
  id,
  setOpenPopoverIndex,
  content,
}) => {
  const [open, setOpen] = useState(openPopoverIndex === index);
  const [openModal, setOpenModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (isConfirmed) {
      handleActionButtonRow(id, 'delete');
    }
  }, [isConfirmed]);

  return (
    <td className="px-6 items-center relative flex justify-center">
      <AlertModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setIsConfirmed={setIsConfirmed}
      />
      <Popover
        open={open}
        onOpenChange={setOpen}
        aria-labelledby="default-popover"
        content={content ? content : renderContent(setOpenModal, id)}
      >
        <button onClick={() => setOpenPopoverIndex(index)}>
          <MoreHoriz />
        </button>
      </Popover>
    </td>
  );
};

export default PopoverView;
