import React from 'react';
import { IModalSelect } from './modalAddProgram.type';
import ModalAddProgramView from './ModalAddProgram.view';

const ModalAddProgram: React.FC<IModalSelect> = (props) => {
  return <ModalAddProgramView {...props} />;
};

export default ModalAddProgram;
