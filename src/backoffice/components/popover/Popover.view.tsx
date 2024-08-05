import { Popover } from 'flowbite-react';
import React, { useState } from 'react';
import MoreHoriz from '../../../../public/icons/more_horiz.svg';
import { IPopover } from './popover.type';
import Link from 'next/link';

const PopoverView: React.FC<IPopover> = ({
  index,
  openPopoverIndex,
  handleActionButtonRow,
  id,
  setOpenPopoverIndex,
}) => {
  const [open, setOpen] = useState(openPopoverIndex === index);

  return (
    <td className="px-6 py-4">
      <Popover
        open={open}
        onOpenChange={setOpen}
        aria-labelledby="default-popover"
        content={
          <div className="w-fit px-4 py-3 gap-1.5 flex flex-col text-sm text-gray-500 dark:text-gray-400">
            <Link
              href={`/backoffice/manage-modul/update?slug=${id}`}
              className="hover:text-blue-500 hover:underline"
            >
              Edit
            </Link>
            <button
              className="hover:text-red-500 hover:underline"
              onClick={() => handleActionButtonRow(id, 'delete')}
            >
              Delete
            </button>
          </div>
        }
      >
        <button onClick={() => setOpenPopoverIndex(index)}>
          <MoreHoriz />
        </button>
      </Popover>
    </td>
  );
};

export default PopoverView;
