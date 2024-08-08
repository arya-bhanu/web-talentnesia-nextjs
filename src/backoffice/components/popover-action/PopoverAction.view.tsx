import { Popover } from 'flowbite-react/components/Popover';
import Link from 'next/link';
import React from 'react';
import { IPopOverAction } from './popOverAction.type';

const PopoverActionView: React.FC<IPopOverAction> = ({
  openPopover,
  setOpenPopover,
  content,
  button,
}) => {
  return (
    <Popover
      open={openPopover}
      onOpenChange={setOpenPopover}
      aria-labelledby="default-popover"
      content={content}
    >
      {button}
    </Popover>
  );
};

export default PopoverActionView;
