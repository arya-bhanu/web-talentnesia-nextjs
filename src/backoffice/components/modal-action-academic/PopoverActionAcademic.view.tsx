import { Popover } from 'flowbite-react/components/Popover';
import React from 'react';
import { IPopOverActionAcademic } from './popoverActionAcademic.type';

const PopoverActionAcademicView: React.FC<IPopOverActionAcademic> = ({
  openPopover,
  setOpenPopover,
  content,
  button,
}) => {
  return (
    <Popover
      open={openPopover}
      onOpenChange={setOpenPopover}
      aria-labelledby="academic-action-popover"
      content={content}
    >
      {button}
    </Popover>
  );
};

export default PopoverActionAcademicView;
