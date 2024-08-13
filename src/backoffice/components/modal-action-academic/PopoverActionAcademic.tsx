import React, { useState } from 'react';
import PopoverActionAcademicView from './PopoverActionAcademic.view';
import { IPopOverActionAcademic } from './popoverActionAcademic.type';

const PopoverActionAcademic: React.FC<IPopOverActionAcademic> = (props) => {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <PopoverActionAcademicView
      {...props}
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    />
  );
};

export default PopoverActionAcademic;
