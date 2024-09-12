import React from 'react';
import ModalView from './Modal.view';
import { IModal } from './modal.type';

const ModalGenerate: React.FC<IModal> = (props) => {
  return <ModalView {...props}>{props.children}</ModalView>;
};

export default ModalGenerate;
