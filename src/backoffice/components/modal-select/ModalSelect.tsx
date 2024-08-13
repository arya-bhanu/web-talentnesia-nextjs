import React from 'react';
import { IModalSelect } from './modalSelect.type';
import ModalSelectView from './ModalSelect.view';

const ModalSelect: React.FC<IModalSelect> = (props) => {
  return <ModalSelectView {...props} />;
};

export default ModalSelect;
