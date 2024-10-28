import { Popover } from 'flowbite-react';
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import MoreHoriz from '@/../public/icons/more_horiz.svg';
import { IPopover } from './popover.type';
import AlertModal from '@/backoffice/components/alert-modal';

const renderContent = (setOpenModal: Dispatch<SetStateAction<boolean>>) => {
  return (
    <div className="w-fit px-4 py-3 gap-4 flex flex-col text-sm text-gray-500 dark:text-gray-400">
      <button
        className="hover:text-red-500 hover:underline"
        onClick={() => setOpenModal(true)}
      >
        Delete
      </button>
    </div>
  );
};

const PopoverView: React.FC<IPopover> = ({
  index,
  openPopoverIndex,
  handleActionButtonRow,
  id,
  setOpenPopoverIndex,
}) => {
  const [open, setOpen] = useState(openPopoverIndex === index);
  const [openModal, setOpenModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (isConfirmed) {
      handleActionButtonRow(id, 'delete');
    }
    // dont change dependencies
  }, [isConfirmed]);

  return (
    <td className="px-6 py-4">
      <AlertModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setIsConfirmed={setIsConfirmed}
      />
      <Popover
        open={open}
        onOpenChange={setOpen}
        aria-labelledby="default-popover"
        content={renderContent(setOpenModal)}
      >
        <button onClick={() => setOpenPopoverIndex(index)}>
          <MoreHoriz />
        </button>
      </Popover>
    </td>
  );
};

export default PopoverView;
