import React from 'react';
import { IPopoverAcademic } from './popoverAcademic.type';
import PopoverAcademicView from './PopoverAcademic.view';

const PopoverAcademic: React.FC<IPopoverAcademic> = (props) => {
  return <PopoverAcademicView {...props} />;
};

export default PopoverAcademic;
