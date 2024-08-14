import React from 'react';
import { IModalAcademic } from './modalAcademic.type';
import PopoverAcademicView from './ModalAcademic.view';

const PopoverAcademic: React.FC<IModalAcademic> = (props) => {
  return <PopoverAcademicView {...props} />;
};

export default PopoverAcademic;
